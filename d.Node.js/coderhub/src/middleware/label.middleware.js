const GetLabelByName = require("../service/label.service");

// 验证是否存在该标签，如果不存在的话就会创建
const verifyLabelExists = async (context, next) => {
  const { labels } = context.request.body;

  let labelinfoArr = [];
  for (let name of labels) {
    let labelResult = await GetLabelByName.GetLabelByName(name);
    let labelinfo = { name };

    if (!labelResult) {
      let [result] = await GetLabelByName.CreateLabel(name);
      labelinfo.id = result.insertId;
    } else {
      labelinfo.id = labelResult.id;
    }
    labelinfoArr.push(labelinfo);
  }
  context.labelinfoArr = labelinfoArr;

  await next();
};

module.exports = {
  verifyLabelExists,
};
