const MomentService = require("../service/moment.service");
const LabelService = require("../service/label.service");

const { APP_HOST, APP_PORT } = require("../app/config");

class MomentController {
  // 插入新文章
  async create(context, next) {
    const userId = context.user.id;
    const content = context.request.body.content;

    const result = await MomentService.IncertContext(userId, content);
    console.log("文章接口:" + result);

    context.body = "发表成功";
  }

  // 获取某一条动态的详情
  async detail(context, next) {
    const id = context.request.params.momentId;
    const result = await MomentService.getContentById(id);
    const [labelResult] = await LabelService.GetLabelByMomentId(id);
    const [Pricture] = await MomentService.GetPictrueByMomentId(id);

    // 添加标签
    let Label = [];
    for (let labelinfo of labelResult) {
      let { label_id } = labelinfo;
      const labelInfo = await LabelService.GetLabelByLabelId(label_id);
      Label.push({ id: label_id, name: labelInfo[0][0].name });
    }
    result.Label = Label;

    // 添加图片
    let PrictureArr = [];
    for (let file of Pricture) {
      let { id } = file;
      let url = `${APP_HOST}:${APP_PORT}/upload/pictrue/${id}`;
      PrictureArr.push({ id, url });
    }
    result.Pricture = PrictureArr;

    context.body = result;
  }

  // 获取多条动态
  async GetList(context, next) {
    const { page, size } = context.request.query;

    const result = await MomentService.getContentList(
      Number(page),
      Number(size)
    );

    context.body = result;
  }

  // 修改动态
  async update(context, next) {
    const id = context.request.params.momentId;
    const content = context.request.body.content;

    const result = await MomentService.UpdateContent(id, content);

    context.body = "修改成功~";
  }

  // 删除动态
  async remove(context, next) {
    const id = context.request.params.momentId;

    const result = await MomentService.RemoveContent(id);

    context.body = "删除成功~";
  }
}

module.exports = new MomentController();
