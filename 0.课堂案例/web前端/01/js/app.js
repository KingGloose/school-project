(function () {
  // 主函数
  var loginView = null; // 设置变量用于存放对话框DOM
  function loginRegisterAction(event) {
    event.preventDefault(); // 阻止a标签的默认形为
    // loginView = null
    if (!loginView) {
      // 如果对话框没有显示出来
      var type = event.target.dataset.type;
      // console.log(type, event);
      loginView = new pageTools.Login(type == "login", "body", function () {
        loginView = null;
      });
    }
  }

  function loginRegister() {
    $(".login").click(loginRegisterAction);
    $(".register").click(loginRegisterAction);
  }

  // 主函数(入口函数)
  function main() {
    loginRegister();
  }

  main();
})();
