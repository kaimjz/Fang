<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="Manager.Index" %>

<%@ Register Src="~/UserControls/UC_Top.ascx" TagPrefix="uc1" TagName="UC_Top" %>
<%@ Register Src="~/UserControls/UC_Bottom.ascx" TagPrefix="uc1" TagName="UC_Bottom" %>
<%@ Register Src="~/UserControls/UC_Left.ascx" TagPrefix="uc1" TagName="UC_Left" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>天鹅阅读网后台管理系统</title>
    <link href="/Theme/css/smart.css" rel="stylesheet" />
    <script type="text/javascript" src="/Theme/js/jquery-1.8.3.min.js"></script>
    <script src="Theme/js/xml-framework.js"></script>
    <script src="SiteManager/js/UserManager.js"></script>
</head>
<body class="body">
    <input type="hidden" runat="server" id="menuid" />
    <input type="hidden" runat="server" id="roleid" />
    <form id="form1" runat="server">
        <%--头部--%>
        <div id="web_bg" style="position: absolute; width: 100%; height: 100%; z-index: -1">
            <img style="position: fixed; top: 0; left: 0;" height="100%" width="100%" src="Theme/images/login_bg.png" />
        </div>
        <div class="header_bg">
            <uc1:UC_Top runat="server" ID="UC_Top" />
        </div>
        <div class="index-center-bj">
            <div class="index-center">
                <%--左侧导航--%>
                <div class="index-left" id="menuleft">
                    <uc1:UC_Left runat="server" ID="UC_Left" />
                </div>
                <div class="index-right" style="height: 100%;">
                    <iframe src="index_bg.html" frameborder="0" scrolling="no" width="100%" height="665" id="manage" name="manage"></iframe>
                </div>
            </div>
        </div>
        <div class="index-center-auto"></div>
        <div class="bottom_bg">
            <uc1:UC_Bottom runat="server" ID="UC_Bottom" />
        </div>
    </form>
</body>
</html>
