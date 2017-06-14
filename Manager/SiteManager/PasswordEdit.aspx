<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PasswordEdit.aspx.cs" Inherits="PD.Manager.SiteManager.PasswordEdit" %>

<%@ Register Src="~/UserControls/UC_Top.ascx" TagPrefix="uc1" TagName="UC_Top" %>
<%@ Register Src="~/UserControls/UC_Bottom.ascx" TagPrefix="uc1" TagName="UC_Bottom" %>
<%@ Register Src="~/UserControls/UC_Left.ascx" TagPrefix="uc1" TagName="UC_Left" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>网站管理</title>
    <link href="../Theme/css/smart.css" rel="stylesheet" />
    <link href="../Theme/css/Paging.css" rel="stylesheet" />
    <script src="../Theme/js/jquery-1.8.3.min.js"></script>
    <script src="../Theme/js/xml-validator.js"></script>
    <script src="../Theme/js/xml-framework.js"></script>
    <script type="text/javascript" src="../Theme/js/jquery.cookie.js"></script>
    <script src="../Theme/js/login.js"></script>
    <script type="text/javascript">
        function Save() {
            if (JudgeValidate("form1")) {
               
                var before = $("#repwd").val();
                var news = $("#newpwd").val();
                var result = true;
                var oldpwd = $("#oldpwd").val();
                var a = oldpwd.length;
                var b = news.length;
                var c = before.length;

                if (a > 0 && CheckSpace(oldpwd)) {
                    $("#oldpwd").next().html("密码不能为空格").show();
                    result = false;
                } else if ($.trim(oldpwd) == "") {
                    $("#oldpwd").next().html("必填").show();
                    result = false;
                }

                if (b > 0 && CheckSpace(news)) {
                    $("#newpwd").next().html("密码不能为空格").show();
                    result = false;
                } else if ($.trim(news) == "") {
                    $("#newpwd").next().html("必填").show();
                    result = false;
                }

                if (c > 0 && CheckSpace(before)) {
                    $("#repwd").next().html("密码不能为空格").show();
                    result = false;
                } else if ($.trim(before) == "") {
                    $("#repwd").next().html("必填").show();
                    result = false;
                }

                else {

                    if ($.trim(news).length < 6 || $.trim(news).length > 20) {
                        $("#newpwd").siblings("i").show();
                        $("#newpwd").siblings("i").html("长度为6-20位字符");
                        result = false;
                    }
                    if ($.trim(before) != $.trim(news)) {
                        $("#repwd").siblings("i").show();
                        $("#repwd").siblings("i").html("两次密码不一致");
                        $("#newpwd").focus();
                        result = false;
                    }
                    if (result) {
                        var pwd = $("#newpwd").val();
                        var data = "oldpwd=" + hex_md5($("#oldpwd").val()) + "&newpwd=" + hex_md5($("#newpwd").val());
                        debugger;
                        getAjax("/SiteManager/Service/UserManager.ashx?action=PasswordEdit", data, function (msg) {
                            if (msg == "-1") { ShowMsg("提示", "请登录", function () { location.href("/Login.aspx"); }, null); }
                            else if (msg == "0") { ShowMsg("提示", "修改失败", null, null); Reset(); }
                            else if (msg == "1") { ShowMsg("提示", "修改成功，请重新登录", LoginUrl, null); }
                            else if (msg == "2") { ChangeCss("#oldpwd", "旧密码不正确"); $("#oldpwd").val(""); }
                        }, null);
                    }
                }
            }
        }

        $(function () {
            $("i").hide();
        })
        //修改成功跳转登录页面
        function LoginUrl() {
            top.location.href = '/login.aspx'
        }
    </script>  
</head>
<body>
    <form id="form1" runat="server">
        <div class="mian">
            <div class="mian_top">您当前的位置：系统管理</div>
            <div class="mian_title">修改密码</div>
            <div>
                <div class="user_main">
                    <div><em>*</em>旧密码：</div>
                    <input type="password" name="oldpwd" id="oldpwd"  />
                    <i>提示信息</i>
                </div>
                <div class="user_main">
                    <div><em>*</em>新密码：</div>
                    <input type="password" id="newpwd" name="newpwd"  />
                    <i>提示信息</i>
                </div>
                <div class="user_main">
                    <div><em>*</em>确认密码：</div>
                    <input type="password" id="repwd"  />
                    <i>提示信息</i>
                </div>
                <div class="user_main_search">
                    <a href="javascript:Save();">确定</a>
                    <a href="javascript:Reset();">重置</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
