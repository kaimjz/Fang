<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Manager.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <link href="Theme/css/login_css.css" rel="stylesheet" />
    <link href="Theme/css/smart.css" rel="stylesheet" />
    <script src="/Theme/js/jquery-1.8.3.min.js"></script>
    <script src="Theme/js/jquery.cookie.js"></script>
    <script src="/Theme/js/xml-framework.js"></script>
    <script src="Theme/js/xml-validator.js"></script>

    <script src="Theme/js/login.js"></script>
    <title>用户登录</title>
    <script type="text/javascript">
        function sub_check() {
            var input_check = true;
            var txtName = $("#txtName").val();
            var txtPassword = $("#txtPassword").val();
            var codeval = $("#txtcode").val(); 
            if (txtName == "") {
                $("#txtName").focus();
                ShowMsg("提示", "登录账号不能为空", null, null);
                input_check = false;
            } else if (txtPassword == "") {
                $("#txtPassword").focus();
                ShowMsg("提示", "登录密码不能为空", null, null);
                input_check = false;
            } else if (codeval == "") {
                $("#txtPassword").focus();
                ShowMsg("提示", "验证码不能为空");
                input_check = false;
            } else if (codeval.length > 0) {
                if ($.trim(codeval).toLowerCase() != $.trim($.cookie("backcode")).toLowerCase()) {
                    $("#txtcode").focus();
                    ShowMsg("提示", "验证码输入不正确", null, null);
                    changeimg();
                    input_check = false;
                }
            }
            if (input_check) {
                var url = "/SiteManager/Service/UserManager.ashx?time=" + new Date().toLocaleTimeString();
                var para = { action: "login", name: txtName, password: hex_md5(txtPassword) };
                getAjax(url, para, function (data) {
                    if (data == "0") {
                        $("#txtName").focus();
                        ShowMsg("提示", "登录账号不存在", null, null);
                    }
                    if (data == "-1") {
                        $("#txtName").focus();
                        $("#txtPassword").val("");
                        $("#txtcode").val("");
                        ShowMsg("提示", "登录密码不正确", null, null);
                    }
                    if (data == "0") {
                        $("#txtName").focus();
                        $("#txtPassword").val("");
                        $("#txtcode").val("");
                        ShowMsg("提示", "该账号已停用", null, null);
                    }
                    if (data == "1") {
                        window.location.href = '/Index.aspx';
                    }
                })
            }
        }
        //update by wj 2015-05-11

        $(function () {
            $(document).keypress(function (event) {
                if (event.which == 13) {
                    sub_check();
                }
            });
            changeimg();
        })

        function changeimg() {
            document.getElementById('validimg').src = "SiteManager/Service/UserManager.ashx?t=" + new Date().toLocaleTimeString() + "&action=CheckCode";
        };
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="web_bg" style="position: absolute; width: 100%; height: 100%; z-index: -1">
            <img style="position: fixed;" src="/Theme/images/login_bg.png" height="100%" width="100%" />
        </div>
        <div class="login_bg">
            <div class="login">
                <div class="login-logo">
                    <img src="Theme/images/login_logo.png" width="455" height="90" />
                </div>
                <div class="login-title">后台系统登录</div>
                <div class="login-imput1">
                    <input type="text" class="login-imput11" id="txtName" value="" />
                </div>
                <div class="login-name">账&nbsp;&nbsp;号：</div>
                <div class="login-imput2">
                    <input type="password" class="login-imput11" id="txtPassword" value="" />
                </div>
                <div class="login-password">密&nbsp;&nbsp;码：</div>
                <div class="login-imput3">
                    <input type="text" class="login-imput33" id="txtcode" maxlength="4" value="" />
                </div>
                <div class="login-code">验证码：</div>
                <div class="login-imput4">
                    <img id="validimg" width="78" height="34" onclick="changeimg()" />
                </div>
                <div class="login-imput5"><a href="javascript:sub_check();">登录</a></div>
            </div>
        </div>
    </form>
</body>
</html>
