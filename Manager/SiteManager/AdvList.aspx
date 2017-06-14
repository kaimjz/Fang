<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AdvList.aspx.cs" Inherits="PD.Manager.SiteManager.AdvList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="../Theme/css/smart.css" rel="stylesheet" />
    <link href="../Theme/js/easyPager/EasyPager.css" rel="stylesheet" />
    <script type="text/javascript" src="../Theme/js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="../Theme/js/select.js"></script>
    <script type="text/javascript" src="../Theme/js/jquery.select.js"></script>
    <script type="text/javascript" src="../Theme/js/easyPager/EasyPager.js"></script>
    <script type="text/javascript" src="../Theme/js/xml-framework.js"></script>
    <script type="text/javascript" src="../Theme/js/xml-validator.js"></script>
    <script type="text/javascript" src="js/AdvManager.js"></script>
    <script type="text/javascript" src="../Theme/js/jquery.cookie.js"></script>
    <%--<script type="text/javascript" src="../Theme/js/roleoperate.js"></script>--%>
    <title></title>
    <script type="text/javascript">
        var pageindex = 1;
        var recordCount = 1;
        $(function () {
            Search();
        });
        function doover(obj) {
            obj.offsetParent.childNodes['1'].style.display = "block";
        } 
        function doout(obj) {
            obj.offsetParent.childNodes['1'].style.display = "none";
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <input type="hidden" id="advid" value="" />
        <div class="mian">
            <div class="mian_top">您当前的位置：网站管理</div>
            <div class="mian_title">广告列表</div>
            <div class="user_log_selct">
                <i>广告位置：</i><input type="text" class="user_log_selct_input" id="sname" />
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
        </div>
    </form>
</body>
</html>
