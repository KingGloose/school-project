window.pageTools = window.pageTools || {};

(function () {
  function Login(isLogin, superViewSelector, eventListiner) {
    this.isLogin = isLogin;
    this.superView = $(superViewSelector);
    this.init();
    this.eventListiner = eventListiner;
  }
  pageTools.Login = Login;
})();

// 添加对话框页面初始化函数。
Login.prototype.init = function () {
  //核心代码
  var isShow = this.isLogin ? " none" : "block"; //登录或注册对话框确认按钮要不要显示
  var buttonText = this.isLogin ? "登录" : "注册"; //设置提交按钮上的文字内容
  //添加对话框DOM
  this.dialog = $(
    '<div class="dialog">\
    <button class="close-btn">&times;</button>\
    <div class="input-box">\
    <input type="text" placeholder="用户名">\
    <input type="password" placeholder="密码">\
    <input type="password" placeholder="确认密码" class="again-pwd">\
    <button class="btn"></button>\
    </div>\
    </div>'
  );
  //添加DOM到文档中
  this.superView.append(this.dialog);
  //如果是登录则不显示确认密码框，如果是注册则显示
  $(".again-pwd").css("display", isShow);
};

// 添加关闭的事件。
$(".btn")
  .text(buttonText)
  .click(
    function () {
      this.dialog.remove(); //清除dialog这个div中所有内容，包括自身
      this.dialog = null; //垃圾回收处理
      this.eventListiner();
    }.bind(this)
  );
//单击“关闭”按钮时，清除上面创建的对话框DOM
$(".close_btn").click(
  function () {
    this.dialog.remove();
    this.dialog = null;
    this.eventListener();
  }.bind(this)
);
