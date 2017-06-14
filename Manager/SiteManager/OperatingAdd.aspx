<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OperatingAdd.aspx.cs" Inherits="PD.Manager.SiteManager.OperatingAdd" %>

<%@ Register Src="~/UserControls/UC_Top.ascx" TagPrefix="uc1" TagName="UC_Top" %>
<%@ Register Src="~/UserControls/UC_Bottom.ascx" TagPrefix="uc1" TagName="UC_Bottom" %>
<%@ Register Src="~/UserControls/UC_Left.ascx" TagPrefix="uc1" TagName="UC_Left" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>首页</title>
    <link href="../Theme/css/smart.css" rel="stylesheet" />
    <script type="text/javascript" src="/Theme/js/jquery-1.8.3.min.js"></script>
    <script src="../Theme/js/xml-framework.js"></script>
    <script type="text/javascript" src="/Theme/js/select.js"></script>
    <script src="../Theme/js/xml-validator.js"></script>
    <script src="js/OperatingManager.js"></script>
    <script type="text/javascript" src="../Theme/js/jquery.cookie.js"></script>
    <script type="text/javascript">
        $(function () {
            $("i").hide();
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <input id="action" type="hidden" runat="server" />
        <input id="HidID" type="hidden" runat="server" name="HidID"/>
        <input id="CreateDate" type="hidden" runat="server" name="CreateDate"/>
        <div class="mian">
            <div class="mian_top" id="nav" runat="server">您当前的位置：系统管理</div>
            <div class="mian_title" id="title" runat="server">添加权限</div>
            <div>
                <div class="user_main">
                    <div><em>*</em>权限名称：</div>
                    <input type="text" runat="server" id="name" name="name" datacol="yes" err="菜单名" checkexpession="LenStr" length="25" />
                    <i>提示信息</i>
                </div>
                <div class="user_main">
                    <div>父级权限ID：</div>
                    <input type="text" id="parentid" name="parentid" runat="server"/>
                    <i>提示信息</i>
                </div>
                <div class="user_main">
                    <div>编号：</div>
                    <input type="text" runat="server" id="code" name="code" datacol="yes" err="操作权限编号" checkexpession="LenStrOrNull" length="25" />
                    <i>提示信息</i>
                </div>
                <div class="user_main">
                    <div>操作级别：</div>
                    <input type="text" runat="server" id="level" name="level" datacol="yes" err="操作级别" checkexpession="LenNumOrNull" length="2" />
                    <i>提示信息</i>
                </div>
                <div class="user_main">
                    <div>链接地址：</div>
                    <input type="text" runat="server" id="url" name="url" datacol="yes" err="链接地址" checkexpession="LenStrOrNull" length="500" />
                    <i>提示信息</i>
                </div>
                <div class="user_main">
                    <div>操作权限排序：</div>
                    <input type="text" runat="server" id="order" name="order" datacol="yes" err="操作权限排序" checkexpession="LenNumOrNull" length="2" />
                    <i>提示信息</i>
                </div>
                <div class="user_main">
                    <div>是否公共操作：</div>
                    <select id="isPublic" runat="server">
                        <option value="1">是</option>
                        <option value="0">否</option>
                    </select>
                    <input type="hidden" id="isPublic2" name="isPublic2" runat="server"/>
                    <i>提示信息</i>
                </div>
                <div class="user_main_textarea">
                    <div>权限描述：</div>
                    <textarea class="user_main_textarea_ts" runat="server" id="description" name="description" datacol="yes" err="权限描述" checkexpession="LenStrOrNull"></textarea>
                    <i>提示信息</i>
                </div>
                <div class="user_main_search">
                    <a href="javascript:Save();">确定</a>
                    <a href="javascript:Reset();" id="reset" runat="server">重置</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
