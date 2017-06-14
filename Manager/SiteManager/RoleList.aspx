<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RoleList.aspx.cs" Inherits="PD.Manager.SiteManager.RoleList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="../Theme/css/smart.css" rel="stylesheet" />
    <script src="../Theme/js/jquery-1.8.3.min.js"></script>
    <script src="../Theme/js/select.js"></script>
    <script src="../Theme/js/xml-framework.js"></script>
    <script src="../Theme/js/ShowPager.js"></script>
    <link href="../Theme/js/easyPager/EasyPager.css" rel="stylesheet" />
    <script src="../Theme/js/easyPager/EasyPager.js"></script>
    <script type="text/javascript" src="../Theme/js/jquery.cookie.js"></script>
    <script src="../Theme/js/roleoperate.js"></script>
    <link href="../Theme/js/wbox/wbox/wbox.css" rel="stylesheet" />
    <script src="../Theme/js/wbox/wbox.js"></script>
    <title>角色列表</title>
    <script type="text/javascript">

        var pageindex = 1;
        var recordCount = 1;
        //查询列表
        //创建人：lwj
        //时间：2015-6-5
        $(function () {
            Search();
        })
        function Search() {
            var sname = encodeURIComponent($.trim($("#sname").val()));
            GetPageList("Service/RoleManager.ashx", "?action=SelectRoleList&sname=" + sname, "content", "pagefoot", 10, function (data) { GetIndex(data); LoadLevel(); });
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
        function ExportExcel(type) {
            var pageSize = 10;
            if (type == "all") {
                pageSize = recordCount;
            }
            var data = "?action=exportExcel&type=" + type + "&pageIndex=" + pageindex + "&pageSize=" + pageSize + "&sname=" + encodeURIComponent($.trim($("#sname").val()));
            window.location.href = "Service/RoleManager.ashx" + data;
        }
        //编辑角色状态
        //创建人：lwj
        //时间：2015-6-5
        function OperateEdit(id, state) {

            var param = { action: "EditState", id: id, state: state };
            getAjax("Service/RoleManager.ashx?time=" + new Date().toLocaleTimeString(), param, function (msg) {

                if (msg == "1") {
                    if (state == "1") {
                        //停权
                        //ShowMsg("提示", "停用成功！", Urlhref, "RoleList.aspx");
                        ShowMsg("提示", "停用成功！", function () {
                            Search();
                        });
                    } else {
                        //授权
                        ShowMsg("提示", "启用成功！", function () {
                            Search();
                        });
                    }
                    return;
                }
                if (msg == "0") {
                    if (state == "1") {
                        //停权
                        ShowMsg("提示", "停用失败！", function () { Search(); });
                    } else {
                        //授权
                        ShowMsg("提示", "启用失败!", function () { Search(); });
                    }
                    return;
                }
            })
        }

        //选择权限
        function weboxshow(id, name) {
            var url;
            url = "RoleOperateNew.aspx?id=" + id;
            var wBox = $("#wBox").wBox({
                title: "角色《" + name + "》授权",
                requestType: "iframe",
                iframeWH: { width: 630, height: 550 },
                target: url
            });
            wBox.showBox();
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="mian">
            <div class="mian_top">您当前的位置：系统管理</div>
            <div class="mian_title">角色列表</div>
            <div class="user_log_selct">
                <i>角色名：</i><input type="text" class="user_log_selct_input" id="sname" />
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
