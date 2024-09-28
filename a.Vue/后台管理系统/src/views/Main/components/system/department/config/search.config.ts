const searchConfig = {
  pageName: "department",
  labelWidth: "80px",
  itemDataList: [
    {
      type: "input",
      label: "部门名称",
      prop: "name",
      placeholder: "请输入查询的部门名称",
      span: 8,
      initialValue: ""
    },
    {
      type: "input",
      label: "部门领导",
      prop: "leader",
      placeholder: "请输入查询的领导名称",
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
