<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OperatingList.aspx.cs" Inherits="PD.Manager.SiteManager.OperatingList" %>


<%@ Register Src="~/UserControls/UC_Top.ascx" TagPrefix="uc1" TagName="UC_Top" %>
<%@ Register Src="~/UserControls/UC_Bottom.ascx" TagPrefix="uc1" TagName="UC_Bottom" %>
<%@ Register Src="~/UserControls/UC_Left.ascx" TagPrefix="uc1" TagName="UC_Left" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>菜单列表</title>
    <link href="../Theme/css/smart.css" rel="stylesheet" />
    <script type="text/javascript" src="/Theme/js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="/Theme/js/select.js"></script>
    <script src="../Theme/js/xml-framework.js"></script>
    <script src="../Theme/js/ShowPager.js"></script>
    <link href="../Theme/js/easyPager/EasyPager.css" rel="stylesheet" />
    <script src="../Theme/js/easyPager/EasyPager.js"></script>
    <script type="text/javascript" src="../Theme/js/jquery.cookie.js"></script>
    <script src="js/OperatingManager.js"></script>
    <script src="../Theme/js/roleoperate.js"></script>
    <script type="text/javascript">
        var pageindex = 1;
        var recordCount = 1;
        $(function () {
            Search();
        });
        function Search() {
            GetPageList("Service/OperatingManager.ashx", "?action=OperatingList&sname=" + encodeURIComponent($.trim($("#sname").val())), "content", "pagefoot", 10, function (data) {
                GetIndex(data);
                LoadLevel();
            });
        }
        //返回pageindex 
        //add by wsy
        //时间：2015-08-16
        function GetIndex(result) {
            if (!result.thisPageIndex) {
                pageindex = 1;
                recordCount = result.count;
            }
            else {
                pageindex = result.thisPageIndex;
                recordCount = result.recordCount;
            }
        }
        //导出Excel
        //add by wsy
        //时间：2015-08-16
        function ExportExcel(type) {
            var pageSize = 10;
            if (type == "all") {
                pageSize = recordCount;
            }
            //导出当前页
            var data = "?action=exportExcel&type=" + type + "&pageIndex=" + pageindex + "&pageSize=" + pageSize + "&sname=" + encodeURIComponent($.trim($("#sname").val()));
            window.location.href = "Service/OperatingManager.ashx" + data;
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="mian">
            <div class="mian_top">您当前的位置：系统管理</div>
            <div class="mian_title">权限列表</div>
            <div class="user_log_selct">
                <i>名称：</i><input type="text" class="user_log_selct_input" id="sname" />
                <input name="确定" type="button" style="background: #578d83; margin-left: 15px; width: 60px; height: 24px; border: none; color: #fff;" class="user_log_selct_buttun" value="搜索" onclick="Search()" />
            </div>
            <div class="ri_box_mid">
                <div class="NOdate" style="display: none;">无数据</div>
                <table id="content" class="level">
                </table>
                <div class="tab_ft">
                    <div class="tab_ft_le" id="oprselection" runat="server">
                        <div class="tab_ft_le_lt" id="divbottom" runat="server">
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
