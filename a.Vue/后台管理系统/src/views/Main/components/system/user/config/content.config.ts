const contentConfig = {
  pageName: "users",
  header: {
    title: "用户列表",
    btnTitle: "新建用户"
  },
  itemDataList: [
    { type: "selection" },
    { type: "index", label: "序号", width: "55px" },

    { type: "normal", prop: "name", label: "用户名" },
    { type: "normal", prop: "realname", label: "真实姓名" },
    { type: "normal", prop: "cellphone", label: "手机号码" },

    { type: "custom", prop: "enable", label: "状态", slotName: "enable" },
    { type: "custom", prop: "createAt", label: "创建时间", slotName: "createAt" },
    { type: "custom", prop: "updateAt", label: "更新时间", slotName: "updateAt" },

    { type: "handle", label: "操作" }
  ]
};

export default contentConfig;
