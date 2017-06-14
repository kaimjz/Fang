$(function () {
    SetpageHeight();
});

//调整iframe高度
//创建人：王斌
//时间：2015年6月18日 09:49:16
function SetpageHeight() {
    var content = $(window.parent.document).find(".index-right");//内容div
    //var ifrMenu = top.document.getElementById("ifrMenu");//菜单iframe
    var ifrContent = parent.document.getElementById("manage");//内容iframe
    //var ifrdiv = $(window.parent.document).find(".index-center");
    //var thisheight = $(document.body)[0].scrollHeight;
    var thisheight = $(document.body).height();

    try {
        if (thisheight < 830) {
            thisheight = 830;
        }
        else {
            thisheight += 10;//因为后台样式的不合规则，所以多加10个高度
        }
        content.css("height", thisheight);
        //ifrMenu.height = thisheight;
        ifrContent.height = thisheight;
        //$(top.document.frames["ifrMenu"].document.getElementsByClassName("menu_menu")).css("height", thisheight - 117);
        //ifrdiv.css("height", thisheight);


        //根据左右高度，重新计算页面高度 add by zfj 
        var trueLeftDivHeight = parent.document.getElementById("menuleft").scrollHeight;
        var manageHeight = parent.document.getElementById("manage").scrollHeight;
        if (manageHeight > trueLeftDivHeight) {
            trueLeftDivHeight = manageHeight;
        }
        if (trueLeftDivHeight > 830) {
            parent.$(".index-center").css("height", (trueLeftDivHeight + 10) + "px");
        } else {
            parent.$(".index-center").css("height", "830px");
        }
        //根据左右高度，重新计算页面高度------end 


    } catch (e) {
        //alert("error:" + e);
    }
}
/********
接收地址栏参数
**********/
function GetQuery(key) {
    var search = location.search.slice(1); //得到get方式提交的查询字符串
    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split("=");
        if (ar[0] == key) {
            if (unescape(ar[1]) == 'undefined') {
                return "";
            } else {
                return unescape(ar[1]);
            }
        }
    }
    return "";
}
/* 请求Ajax 带返回值
--------------------------------------------------*/
function getAjax(url, parm, callBack) {
    $.ajax({
        type: 'post',
        dataType: "text",
        url: url,
        data: parm,
        cache: false,
        async: false,
        success: function (msg) {
            callBack(msg);
        }
    });
}

/* 请求Ajax 带返回值
--------------------------------------------------*/
function getJsonAjax(url, parm, callBack) {
    $.ajax({
        type: 'post',
        dataType: "json",
        url: url,
        data: parm,
        cache: false,
        async: false,
        success: function (msg) {
            callBack(msg);
        }
    });
}

$(".btn_ok").focus();

//弹出提示框
//title是弹窗标题，content是弹窗内容，func是回调函数，parmeters是回调函数的参数
function ShowMsg(title, content, func, parmeters) {
    $("body").animate({ scrollTop: 0 }, 500);//1000是ms,也可以用slow代替
    var msghtml = "   <div class='pop_bg'></div> <div class='tan_cong2'>" +
                     "<div class='tan_top_bj'>" +
                     	"<span class='tan_top_title'>" + title + "</span>" +
               		    "<span class='tan_top_fast'><a href='#' class='btn_cel'>X</a></span>" +
                     "</div>" +
                     "<div class='tan_Prompt2'>" +
                      "<div class='tan_Prompt_min'><span>" + content + "</span></div>" +
                     "</div>" +
                     "<div class='tan_buttun2'>" +
                     "<a href='#' class='btn_ok'>确定</a>" +
                     "</div></div>";
    $("body").append(msghtml);

    var bro = ScollPostion2();
    if (bro.top != 0) {
        $(".tan_cong2").css("top", (parseInt($(".tan_cong2").css("top").replace("px", '')) + parseInt((bro.height- bro.top), 10))/2-100);
        $(window.parent.document).scroll(function () {
            var bro = ScollPostion2();
            var cssheight = (bro.top) + "px";
            $(".tan_cong2").css("top", cssheight);
        })
    }

    $(".btn_ok").focus();
    $(".btn_ok,.btn_cel").click(function myfunction() {
        //关闭弹出层
        $(".tan_cong2").remove();
        $(".pop_bg").remove();
        if (func != null) {
            if (parmeters != null) {
                func(parmeters);
            }
            else {
                func();
            }
        }
    });
}

