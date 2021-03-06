﻿/*
* 定义函数。  前台
* 
 
*/

var Nature = {};

Nature.Event = {};     //index页面用的事件注册
Nature.Control = {};    // 表单里的子控件，文本框、下拉列表框等
Nature.Debug = {};     //显示debug信息
Nature.Page = {};

Nature.Page.Button = {};    // 操作按钮
Nature.Page.Find = {};      // 查询控件
Nature.Page.Form = {};      // 添加、修改表单
Nature.Page.Grid = {};      // 数据列表

Nature.Page.Tab = {};       // 标签tab
Nature.Page.Tree = {};      // 树状功能菜单
Nature.Page.QuickPager = {}; // 分页控件


// 分页需要的信息
//Nature.Page.QuickPager.PageInfo = function () {
//};

Nature.CommonModule = {}; //共用模块
Nature.CommonModule.ModuleForRole = {};         //角色维护里的模块列表、功能按钮
Nature.CommonModule.ModuleForRoleColumns = {};  //角色维护里的列表字段，表单字段等

Nature.CommonFunction = {};

Nature.CommonFunction = {
    /*判断使用哪个key。全都没打挑，视为都可以使用*/
    GetPermissionKey: function (colAll, colPermission) {
        var key = "";
        if (colPermission != undefined) {
            if (colPermission == "admin")
                key = colAll;
            else {
                if (colPermission.length == 0)
                    key = colAll;
                else
                    key = colPermission;

            }
        }
        else
            key = [];

        return key;

    },

    /*必须打挑的才能用*/
    GetPermissionKey2: function (colAll, colPermission) {
        var key = "";
        if (colPermission != undefined) {
            if (colPermission == "admin")
                key = colAll;
            else {
                key = colPermission;
            }
        }
        else
            key = [];

        return key;

    },

    //动态加载css
    addStyle: function (stylePath) {
        var container = document.getElementsByTagName("head")[0];
        var addStyle = document.createElement("link");
        addStyle.rel = "stylesheet";
        addStyle.type = "text/css";
        addStyle.media = "screen";
        addStyle.href = stylePath;
        container.appendChild(addStyle);
    }
};


/*
* QuickPager分页控件的js处理
* 加载模板、设置模板、读取数据、绑定事件

*  

*/
Nature.Page.QuickPagerDefaultInfo = {
    recordCount: -1,        //总记录数
    pageSize: 10,           //一页记录数
    pageCount: -1,          //总页数，不用设置，根据上两个条件自动计算
    thisPageIndex: 1,       //当前页号
    beforePageIndex: 1,     //上一次的页号
    //lastPageIndex: 0,     //最后一页的页号，自动计算

    naviCount: 5,            //页号导航的数量
    isUseRecordCount: true,   //是否使用缓存的总记录数

    pageTurnDivIDs: "",           //放置分页控件的div的id，可以是多个，用半角逗号分隔

    //分页控件模板的路径和文件名
    templetPath: "/Theme/WebEasyPager/template.htm",
    //分页控件css文件的路径和文件名
    cssPath: "/Theme/WebEasyPager/EasyPager.css",

    OnPageChange: function () { },  //翻页的事件
    NaviCreate: function () { },    //创建页号导航
    SetPageUI: function () { },    //设置分页UI
    RegPagerEvent: function () { },    //注册分页UI的事件，不包括页号导航的事件
    LoadData: function () { },      //加载数据的事件
    BindTable: function () { }    //绑定表格的事件

};

