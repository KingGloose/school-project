const contentConfig = {
  pageName: "role",
  header: {
    title: "角色列表",
    btnTitle: "新建角色"
  },
  itemDataList: [
    { type: "selection" },
    { type: "index", label: "序号", width: "55px" },

    { type: "normal", prop: "name", label: "角色名称" },
    { type: "normal", prop: "intro", label: "权限介绍" },

    { type: "custom", prop: "createAt", label: "创建时间", slotName: "createAt" },
    { type: "custom", prop: "updateAt", label: "更新时间", slotName: "updateAt" },

    { type: "handle", label: "操作" }
  ]
};

export default contentConfig;
