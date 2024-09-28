const searchConfig = {
  pageName: "role",
  labelWidth: "80px",
  itemDataList: [
    {
      type: "input",
      label: "角色名称",
      prop: "name",
      placeholder: "请输入查询的角色名称",
      span: 8,
      initialValue: ""
    },
    {
      type: "input",
      label: "权限介绍",
      prop: "intro",
      placeholder: "请输入查询的权限介绍",
      span: 8,
      initialValue: ""
    },
    {
      type: "datepicker",
      label: "创建时间",
      prop: "createAt",
      span: 8,
      initialValue: ""
    },
    {
      type: "button",
      span: 8,
      offset: 16
    }
  ]
};

export default searchConfig;