Nature.Page.QuickPagerExtend = {
    CreateNavi: function (pageInfo) {


        //页号导航
        //修改 上一页 下一页属性
        $("#S_Prev").attr("id", pageInfo.S_PrevID);
        $("#S_Next").attr("id", pageInfo.S_NextID);

        var n1 = "<a class=\"navi\">{text}</a>"; // $("#P_b1");

        var tmpdiv = pageInfo.pageTurnDivIDs.split(",");
        var navi = $("#" + tmpdiv[0] + " .S_navi"); navi.empty(); // add by zfj 
        //var navi = $("#S_navi"); navi.empty();

        var i; var temp = ""; var s1; var s2;

        var naviCount2 = (pageInfo.naviCount % 2) == 1 ? pageInfo.naviCount / 2 | 0 : pageInfo.naviCount / 2;

        if ((pageInfo.thisPageIndex - naviCount2) < 1) {
            s1 = 1; s2 = pageInfo.naviCount;
        } else if ((pageInfo.thisPageIndex + naviCount2) >= pageInfo.pageCount) {
            s1 = pageInfo.pageCount - pageInfo.naviCount + 1;
            s2 = pageInfo.pageCount;
            if (s1 < 1) s1 = 1;
        } else {
            s1 = pageInfo.thisPageIndex - naviCount2;
            s2 = pageInfo.thisPageIndex + naviCount2;
            if (s2 > pageInfo.pageCount) s2 = pageInfo.pageCount;
        }
        if (s2 > pageInfo.pageCount) s2 = pageInfo.pageCount;

        if (s1 >= 2) {
            temp = n1.replace("{text}", 1);
            navi.append(temp);
        }
        if (s1 >= 3) {
            temp = n1.replace("{text}", "…");
            navi.append(temp);
        }

        if (s2 - s1 > 8) {
            for (i = s1; i <= s1 + 8; i++) { //当前页
                if (i == pageInfo.thisPageIndex) {
                    var nnow = "<a class=\"navi\" style=\"background-color: #fc5859;\">{text}</a>";
                    temp = nnow.replace("{text}", "<font style=\"color:#FFFFFF\">" + i + "</font>");
                } else {
                    temp = n1.replace("{text}", i);
                }
                navi.append(temp);
            }
        }
        else {
            for (i = s1; i <= s2; i++) { //当前页
                if (i == pageInfo.thisPageIndex) {
                    var nnow = "<a class=\"navi\" style=\"background-color: #fc5859;\">{text}</a>";
                    temp = nnow.replace("{text}", "<font style=\"color:#FFFFFF\">" + i + "</font>");
                } else {
                    temp = n1.replace("{text}", i);
                }
                navi.append(temp);
            }
        }


        if (s2 <= pageInfo.pageCount - 2) {
            temp = n1.replace("{text}", "…");
            navi.append(temp);
        }
        if (s2 <= pageInfo.pageCount - 1) {
            temp = n1.replace("{text}", pageInfo.pageCount);
            navi.append(temp);
        }



        //注册事件
        var tmpdiv = pageInfo.pageTurnDivIDs.split(",");
        var naviA = $("#" + tmpdiv[0] + " a");
        naviA.unbind();
        naviA.each(function (j) {

            $(this).click(function () {
                pageInfo.beforePageIndex = pageInfo.thisPageIndex;
                if (this.innerHTML == "…") {
                    var a1 = naviA[j - 1];
                    if (a1.innerHTML == "1") {
                        //前面的，取后面的作为页号
                        a1 = naviA[j + 1];
                        pageInfo.thisPageIndex = $(a1).text() * 1 - 1;
                    } else {
                        //后面的，取前面的作为页号
                        a1 = naviA[j - 1];
                        pageInfo.thisPageIndex = $(a1).text() * 1 + 1;
                    }

                } else {
                    pageInfo.thisPageIndex = $(this).text();
                }

                if (pageInfo.OnPageChange != undefined)
                    pageInfo.OnPageChange(pageInfo.beforePageIndex, pageInfo.thisPageIndex);


                pageInfo.NaviCreate(pageInfo); //重新设置页号导航

                //克隆
                var tmpdiv = pageInfo.pageTurnDivIDs.split(",");
                var pageHtml = $("#" + tmpdiv[0]).clone(true);
                for (var aa = 1; aa < tmpdiv.length; aa++) {
                    $("#" + tmpdiv[aa]).html(pageHtml);
                }
                pageInfo.SetPageUI(pageInfo); //重新设置UI
            });
        });

    },

    //设置UI
    SetPageUI: function (info) {
        if (info.pageCount == -1) {
            //计算总页数
            info.pageCount = info.recordCount % info.pageSize === 0 ? info.recordCount / info.pageSize : parseInt(info.recordCount / info.pageSize) + 1;
        }
        //alert(info.thisPageIndex);

        $("#P_RecordCount").html(info.recordCount);
        $("#P_Index").html(info.thisPageIndex);
        $("#P_PageCount").html(info.pageCount);
        $("#P_PageSize").html(info.pageSize);

        $('#Txt_GO').val(info.thisPageIndex);
        var tmpdiv = info.pageTurnDivIDs.split(",");

        //$("#" + tmpdiv[0] + " span").css("cursor", "pointer");
        try {
            $("#" + tmpdiv[0] + " span").css("cursor", "pointer");
        } catch (e) {

        }


        switch (info.thisPageIndex) {
            case 1:
                //第一页
                $("#S_First,#S_Prev").removeClass("abled");
                $("#S_First,#S_Prev").addClass("disabled").css("cursor", "default");
                $("#S_Next,#S_Last").removeClass("disabled");
                $("#S_Next,#S_Last").addClass("abled").css("cursor", "pointer");
                break;
            case info.pageCount:
                //最后一页
                $("#S_First,#S_Prev").removeClass("disabled");
                $("#S_First,#S_Prev").addClass("abled").css("cursor", "pointer");
                $("#S_Next,#S_Last").removeClass("abled");
                $("#S_Next,#S_Last").addClass("disabled").css("cursor", "default");
                break;
            default:
                //不是第一页、最后一页
                $("#S_First,#S_Prev,#S_Next,#S_Last").addClass("abled").css("cursor", "pointer");
                break;
        }
    },
    //注册翻页的事件，不包括页号导航
    RegPagerEvent: function (info) {
        $("#S_First").click(function () {
            if (info.thisPageIndex != 1) {
                //alert("内部事件：单击了第一页");

                addEvent("a");
            }
        });

        //$("#S_Prev").click(function () {
        //    if (info.thisPageIndex != 1) {
        //        //alert("内部事件：单击了上一页");
        //        addEvent("-");
        //    }
        //});

        //$("#S_Next").click(function () {
        //    if (info.thisPageIndex != info.pageCount) {
        //        //alert("内部事件：单击了下一页");
        //        addEvent("+");
        //    }
        //});
        $("#" + info.S_PrevID).css("color", "black");
        $("#" + info.S_NextID).css("color", "black");
        $("#" + info.S_PrevID).click(function () {
            if (info.thisPageIndex != 1) {
                //alert("内部事件：单击了上一页");
                addEvent("-");
            }
        });

        $("#" + info.S_NextID).click(function () {

            if (info.thisPageIndex != info.pageCount) {
                //alert("内部事件：单击了下一页");
                addEvent("+");
            }
        });

        $("#S_Last").click(function () {
            if (info.thisPageIndex != info.pageCount) {
                //alert("内部事件：单击了末页");
                addEvent("z");
            }
        });
        $("#P_GO").click(function () {
            //alert("内部事件：单击了GO");

            addEvent("go");
        });
        $("#Txt_GO").change(function () {

            var no = $(this).val();
            var reg = /^(-|\+)?\d+$/;
            if (reg.test(no)) {
                $(".cssTxt").val(no);
            } else {
                ShowMsg("提示", "输入的页号不正确！", null, null);
                $(".cssTxt").val(info.thisPageIndex);
            }
        });

        var addEvent = function (kind) {
            info.beforePageIndex = info.thisPageIndex;

            switch (kind) {
                case "a": info.thisPageIndex = 1; break; //首页 
                case "z": info.thisPageIndex = info.pageCount; break; //末页 
                case "+": info.thisPageIndex = info.thisPageIndex * 1 + 1; break; //下页 
                case "-": info.thisPageIndex = info.thisPageIndex * 1 - 1; break; //上页 
                case "go": info.thisPageIndex = $("#Txt_GO").val() * 1; break; //go 
            }
            //判断范围
            if (info.thisPageIndex > info.pageCount) info.thisPageIndex = info.pageCount;
            if (info.thisPageIndex < 1) info.thisPageIndex = 1;

            if (info.OnPageChange != undefined)
                info.OnPageChange(info.beforePageIndex, info.thisPageIndex);


            info.NaviCreate(info); //重新设置页号导航

            //克隆
            var tmpdiv = info.pageTurnDivIDs.split(",");
            var pageHtml = $("#" + tmpdiv[0]).clone(true);
            for (var i = 1; i < tmpdiv.length; i++) {
                $("#" + tmpdiv[i]).html(pageHtml);
            }
            info.SetPageUI(info); //重新设置UI
        };
    }
};

