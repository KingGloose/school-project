const contentConfig = {
  pageName: "menu",
  header: {
    title: "菜单列表",
    btnTitle: "新建菜单"
  },
  itemDataList: [
    { type: "normal", prop: "name", label: "菜单名称" },
    { type: "normal", prop: "type", label: "级别" },
    { type: "normal", prop: "url", label: "菜单url" },
    { type: "normal", prop: "icon", label: "菜单icon" },
    { type: "normal", prop: "sort", label: "排序" },
    { type: "normal", prop: "permission", label: "权限" },

    { type: "custom", prop: "createAt", label: "创建时间", slotName: "createAt" },
    { type: "custom", prop: "updateAt", label: "更新时间", slotName: "updateAt" },

    { type: "handle", label: "操作" }
  ],
  childrenTree: {
    rowKey: "id",
    treeProps: {
      children: "children"
    }
  }
};

export default contentConfig;
