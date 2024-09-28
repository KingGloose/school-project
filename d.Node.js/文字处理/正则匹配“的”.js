const fs = require("fs");

const txtPath = "create1.txt";
const txtOutputPath = "create.txt"; // 词条文件输出地址
let txtStr = "";

const readTxtFile = () => fs.readFileSync(`${txtPath}`).toString().split(",");
const writeTxtFile = () => {
  fs.writeFileSync(
    `${txtOutputPath}`,
    `${txtStr}`,
    { encoding: "utf-8" },
    (err) => {
      if (err) return console.log(err.message);
    }
  );
};
const arr = readTxtFile();

// 1、匹配有2个的的正则
// let pattern = /[\u4e00-\u9fa5]+\u7684[\u4e00-\u9fa5]+\u7684[\u4e00-\u9fa5]+/g;

// 2、匹配末尾有的的正则
// let pattern = /[\u4e00-\u9fa5]+\u7684$/g;

for (let i = 0; i < arr.length; i++) {
  if (pattern.test(arr[i])) {
    console.log(arr[i]);
  }
}

// for (let i = 0; i < arr.length; i++) {
//   let flag = 0;
//   for (let j = 0; j < arr[i].length; j++) {
//     if (arr[i][j] == "的") {
//       flag++;
//     }
//   }
//   if (flag === 0) {
//     console.log(arr[i]);
//   }
// }
// writeTxtFile();
