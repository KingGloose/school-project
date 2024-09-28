const fs = require("fs");

const { APP_HOST, APP_PORT } = require("../app/config");
const { PICTRUE_PATH } = require("../constants/file-path");

const FileService = require("../service/file.service");
const UserService = require("../service/user.service");
const MomentService = require("../service/moment.service");

class FileController {
  // 为用户添加头像
  async AvaterInfo(context, next) {
    // 获取数据
    const { mimetype, size, filename } = context.req.file;
    const { id } = context.user;

    // 更新头像数据
    const result = await FileService.AddAvater(mimetype, size, filename, id);

    // 更新用户头像
    const avaterUrl = `${APP_HOST}:${APP_PORT}/user/avater/${id}`;
    const reusltUpdate = await UserService.UpdateAvaterUrl(avaterUrl, id);

    context.body = "头像添加成功~";
  }

  // 为动态添加图片
  async PictrueInfo(context, next) {
    const PrictureFiles = context.req.files;
    const { id } = context.user;
    const { momentId } = context.req.body;

    for (let file of PrictureFiles) {
      let { mimetype, size, filename } = file;

      let result = await FileService.AddPrictureFiles(
        filename,
        mimetype,
        size,
        momentId,
        id
      );
    }

    context.body = "添加成功~";
  }

  // 展示动态图片
  async GetPrictrue(context, next) {
    const { id } = context.request.params;
    const [result] = await MomentService.GetPictrueById(id);
    const { filename, mimetype } = result[0];

    console.log(`${PICTRUE_PATH}/${filename}`);

    context.response.set("content-type", mimetype);
    context.body = fs.createReadStream(`${PICTRUE_PATH}/${filename}`);
  }
}

module.exports = new FileController();