//js版的QuickPager
Nature.Page.QuickPager = function () {
    this.pagerInfo = {};
    this.Start = function (callback) {

        //设置默认值
        setDefaultInfo(this.pagerInfo);
        var info = this.pagerInfo;

        //设置css。如果没有设置，则不动态加载
        if (info.cssPath != undefined)
            Nature.CommonFunction.addStyle(info.cssPath);

        //加载模板
        $.get(info.templetPath, function (data) {

            //alert("加载分页模板成功");

            //模板放到div里面
            var tmpdiv = info.pageTurnDivIDs.split(",");
            $("#" + tmpdiv[0]).html(data);

            if (info.recordCount != -1) info.SetPageUI(info); //设置分页UI

            // info.RegPagerEvent(info); //注册事件（仅限上一页、下一页、首页、末页，不包括页号导航）
            info.NaviCreate(info); //设置页号导航

            //调用外部函数，提取记录创建table
            info.OnPageChange(0, 1);

            if (callback != undefined)
                callback(); //回调

            //克隆多个分页UI
            if (tmpdiv.length > 1) {
                window.setTimeout(function () {
                    var pageHtml = $("#" + tmpdiv[0]).clone(true);
                    for (var i = 1; i < tmpdiv.length; i++) {
                        $("#" + tmpdiv[i]).html(pageHtml);
                    }
                }, 100);
            }
            info.RegPagerEvent(info); //注册事件（仅限上一页、下一页、首页、末页，不包括页号导航）
        });
    };

    //设置默认值
    var setDefaultInfo = function (a) {

        var b = Nature.Page.QuickPagerDefaultInfo;
        if (a.recordCount == undefined) a.recordCount = b.recordCount;
        if (a.pageSize == undefined) a.pageSize = b.pageSize;
        if (a.pageCount == undefined) a.pageCount = b.pageCount;
        if (a.thisPageIndex == undefined) a.thisPageIndex = b.thisPageIndex;
        if (a.beforePageIndex == undefined) a.beforePageIndex = b.beforePageIndex;
        if (a.isUseRecordCount == undefined) a.isUseRecordCount = b.isUseRecordCount;
        if (a.naviCount == undefined) a.naviCount = b.naviCount;

        if (a.templetPath == undefined) a.templetPath = b.templetPath;

        if (a.NaviCreate == undefined) a.NaviCreate = Nature.Page.QuickPagerExtend.CreateNavi;
        if (a.SetPageUI == undefined) a.SetPageUI = Nature.Page.QuickPagerExtend.SetPageUI;
        if (a.RegPagerEvent == undefined) a.RegPagerEvent = Nature.Page.QuickPagerExtend.RegPagerEvent;

    };

};

