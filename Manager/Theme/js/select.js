// JavaScript Document
$(document).ready(function () {
    $(".search_con>select").each(function () {
        var name = $(this).attr("name");
        var size = $(this).size();

        var selText = $(this).getSelectedText();
        var selVal = $(this).getSelectedValue();
        $(this).parent().append("<div class=\"input_sele\">" + selText + "</div>");
        $(this).parent().append("<input name=\"" + name + "\" value=\"" + selVal + "\" type=\"hidden\">");
        $(this).parent().append("<div class=\"sele_list\" style=\"display:none;\">");
        for (var i = 0; i < size; i++) {
            $(this).parent().find("div[class='sele_list']").append("<a href=\"javascript:void(0)\" val=\"" + $(this).getValue(i) + "\">" + $(this).getText(i) + "</a>");

        }
        $(this).remove();
    });

    $("div[class='input_sele']").click(function () {
        $(".search_year_list").hide();
        $(".sele_list").hide();
        $(this).parent().find(".sele_list").show(10, function () {
            $(document).unbind("click");
            $(document).click(function () {
                $(".sele_list").hide();
            });

        });
        $(document).unbind("click");
    });
    $(".sele_list").find("a").each(function () {
        $(this).click(function () {
            $(this).parent().parent().find("input").val($(this).attr("val"));
            $(this).parent().parent().find(".input_sele").html($(this).html());
            $(this).parent().parent().find(".sele_list").hide();
        });
    });


    //表格滑过变色
    $(".table_list table tr").mousemove(function () {
        $(this).css("background", "#e5f4fd");
    });
    $(".table_list table tr").mouseout(function () {
        $(this).css("background", "none");
    });
    //点击输入框添加样式focusa
    $(":input").focus(function () {
        $(this).addClass("focusa");
    }).blur(function () {
        $(this).removeClass("focusa");
    });
    //选择框赋于最上层，主要解决ie6和7下盖不住下面的层
    $(".input_sele").parent(".search_con").css("z-index", "1000");
    var seleLength = $(".input_sele").length;
    for (var i = 0; i < seleLength; i++) {
        $(".input_sele:eq(" + i + ")").parent(".search_con").css("z-index", 1000 - i);
    }
    //左侧分类效果
    $(".book_le_h2 a").click(function () {
		$(".book_le_h2 a").css("background", "url(images/menu_jia.png) 0 top no-repeat");
        //获取同级下ul的display
        var thisUl = $(this).parents().children("ul").css("display");
        //alert(thisUl);
        if (thisUl == "none") {
            $(".book_le_item").children("ul").hide();
            $(this).parents().children("ul").show();
            $(this).css("background", "url(images/menu_jian.png) 0 top no-repeat");
            $(this).children("a").addClass("aaa");

        } else {
            $(this).parents().children("ul").hide();
            $(".book_le_item").children("ul").hide();
            $(this).css("background", "url(images/menu_jia.png) 0 top no-repeat");
            $(this).children("a").removeClass();
        }
    });
	    //图书详情tab切换
    $(".book_detail_tab span").click(function () {
        $(".book_detail_tab span").removeClass("book_detail_tab_cur");
        $(this).addClass("book_detail_tab_cur");
        $(".book_info_item").eq($(".book_detail_tab span").index(this)).show()
				.siblings().hide();
    })
    //图书详情目录简介切换
    $(".booktab:gt(0)").hide();	//除了第一个外，其它的tab_list都隐藏
    $(".bookdeti ul li").click(function () {
        //点击tab标签，当前点击的标签加上样式"tab_title_cur"。
        $(".bookdeti ul li").removeClass("bookli_cur");
        $(this).addClass("bookli_cur");
        //点击tab标签，与其对应的列表显示，其它的隐藏
        $(".booktab").eq($(".bookdeti ul li").index(this))
												.show(500)
												.siblings()
  							  	                .hide(500);
    });
    //阅读实践切换
    $(".readactiv_ber:gt(0)").hide();	//除了第一个外，其它的tab_list都隐藏
    $(".readactiv_book ul li").click(function () {
        //点击tab标签，当前点击的标签加上样式"tab_title_cur"。
        $(".readactiv_book ul li").removeClass("rativ_bokcur");
        $(this).addClass("rativ_bokcur");
        //点击tab标签，与其对应的列表显示，其它的隐藏
        $(".readactiv_ber").eq($(".readactiv_book ul li").index(this))
												.show()
												.siblings()
  							  	                .hide();
    });
    //图书详情书评阅读指导切换
    $(".bookpinma:gt(0)").hide();	//除了第一个外，其它的tab_list都隐藏
    $(".bookdeti1 ul li").click(function () {
        //点击tab标签，当前点击的标签加上样式"tab_title_cur"。
        $(".bookdeti1 ul li").removeClass("bookli1_cur");
        $(this).addClass("bookli1_cur");
        //点击tab标签，与其对应的列表显示，其它的隐藏
        $(".bookpinma").eq($(".bookdeti1 ul li").index(this))
												.show(500)
												.siblings()
												.hide(500);
    });

    //左侧加减列表
    $(".myType").click(function () {
        var thisDivClass = $(this).parents().attr("class");
        if (thisDivClass == "book_le_sub") {
            $(this).parent().removeClass("book_le_sub");
            $(this).parent().addClass("book_le_add");
        } else {
            $(this).parent().removeClass("book_le_add");
            $(this).parent().addClass("book_le_sub");
        }
    });

	///设置页面高度
	// 创建者杨文健
	////创建日期 2015-1-16
	function SetpageHeight() {
		var main = $(window.parent.document).find("#manage");
		var thisheight = $(document.body).outerHeight(true) + 70;
		try {
			if (thisheight < 600) {
				thisheight = 600;
				main.css("height", thisheight + "px");
				var bottom = $(window.parent.document).find("#divbottom");
				bottom.css("margin-top", "20px");
				var divcenter = $(window.parent.document).find("#indexpage");
				divcenter.css("height", thisheight + "px");
			} else {
				main.css("height", thisheight + "px");
				var bottom = $(window.parent.document).find("#divbottom");
				bottom.css("margin-top", "20px");
				var divcenter = $(window.parent.document).find("#indexpage");
				divcenter.css("height", thisheight + "px");
			}
		} catch (e) {
	
		}
	
	}

    //把右侧列表的高度赋值于左侧列表。
    var bookListHeight = $(".type_height ul").css("height");
    $(".book_le_list").css("height", bookListHeight);
    //新类表样式（张斌写）
    /* $(function () {
            $(".book_le_item").click(function () {
                $(this).children("ul").show();
                $(this).siblings().children("ul").hide();
            })
            $(".book_le_item").eq(0).click();
            $(".book_le_sub,.book_three_sub_bj").css("background-image", "url('images/jia.png')");
            $(".book_three_sub,.book_le_point").hide();
            $(".book_le_sub").children("a").toggle(function () {
                $(this).parent().css("background-image", "url('images/jian.png')");
                $(this).siblings(".book_three_sub").show();
            }, function () {
                $(this).parent().css("background-image", "url('images/jia.png')");
                $(this).siblings(".book_three_sub").hide();
            })

            $(".book_three_sub").children("a").toggle(function () {
                $(this).css("background-image", "url('images/jian.png')");
                $(this).siblings(".book_le_point").show();
            }, function () {
                $(this).css("background-image", "url('images/jia.png')");
                $(this).siblings(".book_le_point").hide();
            })
        })*/

    //最近浏览信息特效
    $(".mystore_history").click(function () {
        //获取mystore_history_list的display
        var historyDisplay = $(".mystore_history_list").css("display");
        if (historyDisplay == "block") {
            $(".mystore_history_list").hide();
            $(this).children("div").removeClass("mystore_arrow_down");
            $(this).children("div").addClass("mystore_arrow_up");
        } else {
            $(".mystore_history_list").show();
            $(this).children("div").removeClass("mystore_arrow_up");
            $(this).children("div").addClass("mystore_arrow_down");
        }
    });
    //图书详情tab切换
    $(".book_detail_tab span").click(function () {
        $(".book_detail_tab span").removeClass("book_detail_tab_cur");
        $(this).addClass("book_detail_tab_cur");
        $(".book_info_item").eq($(".book_detail_tab span").index(this)).show()
				.siblings().hide();
    })
    //高级搜索tab切换效果
    $(".full_tab span").click(function () {
        $(".full_tab span").removeClass("full_tab_cur");
        $(this).addClass("full_tab_cur");
        $(".full_content").eq($(".full_tab span").index(this)).show()
						  .siblings().hide();
        $(".full_list ul li").each(function () {
            fullLiWidth = parseInt($(this).css("width"));
            $(this).children(".search_con").css("width", (fullLiWidth - 20) + "px");
            $(this).children(".search_con").children(".sele_list").css("width", (fullLiWidth - 22) + "px");
            $(this).children(".search_con").children(".sele_list").children("a").css("width", (fullLiWidth - 32) + "px");
            $(this).children(".full_input").css("width", (fullLiWidth - 20) + "px");
            $(this).children(".full_input").children("input").css("width", (fullLiWidth - 30) + "px");
        });
    });
    //图表选择框赋于最上层，主要解决ie6和7下盖不住下面的层
    $(".chart_list ul li").children(".book_pic").css("z-index", "100");
    var chartLength = $(".chart_list ul li").length;
    //alert(chartLength);
    for (var i = 0; i < chartLength; i++) {
        $(".book_pic:eq(" + i + ")").css("z-index", 100 - i);
    }
    $(".book_pic img").hover(function () {
        //alert();
        $(this).parents().children(".book_pic_large").show();
    }, function () {
        $(this).parents().children(".book_pic_large").hide();
    });

    //图片选择框赋于最上层，主要解决ie6和7下盖不住下面的层
    $(".year_ohter_list ul li").children(".pub_picture_pic").css("z-index", "100");
    var pictureLength = $(".year_ohter_list ul li").length;
    //alert(chartLength);
    for (var i = 0; i < pictureLength; i++) {
        $(".pub_picture_pic:eq(" + i + ")").css("z-index", 100 - i);
    }
    $(".pub_picture_pic img").hover(function () {
        //alert();
        $(this).parents().children(".pic_large").show();
    }, function () {
        $(this).parents().children(".pic_large").hide();
    });

});