//title是弹窗标题，content是弹窗内容，func是回调函数，parmeters是回调函数的参数
//以后需要把高度调整成参数  zyk
function ShowNewMsg(title, content, func, parmeters) {
    $("body").animate({ scrollTop: 0 }, 500);//1000是ms,也可以用slow代替
    var msghtml = "   <div class='pop_bg'></div> <div class='tan_cong2' style='width:350px;'>" +
                     "<div class='tan_top_bj'>" +
                     	"<span class='tan_top_title'>" + title + "</span>" +
               		    "<span class='tan_top_fast'><a href='#' class='btn_cel'>X</a></span>" +
                     "</div>" +
                     "<div class='tan_Prompt2' style='margin-bottom:20px;width:310px; overflow:auto;min-height:200px'>" +
                      "<div class='tan_Prompt_min'>" + content + "</div>" +
                     "</div>" +
                     "<div class='tan_buttun2'>" +
                     "<a href='#' class='btn_ok'>确定</a>" +
                     "</div></div>";
    $("body").append(msghtml);
    $(".btn_ok").focus();
    $(".btn_ok,.btn_cel").click(function myfunction() {
        if (func != null) {
            if (parmeters != null) {
                func(parmeters);
            }
            else {
                func();
            }
        }
        //关闭弹出层
        $(".tan_cong2").remove();
        $(".pop_bg").remove();
    });
}



//弹出等待框
function ShowWaiting(title, content) {
    $("body").animate({ scrollTop: 0 }, 500);//1000是ms,也可以用slow代替


    var msghtml = "<div class='pop_bg'></div><div class='tan_cong2'>" +
            "<div class='tan_top_bj'>" +
                "<span class='tan_top_title'>" + title + "</span>" +
            "</div>" +
            "<div class='tan_Prompt2'>" +
                "<div class='tan_Prompt_min tan_Prompt_amintiz'>" +
                	"<div>" + content + "</div>" +
                	"<div><img src='/Theme/images/012.gif' width='190' height='14' /></div>" +
                "</div>" +
            "</div>" +
        "</div>"

    $("body").append(msghtml);
}
//关闭等待框
function CloseWaiting() {
    $(".tan_cong2").remove();
    $(".pop_bg").remove();
}

//弹出确定取消提示框
//title是弹窗标题，content是弹窗内容，func是回调函数，parmeters是回调函数的参数
function ShowConfirm(title, content, func, parmeters) {
    $("body").animate({ scrollTop: 0 }, 500);//1000是ms,也可以用slow代替

    var confirmhtml = "<div class='pop_bg'></div> <div class='tan_cong2'>" +
                     "<div class='tan_top_bj'>" +
                     	"<span class='tan_top_title'>" + title + "</span>" +
               		    "<span class='tan_top_fast'><a href='#' class='btn_cel'>X</a></span>" +
                     "</div>" +
                     "<div class='tan_Prompt2'>" +
                      "<div class='tan_Prompt_min'><span>" + content + "</span></div>" +
                     "</div>" +
                     "<div class='tan_buttun2'>" +
                     "<a href='#' class='btn_ok'>确定</a>" +
                     "<a href='#' class='btn_cel'>取消</a>" +
                     "</div></div>";

    //var confirmhtml = "<div class='pop_bg'><div class='shade_sml'><div class='shade_top'><div class='shade_top_le'>" + title + "</div><div class='shade_top_ri'><a href='#' class='btn_cel'>X</a></div></div><p>" + content + "</p><div class='shade_buttun'><a href='#' class='btn_ok'>确定</a><a href='#' class='btn_cel'>取消</a></div></div></div>";
    $("body").append(confirmhtml);

    $(window).scroll(function () {
        var bro = ScollPostion();
        var cssheight = (bro.top * 1 + 230 * 1) + "px";
        $(".tan_cong2").css("top", cssheight);
    });
    $(".btn_ok").focus();
    $(".btn_ok").click(function () {
        $(".tan_cong2").remove();
        $(".pop_bg").remove();
        if (func != null) {
            if (parmeters != null) {
                func(parmeters);
            }
            else {
                func();
            }
        }

    })
    $(".btn_cel").click(function () {
        $(".tan_cong2").remove();
        $(".pop_bg").remove();
    })
}