//绑定列表
function GetPageList(url, para, contentid, pageid, pagesize, obj, S_PrevID, S_NextID) {
    if (S_PrevID == undefined) {
        S_PrevID = "S_Prev";
    }
    if (S_NextID == undefined) {
        S_NextID = "S_Next";
    }
    var pageSize = pagesize;
    var dt = new Date();
    $.post(url + para, {
        t: dt.getMilliseconds(),
        pageIndex: 1,
        pageSize: pageSize
    }, function (data) {
        var result = eval('(' + data + ')');
        var count = result.count;
        $("#pagecount").html(count);
        if (count == '0') {
            $("#" + pageid).hide();
            //$(".tab_ft_ri").hide();
            $("#content").hide();
            $(".Nodate").show();
            $(".tabbot").hide();

        } else {
            $(".Nodate").hide();
            $("#content").show();
            $("#" + pageid).show();
            $(".tab_ft_ri").show();
            $(".tabbot").show();
        }

        setpage(url, para, contentid, pageid, obj, count, pageSize, S_PrevID, S_NextID);
        result.data = result.data.replace(/\^!/g, '"');
        $("#" + contentid).html(result.data);
        if (obj != null) {
            //add by zfj 多分页
            obj(data);
        }
    });
}

function setpage(url, para, contentid, pageid, obj, count, pageSize, S_PrevID, S_NextID) {

    var page = new Nature.Page.QuickPager();
    //设置相关属性
    page.pagerInfo = {
        recordCount: count,
        pageSize: pageSize,
        S_PrevID: S_PrevID,
        S_NextID: S_NextID,
        //总记录数
        pageTurnDivIDs: pageid,         //放置分页控件的div的id，可以是多个，用半角逗号分隔
        //翻页的事件
        OnPageChange: function (oldPageIndex, thisPageIndex) {
            if (oldPageIndex == 0) {
                return;
            }
            var dt = new Date();
            $.post(url + para, {
                t: dt.getMilliseconds(),
                pageIndex: thisPageIndex,
                pageSize: pageSize
            }, function (data) {
                var result = eval('(' + data + ')');
                var count = result.count;
                result.data = result.data.replace(/\^!/g, '"');
                $("#" + contentid).html(result.data);
                if (obj != null) {
                    obj(data);
                }
            });
        }
    };
    page.Start(function () {
        //内部自动调用OnPageChange(0,1)。
    });


}

var names = "";
//获取所有复选框id 集合
function GetSelectIds() {
    var ids = "";
    $("input[name='MySelect']").each(function () {
        if ($(this)[0].checked) {
            ids += $(this).val() + ",";
            names += $(this).attr("class") + ",";
        }
    })
    return ids;
}


//复选框全选，全不选
function selectAlls() {
    $("input[name='MySelect']").not($("input[disabled='disabled']")).each(function () {
        $(this).prop("checked", $("#selectAll").prop("checked"));
    })
}