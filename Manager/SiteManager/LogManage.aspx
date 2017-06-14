<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LogManage.aspx.cs" Inherits="PD.Manager.SiteManager.LogManage" %>


<%@ Register Src="~/UserControls/UC_Top.ascx" TagPrefix="uc1" TagName="UC_Top" %>
<%@ Register Src="~/UserControls/UC_Bottom.ascx" TagPrefix="uc1" TagName="UC_Bottom" %>
<%@ Register Src="~/UserControls/UC_Left.ascx" TagPrefix="uc1" TagName="UC_Left" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>用户日志</title>
    <link href="../Theme/css/smart.css" rel="stylesheet" />
    <script type="text/javascript" src="../Theme/js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="../Theme/js/select.js"></script>
    <script type="text/javascript" src="../Theme/js/xml-framework.js"></script>
    <script type="text/javascript" src="../Theme/js/easyPager/EasyPager.js"></script>
    <link href="../Theme/js/easyPager/EasyPager.css" rel="stylesheet" />
    <script type="text/javascript" src="js/LogManager.js"></script>
    <script type="text/javascript" src="../Theme/js/ShowPager.js"></script>
    <script type="text/javascript" src="../Theme/js/jquery.cookie.js"></script>
    <script type="text/javascript">
        var pageindex = 1;
        var recordCount = 1;
        $(function () {
            BindModel();
            //绑定日志列表
            Search();
        });
        function BindModel() {
            var data = { action: "selectOperate" }
            getAjax("Service/LogManager.ashx", data, function (msg) {
                $("#model").html(msg);
            });
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <input type="hidden" id="logid" runat="server" />
        <div class="mian">
            <div class="mian_top">您当前的位置：系统管理</div>
            <div class="mian_title">用户日志</div>
            <div class="user_log_selct">
                <i>操作模块：</i>
                <select id="model">
                </select>
                <a href="javascript:Search()">搜索</a>
            </div>
            <div class="ri_box_mid">
                <div class="NOdate" style="display: none;">无数据</div>
                <table id="content">
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
        </div>
    </form>
</body>
</html>











