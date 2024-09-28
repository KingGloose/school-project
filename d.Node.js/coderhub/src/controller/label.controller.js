const LabelService = require("../service/label.service");

class LabelController {
  // 1. 创建标签
  async create(context, next) {
    const { name } = context.request.body;
    let result = await LabelService.CreateLabel(name);

    context.body = "创建标签~";
  }

  // 2. 为动态添加标签
  async addLabel(context, next) {
    const { labelinfoArr } = context;
    const { momentId } = context.request.params;

    for (let label of labelinfoArr) {
      let isExist = await LabelService.hasLabelInMoment(momentId, label.id);

      if (!isExist) {
        let result = await LabelService.addLabel(momentId, label.id);
      }
    }

    context.body = "给动态添加标签";
  }

  // 3. 展示标签数据
  async list(context, next) {
    const { page, size } = context.request.query;

    let [result] = await LabelService.GetLabel(page, size);

    context.body = result;
  }
}

module.exports = new LabelController();
