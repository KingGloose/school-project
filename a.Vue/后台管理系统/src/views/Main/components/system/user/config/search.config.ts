const searchConfig = {
  pageName: "users",
  labelWidth: "80px",
  itemDataList: [
    {
      type: "input",
      label: "用户名",
      prop: "name",
      placeholder: "请输入查询的用户名",
      span: 8,
      initialPropData: ""
    },
    {
      type: "input",
      label: "真实姓名",
      prop: "realname",
      placeholder: "请输入查询的真实姓名",
      span: 8,
      initialPropData: ""
    },
    {
      type: "input",
      label: "手机号码",
      prop: "cellphone",
      placeholder: "请输入查询的手机号码",
      span: 8,
      initialPropData: ""
    },
    {
      type: "select",
      label: "状态",
      prop: "enable",
      placeholder: "请输入查询的状态",
      span: 8,
      options: [
        { label: "启动", value: 1 },
        { label: "禁用", value: 0 }
      ],
      initialPropData: ""
    },
    {
      type: "datepicker",
      label: "创建时间",
      prop: "createAt",
      span: 8,
      initialPropData: ""
    },
    {
      type: "button",
      span: 8
    }
  ]
};

export default searchConfig;
