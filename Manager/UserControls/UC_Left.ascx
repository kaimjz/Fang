<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UC_Left.ascx.cs" Inherits="Manager.UserControls.UC_Left" %>
<script src="../Theme/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/Theme/js/select.js"></script>
<script src="../Theme/js/xml-framework.js"></script>

<script>
    $(function () {
        GetAccordionMenu();//手风琴菜单
        $("ul:first").show();//展开第一个菜单
        OpenOperating();//绑定菜单打开事件
        writeDateInfo();//显示当前时间
        //add by zfj  每次页面加载完成计算一下左侧菜单高度
        $("#manage").load(function () {
            SetMenuHeight();
        });
    });
    //页面跳转 增加id参数 add by fzz 16-03-02
    function LinkPage(url, pid,id) {
      


        //add by zfj  2015-8-21
        //极限阅读由于是外部地址无法设置高度，故设置死
        if (url =="http://jxyd.huaqinghd.com/admin/getmodule.php")
        {
            window.open(url);
            return;
            //$("#manage").attr("height", "1600px");
            //$(window.parent.document).find(".index-right").css("height", "1600px");
            //$(window.parent.document).find(".index-center").css("height", "1600px");
        }
        else if (url == "http://jxyd.huaqinghd.com/admin/up_pdf.php") {
            //$("#manage").attr("height", "1000px");
            //$(window.parent.document).find(".index-right").css("height", "1000px");
            //$(window.parent.document).find(".index-center").css("height", "1000px");
            window.open(url);
            return;
        }
        $("#manage").attr("src", url);
        //当前节点的id
        $("#menuid").val(id);
    }
    
</script>
<div class="index-left-top">系统管理导航</div>
<div class="book_le_list-nav2">
</div>

