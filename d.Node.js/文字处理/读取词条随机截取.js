const fs = require("fs");

const txtPath = "main.txt"; // 词条文件输入地址
const txtOutputPath = "create.txt"; // 词条文件输出地址

const readTxtFile = () => fs.readFileSync(`${txtPath}`).toString().split(",");
const writeTxtFile = (txtStr) => {
  fs.writeFileSync(
    `${txtOutputPath}`,
    `${txtStr}`,
    { encoding: "utf-8" },
    (err) => {
      if (err) return console.log(err.message);
    }
  );
};

let arr = [];
const getRandom = (min, max) => {
  let random = min + Math.round(Math.random() * (max - min));
  if (arr.indexOf(random) === -1) {
    arr.push(random);
    return random;
  }
};
const startWriteTxt = () => {
  if (txtNum > max) return console.log(`输出的词条最大为${max}`);

  let txtStr = "";
  for (let i = 0; i < txtNum; i++) {
    let random = getRandom(min, max);
    if (random) txtStr += `${txtArr[random]},`;
    else i--;
  }
  writeTxtFile(txtStr);

  console.log("词条生成成功~");
};

const txtArr = readTxtFile();
console.log("词条读取成功~");

const min = 0; // 设置随机数的范围 - 最小值
const max = txtArr.length; // 设置随机数的范围 - 最大值
const txtNum = 5000; // 设置生成条目的数量

startWriteTxt();