//弹出驳回信息框
//title是弹窗标题，content是弹窗内容，func是回调函数，parmeters是回调函数的参数
function ShowReject(title, content, func, parmeters, id, email) {
    $("body").animate({ scrollTop: 0 }, 500);//1000是ms,也可以用slow代替

    var confirmhtml = "<div class='pop_bg'></div><div class='Popups'>"
    + " <div class='tan_top_bj'>"
    + " 	<span class='tan_top_title'>驳回信息</span>"
    + "   <span class='tan_top_fast'><a  href='#' class='btn_cel'>X</a></span>"
    + "</div>"
    + "<div class='Popups_txt'>"
    + "<div class='Popups_txttit'>"
    + "<span> 驳回原因:"
    + "<span>"
    + "<select id='selectinfo'>"
    + content
    + "</select>"
    + "</span>"
    + "</span>"
    + "</div>"
    + "   <textarea id='resontext'></textarea>"
    + "</div>"
    + "<div class='Popups_btn'>"
    + "   <a href='#' class='btn_ok'>确定</a>"
    + "    <a href='#'  class='btn_cel'>取消</a>"
    + "</div>"
    + "</div>";

    $(".mian").append(confirmhtml);

    $(window).scroll(function () {
        var bro = ScollPostion();
        var cssheight = (bro.top * 1 + 230 * 1) + "px";
        $(".Popups").css("top", cssheight);
    });
    $(".btn_ok").focus();


    $(".btn_ok").click(function () {
        $(".pop_bg").hide();
        if (func != null && id != null) {
            if (parmeters != null) {
                func(parmeters, id, email);
            }
            else {
                func();
            }
        }
        $(".Popups").remove();
        //$(".pop_bg").remove();

    })
    $(".btn_cel").click(function () {
        $(".Popups").remove();
        $(".pop_bg").remove();
    })
}

//滚动条位置
function ScollPostion() {
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return { top: t, left: l, width: w, height: h };
}

//滚动条位置
function ScollPostion2() {
    var t, l, w, h;
    if (window.parent.document.documentElement && window.parent.document.documentElement.scrollTop) {
        t = window.parent.document.documentElement.scrollTop;
        l = window.parent.document.documentElement.scrollLeft;
        w = window.parent.document.documentElement.scrollWidth;
        h = window.parent.document.documentElement.scrollHeight;
    } else if (document.body) {
        t = window.parent.document.body.scrollTop;
        l = window.parent.document.body.scrollLeft;
        w = window.parent.document.body.scrollWidth;
        h = window.parent.document.body.scrollHeight;
    }
    return { top: t, left: l, width: w, height: h };
}

//当前日期
function writeDateInfo() {
    var now = new Date();
    var year = now.getFullYear(); //getFullYear getYear
    var month = now.getMonth();
    var date = now.getDate();
    var day = now.getDay();
    var hour = now.getHours();
    var minu = now.getMinutes();
    var sec = now.getSeconds();
    var week;
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    week = arr_week[day];
    var time = "";
    time = year + "年" + month + "月" + date + "日 " + week;

    $("#datetime").text(time);
    var timer = setTimeout("writeDateInfo()", 1000);
}
//手风琴导航菜单
var AccordionMenuJson = "";
function GetAccordionMenu() {
    $(".book_le_list-nav2").empty();
    var index = 0;
    var html = "";
    getAjax("/Index.aspx", "action=GetUserOperating", function (data) {
        AccordionMenuJson = eval("(" + data + ")");
        $.each(AccordionMenuJson, function (i) {
            if (AccordionMenuJson[i].OptionLevel == 1) {
                if (GetQuery('pid') + '' == '' && index == 0) {
                    html += "<div id='" + AccordionMenuJson[i].ID + "' class='book_le_list book_le_item_active'><div class='book_le_item'><div class='book_le_h2'><a href='#'>" + AccordionMenuJson[i].Name + "</a></div>";
                } else {
                    if (GetQuery('pid') == AccordionMenuJson[i].ID) {
                        html += "<div id='" + AccordionMenuJson[i].ID + "' class='book_le_list book_le_item_active'><div class='book_le_item'><div class='book_le_h2'><a href='#'>" + AccordionMenuJson[i].Name + "</a></div>";
                    } else {
                        html += "<div id='" + AccordionMenuJson[i].ID + "' class='book_le_list'><div class='book_le_item'><div class='book_le_h2'><a href='#'>" + AccordionMenuJson[i].Name + "</a></div>";
                    }
                }

                html += GetSubmenu(AccordionMenuJson[i].ID);
                html += "</div></div>";
                index++;
            }
        });
    })
    $(".book_le_list-nav2").append(html);
}
//子菜单
function GetSubmenu(MenuId) {

    var html = "";
    html += "<ul><li><div class='book_three'>";
    $.each(AccordionMenuJson, function (i) {
        if (AccordionMenuJson[i].ParentId == MenuId) {
            //增加id参数 add by fzz 16-03-02
            html += "<div class='book_le_point-add'><a href=\"javascript:LinkPage('" + AccordionMenuJson[i].Url + "','" + MenuId + "','" + AccordionMenuJson[i].ID + "')\">" + AccordionMenuJson[i].Name + "</a></div>";
        } 0
    });
    html += "</div></li></ul>";
    return html;
}

