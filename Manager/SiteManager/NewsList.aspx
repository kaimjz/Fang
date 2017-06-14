<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="NewsList.aspx.cs" Inherits="PD.Manager.SiteManager.NewsList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="../Theme/css/smart.css" rel="stylesheet" />
    <link href="../Theme/js/easyPager/EasyPager.css" rel="stylesheet" />
    <script src="../Theme/js/jquery-1.8.3.min.js"></script>
    <script src="../Theme/js/easyPager/EasyPager.js"></script>
    <script src="../Theme/js/xml-framework.js"></script>
    <script src="../Theme/js/ShowPager.js"></script>
    <script src="js/NewsManager.js"></script>
    <script src="../Theme/js/imgUpload.js"></script>
    <script src="../Theme/js/ajaxfileupload.js"></script>
    <script type="text/javascript" src="../Theme/js/jquery.cookie.js"></script>
    <script src="../Theme/js/roleoperate.js"></script>
    <title></title>
    <style>
        #preview {
            width: 250px;
            height: 100px;
            border: 1px solid #000;
            overflow: hidden;
            margin-top: 31px;
            margin-bottom: 10px;
            margin-bottom: 20px;
            margin-left: 76px;
        }

        #imghead {
            filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=image);
        }
    </style>
    <script type="text/javascript">
        var pageindex = 1;
        var recordCount = 1;
        $(function () {
            Search();
        })
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <input type="hidden" id="topid" />
        <input type="hidden" id="topstatus" />
        <div class="mian">
            <div class="mian_top">您当前的位置：网站管理</div>
            <div class="mian_title">新闻列表</div>
            <div class="user_log_selct">
                <i>标题：</i><input type="text" class="user_log_selct_input" id="sname" />
                <i>状态：</i>
                <select id="status">
                    <option value="">全部</option>
                    <option value="0">未发布</option>
                    <option value="1">已发布</option>
                    <option value="2">草稿箱</option>
                </select>
                <a href="javascript:Search()">搜索</a>
            </div>
            <div class="ri_box_mid">
                <div class="NOdate" style="display: none;">无数据</div>
                <table id="content">
                </table>
                <div class="tab_ft">
                    <div class="tab_ft_le" id="oprselection" style="display: none">
                        <div class="tab_ft_le_lt" id="divbottom">
                            <span>
                                <input type="checkbox" name="all" value="复选框" id="selectAll" onclick="selectAlls();" />
                            </span>
                            <span>
                                <label for="selectAll" style="cursor: pointer">全选 / 全不选</label>
                            </span>
                            <span><a href="javascript:Delete('')">批量删除</a></span>
                            <span><a href="javascript:void(0);" onclick="ExportExcel('now')">导出当前页</a></span>
                            <span><a href="javascript:void(0);" onclick="ExportExcel('all')">导出全部列表</a></span>
                        </div>
                    </div>
                    <div class="tab_ft_ri" id="pagefoot"></div>
                </div>
            </div>
        </div>
        <!--弹出层样式-->
        <div class="pop_bg" style="display: none;"></div>
        <div class="headlines" style="display: none;">
            <div class="head_top_bj">
                <span class="head_top_title">设置头条</span>
                <span class="head_top_fast"><a href="javascript:closetan();">X</a></span>
            </div>
            <div class="head_Prompt">
                <div class="head_Prompt_min">

                    <span><em style="color: #ff0000; margin-right: 5px;">*</em>头条图片：</span>
                    <input type="file" id="file1" accept="image/gif,image/jpeg,image/jpg,image/png,image/swf" onchange="previewImage(this,250,100,'preview','imghead','divhead')" style="width: 245px;" runat="server" />
                    <%--<span>（图片小于500k）</span>--%>
                    <div id="preview" style="display: none">
                        <img src="" id="imghead" style="width:250px; height:100px;" />
                    </div>
                    <h3 style="position: absolute; color: #000;">建议尺寸为1185X350</h3>
                </div>
                <div class="head_Prompt_min">
                    <span><em style="color: #ff0000; margin-right: 5px;">*</em>头条描述：</span>
                    <textarea id="content1"></textarea>
                    <h3 style="position: absolute; color: #f00;"></h3>
                </div>
            </div>
            <div class="head_buttun">
                <a href="javascript:Upload();">确定</a>
            </div>
        </div>
    </form>
</body>
</html>
