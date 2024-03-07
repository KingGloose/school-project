import fs from "fs";
import path from "path";

// 遍历文件夹下面所有的文件
export type fileInfo = {
  name: string;
  path: string;
};

export const findFiles = (currentDirPath: string, ext: string) => {
  const allFileInfo: fileInfo[] = [];

  const walkSync = (currentDirPath: string, ext: string) => {
    fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach(function (file) {
      const fileName = file.name;
      const filePath = path.join(currentDirPath, fileName);
      if (file.isFile()) {
        // 如果是文件
        if (path.extname(fileName) === `.${ext}`) {
          allFileInfo.push({ name: fileName, path: filePath });
        }
      } else if (file.isDirectory()) {
        // 如果是文件夹，回调
        walkSync(filePath, ext);
      }
    });
  };
  walkSync(currentDirPath, ext);

  return allFileInfo;
};
