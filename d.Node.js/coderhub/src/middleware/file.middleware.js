const multer = require("koa-multer");
const path = require("path");

const jimp = require("jimp");

const { AVATER_PATH, PICTRUE_PATH } = require("../constants/file-path");

// 上传头像
const AvaterStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, AVATER_PATH);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});
const AvaterUpload = multer({ storage: AvaterStorage }).single("avater");

// 上传动态图片
const PrictureStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, PICTRUE_PATH);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});
const PrictureUpload = multer({ storage: PrictureStorage }).array("pictrue", 9);

// 对图形进行处理
const prictrueResize = async (context, next) => {
  try {
    const files = context.req.files;

    for (let file of files) {
      const { destination, filename } = file;

      jimp.read(file.path).then((res) => {
        res.resize(1280, jimp.AUTO).write(`${destination}/large-${filename}`);
        res.resize(640, jimp.AUTO).write(`${destination}/middle-${filename}`);
        res.resize(320, jimp.AUTO).write(`${destination}/small-${filename}`);
      });
    }

    await next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  AvaterUpload,
  PrictureUpload,
  prictrueResize,
};
