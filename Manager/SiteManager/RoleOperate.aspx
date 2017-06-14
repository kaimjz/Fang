<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RoleOperate.aspx.cs" Inherits="PD.Manager.SiteManager.RoleOperate" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="../Theme/css/smart.css" rel="stylesheet" />
    <script src="../Theme/js/jquery-1.8.3.min.js"></script>
    <script src="../Theme/js/xml-framework.js"></script>
    <script type="text/javascript" src="../Theme/js/jquery.cookie.js"></script>
    <title>角色授权</title>
    <script type="text/javascript">
        var setHeight = SetpageHeight();

        //选中父节点
        //创建人：lwj
        //时间：2015-6-5
        function CheckBoxP(item, totalCount) {
            var id = $(item).attr("id");
            $("input[name='" + id + "']").not($("input[disabled='disabled']")).each(function () {
                $(this).prop("checked", $(item).prop("checked"));
            })
            var count = 0;
            $("input[newname='MySelect']").each(function () {
                if ($(this)[0].checked) {
                    count++;
                }
            })
            if (count != totalCount) {
                $("[id=selectAll]:checkbox").attr("checked", false);
            } else {
                $("[id=selectAll]:checkbox").attr("checked", true);
            }
        }
        //选中子节点
        //创建人：lwj
        //时间：2015-6-5
        function CheckBoxC(item, totalCount) {

            var name = $(item).attr("name");//父ID
            var allcount = $(item).attr("count");//所有的子节点
            //获取所有的选中的
            var count = 0;
            var ids = "";
            $("input[name='" + name + "']").each(function () {
                if ($(this)[0].checked) {
                    ids += $(this).val() + ",";
                    count++;
                }
            })

            if (count * 1 > 0) {
                $("[id = " + name + "]:checkbox").prop("checked", true);
            }
            else {
                $("[id = " + name + "]:checkbox").prop("checked", false);
            }
        }
        //全选
        //创建人：lwj
        //时间：2015-6-5
        function selectAlls() {
            $("input[newname='MySelect']").not($("input[disabled='disabled']")).each(function () {
                $(this).prop("checked", $("#selectAll").prop("checked"));
            })
        }

        //获取所有选中的ID
        //创建人：lwj
        //时间：2015-6-5
        function GetSelectIds() {
            var ids = "";
            $("input[newname='MySelect']").each(function () {
                if ($(this)[0].checked) {
                    ids += $(this).val() + ",";
                }
            })
            return ids;
        }

        //保存
        //创建人：lwj
        //时间：2015-6-5
        function Save() {

            var parm = { action: "AddRoleOperate", id: GetSelectIds(), roleid: $("#id").val() };
            getAjax("Service/RoleManager.ashx?time=" + new Date().toLocaleTimeString(), parm, function (msg) {
                if (msg == "1") {
                    ShowMsg("提示", "添加成功！", Urlhref, "RoleList.aspx");
                    return;
                }
                if (msg == "0") {
                    ShowMsg("提示", "添加失败！", null, null);
                    return;
                }

            })
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <input type="hidden" id="id" runat="server">
        
        <div class="mian">
            <div class="mian_top">您当前的位置：系统管理</div>
            <div class="mian_title">角色授权</div>
            <div>
                <div class="user_jur" id="operates" runat="server"></div>
                <div class="user_main_search">
                    <a href="javascript:Save()">确定</a> <a href="RoleList.aspx">返回</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
