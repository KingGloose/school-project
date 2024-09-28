const contentConfig = {
  pageName: "department",
  header: {
    title: "部门列表",
    btnTitle: "新建部门"
  },
  itemDataList: [
    { type: "selection" },
    { type: "index", label: "序号", width: "55px" },

    { type: "normal", prop: "name", label: "部门名称" },
    { type: "normal", prop: "leader", label: "部门领导" },

    { type: "custom", prop: "parentId", label: "上级部门", slotName: "parentId" },
    { type: "custom", prop: "createAt", label: "创建时间", slotName: "createAt" },
    { type: "custom", prop: "updateAt", label: "更新时间", slotName: "updateAt" },

    { type: "handle", label: "操作" }
  ]
};

export default contentConfig;
