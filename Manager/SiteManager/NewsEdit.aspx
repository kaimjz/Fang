<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="NewsEdit.aspx.cs" Inherits="PD.Manager.SiteManager.NewsEdit" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" charset="gbk" />
    <title></title>
    <link href="../Theme/css/smart.css" rel="stylesheet" />
    <link href="../Theme/moreImgUpload/css/style.css" rel="stylesheet" />
    <link href="../Theme/moreImgUpload/css/webuploader.css" rel="stylesheet" />
    <script src="../Theme/js/jquery-1.8.3.min.js"></script>
    <script src="../Theme/js/UEditor/ueditor.config.js"></script>
    <script src="../Theme/js/UEditor/ueditor.all.min.js"></script>
    <script src="../Theme/js/UEditor/lang/zh-cn/zh-cn.js"></script>
    <script src="../Theme/moreImgUpload/Script/bootstrap.min.js"></script>
    <script src="../Theme/moreImgUpload/Script/webuploader.js"></script>
    <script src="../Theme/js/xml-framework.js"></script>
    <script src="../Theme/js/xml-validator.js"></script>
    <%--<script type="text/javascript" src="../Theme/js/jquery.cookie.js"></script>--%>
    <script src="js/NewsEdit.js"></script>
    <style type="text/css">
        .iht img {
            width: 36px !important;
            height: 30px !important;
        }

        #edui1_iframeholder {
            width: 821px !important;
            height: 222px !important;
        }

        #edui1 {
            width: 821px !important;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <input id="countmore" type="hidden" runat="server" />
        <input id="Newid" runat="server" type="hidden" />
        <input id="content" runat="server" type="hidden" />
        <input id="count" type="hidden" runat="server" />
        <input id="deleteid" type="hidden" runat="server" />
        <input id="previewflag" type="hidden" runat="server" />
        <input id="flag" type="hidden" runat="server" value="" />
        <input id="tipcount" type="hidden" runat="server" value="1" />
        <input id="draftbox" type="hidden" runat="server" value="0" />
        <div class="mian">
            <div class="mian_top">您当前的位置：网站管理</div>
            <div class="mian_title" id="htmltitile" runat="server"></div>
            <div>
                <div class="user_main">
                    <div class="user_main_new_div3"><em>*</em>标题：</div>
                    <input type="text" id="title" runat="server" />
                    <i></i>
                </div>
                <div class="user_main">
                    <div class="user_main_new_div3">副标题：</div>
                    <input type="text" id="subtitle" runat="server" />
                    <i></i>
                </div>
                <div class="user_main">
                    <div class="user_main_new_div3"><em>*</em>新闻来源：</div>
                    <input type="text" id="source" runat="server" />
                    <i></i>
                </div>
                <div class="user_main_new" style="overflow: hidden">
                    <div class="user_main_new_div2" style="width: 70px;"><em>*</em>内容：</div>
                    <div id="edit" style="float: left;">
                        <textarea id="content1" cols="100" rows="8" style="width: 800px; height: 300px;" runat="server"></textarea>
                        <i style="display: none; top: 53px;"></i>
                    </div>
                </div>

                <table class="tc_table_cp2" border="0" style="margin-left: -15px; margin-top: 25px;">
                    <tr>
                        <td width="104" id="imgTitle">图标：</td>
                        <td colspan="3" style="position: relative;">
                            <div id="fileList" runat="server"></div>
                            <div class="cp_img_jia" id="filePicker" style="width: 121px; height: 81px;"></div>
                            <div style="position: absolute; left: 0px; top: -26px; font-size: 10px;">建议尺寸为600px*400px</div>
                        </td>
                    </tr>
                </table>
                <div class="user_main_search">
                    <a id="ctlBtn" style="cursor: pointer;">保存</a>
                    <a href="#" id="back" runat="server">重置</a>
                    <a id="preview" style="cursor: pointer;">保存并预览</a>
                    <a id="savedraft" style="cursor: pointer;">保存草稿箱</a>
                </div>
            </div>
        </div>
    </form>
    <!--弹出层-->
    <div class="pop_bg" style="display: none;"></div>
    <div class="tan_cong" style="display: none;" id="MyTb">
        <div class="tan_top_bj">
            <span class="tan_top_title">添加外部视频</span>
            <span class="tan_top_fast"><a href="javascript:closeVideotan();">X</a></span>
        </div>
        <div class="tan_pas">
            <div class="tan_password">
                <span>高(px)：</span>
                <input type="text" class="videoHeight" value="200" />
                <em id="emwidth"></em>
            </div>
            <div class="tan_password">
                <span>宽(px)：</span>
                <input type="text" class="videoWidth" value="200" />
                <em></em>
            </div>
            <div class="tan_password">
                <span>外部地址：</span>
                <textarea class="MyvideoThirdPath" /></textarea>
               <%-- <iframe height=498 width=510 src='http://player.youku.com/embed/XMTMwNjQ5ODQ3Mg==' frameborder=0 allowfullscreen></iframe>--%>
                <em></em>
            </div>
        </div>
        <div class="tan_buttun">
            <a class="btnVideoOk" style="cursor: pointer">确定</a>
        </div>
    </div>

</body>

</html>
