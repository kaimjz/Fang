<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserList.aspx.cs" Inherits="PD.Manager.SiteManager.UserList" %>

<%@ Register Src="~/UserControls/UC_Top.ascx" TagPrefix="uc1" TagName="UC_Top" %>
<%@ Register Src="~/UserControls/UC_Bottom.ascx" TagPrefix="uc1" TagName="UC_Bottom" %>
<%@ Register Src="~/UserControls/UC_Left.ascx" TagPrefix="uc1" TagName="UC_Left" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>用户列表</title>
    <link href="../Theme/css/smart.css" rel="stylesheet" />
    <script src="../Theme/js/jquery-1.8.3.min.js"></script>
    <script src="../Theme/js/jquery.select.js"></script>
    <script src="../Theme/js/select.js"></script>
    <script src="../Theme/js/xml-framework.js"></script>
    <script src="../Theme/js/xml-validator.js"></script>
    <script src="../Theme/js/login.js"></script>
    <script src="js/UserManager.js"></script>
    <link href="../Theme/js/easyPager/EasyPager.css" rel="stylesheet" />
    <script src="../Theme/js/easyPager/EasyPager.js"></script>
    <script type="text/javascript" src="../Theme/js/jquery.cookie.js"></script>
    <script src="../Theme/js/roleoperate.js"></script>

    <script type="text/javascript">
        var pageindex = 1;
        var recordCount = 1;
        $(function () {
            Search();
            $("#all").click(function () {
                var flag = $(":checkbox[name='all']")[0].checked;
                $(":checkbox").each(function () {
                    this.checked = flag;
                });
            });
        })
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <input type="hidden" id="id" />
        <div class="mian">
            <div class="mian_top">您当前的位置：系统管理</div>
            <div class="mian_title">用户列表</div>
            <div class="user_log_selct">
                用户名/Email：<input type="text" class="user_log_selct_input" id="name" />
                <a href="javascript:Search()">搜索</a>
            </div>
            <div class="ri_box_mid">
                <div class="NOdate" style="display: none;">无数据</div>
                <table id="content" class="level">
                </table>
                <div class="tab_ft">
                    <div class="tab_ft_le" id="oprselection" style="display: none">
                        <div class="tab_ft_le_lt" id="divbottom">
                            <span><a href="javascript:void(0);" onclick="ExportExcel('now')">导出当前页</a></span>
                            <span><a href="javascript:void(0);" onclick="ExportExcel('all')">导出全部列表</a></span>
                        </div>
                    </div>
                    <div class="tab_ft_ri" id="pagefoot"></div>
                </div>
            </div>
            <!--弹出层样式-->
            <div class="pop_bg" style="display: none;"></div>
            <!--修改密码-->
            <div class="tan_cong" style="display: none;" id="updatepwd">
                <div class="tan_top_bj">
                    <span class="tan_top_title">重置密码</span>
                    <span class="tan_top_fast"><a href="javascript:closetan();">X</a></span>
                </div>
                <div class="tan_pas">
                    <div class="tan_password">
                        <span>新密码：</span>
                        <input type="password" id="pwd" />
                        <em></em>
                    </div>
                    <div class="tan_password">
                        <span>确认密码：</span>
                        <input type="password" id="repwd" />
                        <em></em>
                    </div>
                </div>
                <div class="tan_buttun">
                    <a href="javascript:checkPWD();">确定</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
