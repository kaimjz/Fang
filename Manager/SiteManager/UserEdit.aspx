<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserEdit.aspx.cs" Inherits="PD.Manager.SiteManager.UserEdit" %>


<%@ Register Src="~/UserControls/UC_Top.ascx" TagPrefix="uc1" TagName="UC_Top" %>
<%@ Register Src="~/UserControls/UC_Bottom.ascx" TagPrefix="uc1" TagName="UC_Bottom" %>
<%@ Register Src="~/UserControls/UC_Left.ascx" TagPrefix="uc1" TagName="UC_Left" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title id="htmlname" runat="server"></title>
    <link href="../Theme/css/smart.css" rel="stylesheet" />
    <script src="../Theme/js/jquery-1.8.3.min.js"></script>
    <script src="../Theme/js/jquery.select.js"></script>
    <script src="../Theme/js/select.js"></script>
    <script src="../Theme/js/login.js"></script>
    <script src="../Theme/js/xml-framework.js"></script>
    <script src="../Theme/js/xml-validator.js"></script>
    <script type="text/javascript" src="../Theme/js/jquery.cookie.js"></script>
    <script src="js/UserManager.js"></script>
    <script type="text/javascript">
        $(function () {
            if ($("#userid").val() == "") {
                //add_user：显示密码框
                $("#pwd").parent().show();
                $("#repwd").show();
            }
            else {
                //edit_user：隐藏密码框
                $("#pwd").parent().hide();
                $("#repwd").parent().hide();
                //username readonly
                $("#username").attr("disabled", "disabled");
            }
            BindRole();
        });

    </script>
</head>
<body>
    <form id="form1" runat="server">

        <input id="userid" name="userid" type="hidden" runat="server" />
        <input id="roleid" name="roleid" type="hidden" runat="server" />
        <div class="mian">
            <div class="mian_top">您当前的位置：<span id="location" runat="server"></span></div>
            <div class="mian_title" id="title" runat="server">添加用户</div>
            <div>
                <div class="user_main">
                    <div><em>*</em>角色选择：</div>
                    <select id="roleBind" runat="server">
                    </select>
                    <i></i>
                </div>
                <div class="user_main">
                    <div><em>*</em>用户名：</div>
                    <input type="text" id="username" runat="server" />
                    <i></i>
                </div>
                <div class="user_main">
                    <div><em>*</em>真实姓名：</div>
                    <input type="text" id="realName" runat="server" />
                    <i></i>
                </div>
                <div class="user_main">
                    <div><em>*</em>密码：</div>
                    <input type="password" id="pwd" />
                    <i></i>
                </div>
                <div class="user_main">
                    <div><em>*</em>确认密码：</div>
                    <input type="password" id="repwd" />
                    <i></i>
                </div>
                <div class="user_main">
                    <div>Email地址：</div>
                    <input type="text" id="email" runat="server" />
                    <i></i>
                </div>
                <div class="user_main">
                    <div>联系电话：</div>
                    <input type="text" id="tel" runat="server" />
                    <i></i>
                </div>
                <div class="user_main_textarea_ne">
                    <div>用户状态：</div>
                    <input type="radio" name="State" id="statusFalse" value="0" runat="server" checked="true"/>停用
                    <input type="radio" name="State" id="statusTrue" value="1" runat="server" />启用
                    <i></i>
                </div>
                <div class="user_main_textarea">
                    <div>备注：</div>
                    <textarea class="user_main_textarea_ts" runat="server" id="remark"></textarea>
                </div>
                <div class="user_main_search">
                    <a href="javascript:Save();">确定</a>
                    <a href="javascript:Back();" id="back" runat="server">重置</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>










