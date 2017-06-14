<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AdvEdit.aspx.cs" Inherits="Manager.SiteManager.AdvEdit" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="../Theme/css/smart.css" rel="stylesheet" />
    <script type="text/javascript" src="../Theme/js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="../Theme/js/ajaxfileupload.js"></script>
    <script type="text/javascript" src="../Theme/js/imgUpload.js"></script>
    <script type="text/javascript" src="../Theme/js/xml-framework.js"></script>
    <script type="text/javascript" src="../Theme/js/xml-validator.js"></script>
    <script type="text/javascript" src="js/AdvManager.js"></script>
    <script type="text/javascript" src="../Theme/js/jquery.cookie.js"></script>
    <title></title>
    <style type="text/css">
        #preview {
            width: 150px;
            height: 150px;
            border: 1px solid #000;
            overflow: hidden;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        #imghead {
            filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);
        }
    </style>
    <script type="text/javascript">
        $(function () {
            SetpageHeight();
            if ($("#pic").val() != "") {
                $("#preview").show();
                $("#imghead").attr("src", $("#pic").val());
            }

            var inf = $("#hid_isnofollow").val();
            if (inf=="0") {
                $("input[name='isnofollow']").eq(0).prop("checked", true).siblings().prop("checked",false);
            }
            else {
                $("input[name='isnofollow']").eq(1).prop("checked", true).siblings().prop("checked", false);
            }
        });
    </script>
</head>
<body>
    <form id="form1" runat="server" enctype="multipart/form-data">
        <input type="hidden" value="" id="advid" runat="server" />
        <input type="hidden" value="" id="pic" runat="server" />
        <input type="hidden" value="" id="pictype" runat="server" />
        <input type="hidden" value="0" id="hid_isnofollow" runat="server" />
        <div class="mian">
            <div class="mian_top" id="advcation" runat="server">您当前的位置：网站管理</div>
            <div class="mian_title" id="htmltitile" runat="server">编辑广告</div>
            <div>
                <div class="user_main">
                    <div><em>*</em>广告位置：</div>
                    <input type="text" id="name" runat="server" disabled="disabled" />
                    <i></i>
                </div>
                <div class="user_main">
                    <div><em>*</em>图片跳转链接：</div>
                    <input type="text" id="pic_url" runat="server" />
                    <i></i>
                </div>
                <div class="user_main">
                    <div><em></em>alt标签：</div>
                    <input type="text" id="altname" runat="server" />
                    <i></i>
                </div>
                <div class="user_main_textarea_ne">
                    <div><em>*</em>是否分流：</div>
                    <input type="radio" name="isnofollow" value="0" />是
                    <input type="radio" name="isnofollow" value="1" checked="checked" />否
                    <i></i>
                </div>
                <div class="user_main_nw">
                    <div><em>*</em>图片：</div>
                    <input type="file" runat="server" id="uploadfile" accept="image/gif,image/jpeg,image/jpg,image/png,image/swf" onchange="previewImage(this,150,150,'preview','imghead','divhead')" />
                    <span id="sp" runat="server"></span>
                    <div id="preview" style="display: none">
                        <img src="#" id="imghead" style="width: 150px; height: 150px;" />
                    </div>
                </div>
                <div class="user_main_search">
                    <a href="javascript:Save()">确定</a>
                    <a href="javascript:Back();" id="back" runat="server">返回</a>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