//左侧手风琴效果
function OpenOperating() {
    $(".book_le_h2 a").click(function () {
        $(".book_le_h2 a").css("background", "url(/Theme/images/menu_jia.png) 0 top no-repeat");
        //获取同级下ul的display
        var thisUl = $(this).parents().children("ul").css("display");
        //alert(thisUl);
        if (thisUl == "none") {
            $(".book_le_item").children("ul").slideUp();
            $(this).parents().children("ul").slideDown(SetMenuHeight);
            $(this).css("background", "url(/Theme/images/menu_jian.png) 0 top no-repeat");
            $(this).children("a").addClass("aaa");

        } else {
            $(this).parents().children("ul").slideUp(SetMenuHeight);
            $(".book_le_item").children("ul").slideUp();
            $(this).css("background", "url(/Theme/images/menu_jia.png) 0 top no-repeat");
            $(this).children("a").removeClass();
        }


    });
}

//重新设置一下左侧导航栏高度
function SetMenuHeight() {

    var trueLeftDivHeight = document.getElementById("menuleft").scrollHeight;
    var manageHeight = document.getElementById("manage").scrollHeight;
    if (manageHeight > trueLeftDivHeight) {
        trueLeftDivHeight = manageHeight;
    }
    if (trueLeftDivHeight > 830) {
        $(".index-center").css("height", (trueLeftDivHeight + 10) + "px");
    } else {

        $(".index-center").css("height", "830px");
    }


    //var trueRightDivHeight = document.getElementById("indexRight").scrollHeight;
    //if (trueRightDivHeight > 830) {
    //    $(".index-right").css("height", (trueRightDivHeight + 10) + "px");
    //    $("#manage").css("height", (trueRightDivHeight + 10) + "px");

    //} else {

    //    $(".index-right").css("height", "830px");
    //    $("#manage").css("height", "830px");
    //}
    // 830
    //edit by zfj 当左侧菜单高度超过默认高度时重新计算高度
    // alert(document.getElementById("menuleft").scrollHeight + 'px');

}

//字符串转日期格式，strDate要转为日期格式的字符串
function StrToLongDate(strDate) {
    if (strDate == null || strDate == "") {
        return "";
    }
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
    function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    return date.pattern('yyyy-MM-dd');
}

//字符串转日期格式,通用方法，strDate要转为日期格式的字符串
//strDate时间字符串，format时间格式
//格式例如：yyyy年MM月dd日 HH时mm分ss秒
function StrToDateTime(strDate, format) {
    if (strDate == null || strDate == "") {
        return "";
    }
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
    function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    return date.pattern(format);
}

/**     
 * 对Date的扩展，将 Date 转化为指定格式的String     
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符     
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)     
 * eg:     
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423     
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04     
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04     
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04     
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18     
使用：(eval(value.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"))).pattern("yyyy-M-d h:m:s.S");
 */
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份        
        "d+": this.getDate(), //日        
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时        
        "H+": this.getHours(), //小时        
        "m+": this.getMinutes(), //分        
        "s+": this.getSeconds(), //秒        
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度        
        "S": this.getMilliseconds() //毫秒        
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/*绑定下拉框
ControlId:控件ID
Memo:默认显示
*/
function JsonBindDrop(ControlId, Memo, DataJson) {
    $(ControlId).html("");
    if (IsNullOrEmpty(Memo)) {
        $(ControlId).append("<option value=''>" + Memo + "</option>");
    }
    var DataJson = eval("(" + DataJson + ")");
    $.each(DataJson, function (i) {
        $(ControlId).append($("<option></option>").val(DataJson[i].Code).html(DataJson[i].FullName));
    });
}


/*跳转页面*/
function Urlhref(url) {
    window.location.href = url;
}
//页面刷新
function Refresh() {
    window.location.reload(true);
}
//页面刷新
function Goback() {
    window.history.go(-1);
}
//重置所有表单
function Reset() {
    document.getElementById("form1").reset();
    $("input[type='checkbox']").removeAttr('checked');
    $("i").html("").hide();
}

//截取制定长度字符串
//姓名：王斌
//时间：2015年3月17日 16:15:17
function suolve(str, len) {
    if (!str) {
        return "";
    }
    var sub_length = len;
    var temp1 = str.replace(/[^\x00-\xff]/g, "**");//精髓   
    var temp2 = temp1.substring(0, sub_length);
    //找出有多少个*   
    var x_length = temp2.split("\*").length - 1;
    var hanzi_num = x_length / 2;
    sub_length = sub_length - hanzi_num;//实际需要sub的长度是总长度-汉字长度   
    var res = str.substring(0, sub_length);
    if (sub_length < str.length) {
        var end = res + "…";
    } else {
        var end = res;
    }
    return end;
}

//URL参数获取
//zyk 2016-3-17
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}