/*标语*/

function show() {
    var dis = document.getElementById("baocuo").style.display;
    dis == "none" ? (document.getElementById("baocuo").style.display = "block") : (document.getElementById("baocuo").style.display = "none");
}

/*标语*/

function showa() {
    var dis = document.getElementById("baocuo2").style.display;
    dis == "none" ? (document.getElementById("baocuo2").style.display = "block") : (document.getElementById("baocuo2").style.display = "none");
}
//弹出层
$(function () {
    $(".tan_cong").hide();
    $(".found-buttun-span").click(function (event) {
        $(".pop_bg").show();
        $(".tan_cong").show();
    });
    $("#cur").click(function () {
        $(".tan_cong").hide();
        $(".pop_bg").hide();
    });
    /*$("*").click(function (event) {
        event.stopPropagation();
    })*/
})
//弹出层//等待上传动画
$(function () {
    $(".tan_dengdai").hide();
    $(".found-buttun-span").click(function (event) {
        $(".pop_bg").show();
        $(".tan_dengdai").show();
    });
    $("#cur").click(function () {
        $(".tan_dengdai").hide();
        $(".pop_bg").hide();
    });
    /*$("*").click(function (event) {
        event.stopPropagation();
    })*/
})
//iframe自适应
$(function () {
    SetpageHeight();
})
//调整iframe高度
//创建人：王斌
//时间：2015年6月18日 09:49:16
function SetpageHeight() {
    var content = $(window.parent.document).find(".index-right");//内容div
    //var ifrMenu = top.document.getElementById("ifrMenu");//菜单iframe
    var ifrContent = parent.document.getElementById("manage");//内容iframe
    var ifrdiv = $(window.parent.document).find(".index-center");
    var thisheight = $(document.body).height();
    try {
        if (thisheight < 830) {
            thisheight = 830;
        }
        content.css("height", thisheight);
        //ifrMenu.height = thisheight;
        ifrContent.height = thisheight;
        //$(top.document.frames["ifrMenu"].document.getElementsByClassName("menu_menu")).css("height", thisheight - 117);
        ifrdiv.css("height", thisheight);
    } catch (e) {
        //alert("error:" + e);
    }
}








