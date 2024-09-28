import Vue from "vue";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);
//中文提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN";

//表单验证
VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`,
  },
  attributes: {
    phone: "手机号",
    password: "密码",
    Repassword: "确认密码",
    agree: "协议",
  },
});

//自定义校验规则
VeeValidate.Validator.extend("tongyi", {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + "必须同意",
});
