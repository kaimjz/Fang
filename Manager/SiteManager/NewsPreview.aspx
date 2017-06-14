<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="NewsPreview.aspx.cs" Inherits="PD.Manager.SiteManager.NewsPreview" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>新闻阅览</title>
    <link href="../Theme/css/new2.css" rel="stylesheet" />
    <link href="../Theme/CarouselImg/css/galleryview.css" rel="stylesheet" />

    <script src="../Theme/js/jquery-1.8.3.min.js"></script>
    <script src="../Theme/js/xml-framework.js"></script>
    <script src="../Theme/CarouselImg/js/jquery.easing.1.3.js"></script>
    <script src="../Theme/CarouselImg/js/jquery.galleryview-1.1.js"></script>
    <script src="../Theme/CarouselImg/js/jquery.timers-1.1.2.js"></script>
    <script type="text/javascript" src="../Theme/js/jquery.cookie.js"></script>
    <style type="text/css">
        .Taskman_h a{
            text-decoration:underline !important;
            color:blue;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <input type="hidden" id="img" runat="server" />
        <input type="hidden" id="newid" runat="server" />
        <input id="hid_preview" type="hidden" runat="server" />

        <div class="mian">
            <div class="mian_top">您当前的位置：网站管理</div>
            <div class="mian_title">新闻预览</div>
            <div class="Taskman_center">
                <span id="title" runat="server"></span>
                <p id="subtitle" runat="server"></p>
            </div>
            <div class="Taskman_h" style="width: 805px;margin: 0 auto;">
                <div class="Taskman_h_title"></div>
                <div id="photos" class="galleryview" style="margin: 0 auto;"></div>
                <p id="content" runat="server"></p>
            </div>
            <div class="Taskman_main_search">
                <a href="javascript:JumpPage()">返回编辑</a>
                <a href="javascript:GoBackList()">返回列表</a>
            </div>
        </div>
    </form>
    <script type="text/javascript">
        var imgs = $("#img").val();
        if (imgs != "") {
            $("#photos").append(imgs).show();
            $('#photos').galleryView({
                panel_width: 600,
                panel_height: 300,
                frame_width: 80,
                frame_height: 80
            });
        }

        function JumpPage() {
            if ($("#newid") != "") {
                window.location.href = "/SiteManager/NewsEdit.aspx?action=edit&id=" + $("#newid").val();
            } else {
                $.cookie("useCookie", "true");
                window.location.href = "/SiteManager/NewsList.aspx";
            }
        }
        function GoBackList() {
            $.cookie("useCookie", "true");
            window.location.href = "/SiteManager/NewsList.aspx";
        }
        //调整高度
        $(function () {
            $(window).load(function () {
                SetpageHeight();
            });
        })
    </script>
</body>
</html>
