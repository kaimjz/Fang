<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RoleEdit.aspx.cs" Inherits="PD.Manager.SiteManager.RoleEdit" %>

<%@ Register Src="~/UserControls/UC_Top.ascx" TagPrefix="uc1" TagName="UC_Top" %>
<%@ Register Src="~/UserControls/UC_Bottom.ascx" TagPrefix="uc1" TagName="UC_Bottom" %>
<%@ Register Src="~/UserControls/UC_Left.ascx" TagPrefix="uc1" TagName="UC_Left" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>添加角色</title>
 
    <link href="../Theme/css/smart.css" rel="stylesheet" />
    <script src="../Theme/js/jquery-1.8.3.min.js"></script>
    <script src="../Theme/js/jquery.select.js"></script>
    <script src="../Theme/js/xml-validator.js"></script>
    <script src="../Theme/js/xml-framework.js"></script>
    <script src="js/OperatingManager.js"></script>
    <script type="text/javascript" src="../Theme/js/jquery.cookie.js"></script>
   <script type="text/javascript">
       //保存
       //创建人：lwj
       //时间：2015-6-5
       function RoleSave() {
           var result = true;
           var role = $.trim($("#role").val());
           var roleRemark = $.trim($("#roleRemark").val());
           var state;
           if ($('input:radio[name="radio1"]:checked').val() == "1") {
               state = "1";
           }
           else {
               state = "0";
           }
           if ($.trim(role) == "") {
               $("#role").next().html("必填").show();
               result = false;
           }
           else {
               if ($.trim(role).length > 25) {
                   $("#role").next().html("长度为1-25").show();
                   result = false;
               }
               else {
                   $("#role").next().html("").hide();
               }
           }
           var id = $("#id").val();
           var mag = "";
           if (id == ""){
               action = "RoleAdd";
               mag = "添加";
           } else {
               action = "RoleEdit";
               mag = "编辑";
           }
           
           var parm = { action: action, role: role, roleRemark: roleRemark, state: state,id:id };

           if (result) {
               getAjax("Service/RoleManager.ashx?time=" + new Date().toLocaleTimeString(), parm, function (msg) {
                   if (msg == "1") {
                       ShowMsg("提示", mag+"成功！",TurnHtml,null);
                       return;
                   }
                   if (msg == "0") {
                       ShowMsg("提示", mag+"失败！", null, null);
                       return;
                   }
                   if (msg == "-1") {
                       ShowMsg("提示", "角色名重复！", null, null);
                       return;
                   }
               });
           }
       }
       //跳转页面
       //创建人：lwj
       //时间：2015-6-5
       function TurnHtml() {
           location.href = "RoleList.aspx";
       }

       //重置或返回
       //创建人：lwj
       //时间：2015-6-5
       function Resets() {
           var id = $("#id").val();
           if(id==""){
               //添加
               $("#role").val("");
               $("#roleRemark").val("");
               $("#role").next().html("").hide();
               
           } else {
               //编辑
               TurnHtml();
           }
       }

   </script>
</head>
<body>
    <form id="form1" runat="server">
        <input type="hidden" id="id" runat="server">
        
        <div class="mian">
            <div class="mian_top">您当前的位置：系统管理</div>
            <div class="mian_title" id="tou" runat="server"></div>
            <div>
                <div class="user_main">
                    <div><em>*</em>角色名：</div>
                    <input type="text" id="role" runat="server"/>
                    <i>提示信息</i>
                </div>
                <div class="user_main_textarea">
                    <div>角色描述：</div>
                    <textarea class="user_main_textarea_ts" id="roleRemark" runat="server" style="height:149px;"></textarea>
                </div>
                 <div class="user_main_textarea_ne">
                    <div>状态：</div>
                     <input type="radio" id="operate" name="radio1" runat="server" checked="true" value="1"/>启用
                     <input type="radio" id="operate1" name="radio1" runat="server" value="0"/>停用
                </div>
               
                <div class="user_main_search">
                    <a href="javascript:RoleSave()">确定</a>
                    <a href="javascript:Resets()" id="Reset" runat="server">返回</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>















