<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RoleOperateNew.aspx.cs" Inherits="PD.Manager.SiteManager.RoleOperateNew" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="../Theme/js/jquery-1.8.3.min.js"></script>
    <link href="../Theme/css/smart.css" rel="stylesheet" />
    <script src="../Theme/js/xml-framework.js"></script>
    <link href="../Theme/zTree/css/demo.css" rel="stylesheet" />
    <link href="../Theme/zTree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet" />
    <script src="../Theme/zTree/js/jquery.ztree.core.js"></script>
    <script src="../Theme/zTree/js/jquery.ztree.excheck.js"></script>
    <script>
        var setHeight = SetpageHeight();
        var setting = {
            check: {
                enable: true
            },
            data: {
                simpleData: {
                    enable: true
                }
            }
        };
        $(function () {
            getJsonAjax("Service/RoleOperateManager.ashx", {
                action: "zTree", id: $("#hid_id").val()
            }, function (msg) {
                if (msg) {
                    var zNodes = msg;
                    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                }
            })
        })

        //保存权限
        function SaveRole() {
            var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            var nodes = treeObj.getCheckedNodes(true);
            var ids = "";
            var names = "";
            $(nodes).each(function (i, t) {
                ids += t.id + ",";
                names += t.name + ",";
            });
            var parm = { action: "AddRoleOperateNew", id: ids, roleid: $("#hid_id").val() };
            getAjax("Service/RoleOperateManager.ashx?time=" + new Date().toLocaleTimeString(), parm, function (msg) {
                if (msg == "1") {
                    ShowMsg("提示", "添加成功！", Return,null);
                    return;
                }
                if (msg == "0") {
                    ShowMsg("提示", "添加失败！", null, null);
                    return;
                }
            })
        }
        //返回列表
        function Return() {
            parent.$(".wBox_close").click();//关闭当前页面
        }
    </script>
</head>
<body>
    <input type="hidden" id="hid_id" runat="server" value="" />
    <form id="form1" runat="server">
        <div class="content_wrap">
            <div class="zTreeDemoBackground left">
                <ul id="treeDemo" class="ztree"></ul>
            </div>
        </div>
        <div class="user_main_search" style="margin-top:103px; width:595px;">
            <a id="ctlBtn" style="cursor: pointer;" onclick="SaveRole()">保存</a>
            <a id="cancle" style="cursor: pointer;" onclick="Return()">取消</a>
        </div>
    </form>
</body>
</html>
