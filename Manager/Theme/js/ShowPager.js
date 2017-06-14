//分页初始化
//obj:分页控件的id
//pageIndex：当前页码
//pageSize：每页条数
//postUrl：请求地址
//params：请求参数
//pageCallBack:分页回调函数

var G_page, G_pageSize, G_totleCount, G_totlePage, G_params, G_postUrl, G_ShowPageFunctionName;
function init(pageIndex, pageSize, postUrl, params, pageCallBack) {
    G_page = pageIndex;
    G_pageSize = pageSize;
    G_params = params;
    G_postUrl = postUrl;
    G_ShowPageFunctionName = pageCallBack;

    if ($("#foot").find("div").length == 0) {
        var pagerFoot = "<div class='tab_ft_le' id='oprselection'><div class='tab_ft_le_lt' id='selectHtml'><span><input id='selectAll' onclick='selectAlls()' type='checkbox'/></span><span><label for='selectAll'>全选/全不选</label></span><span class='dele_book_ico'></span><span id='deletebtn'><a href=\"javascript:Delete('')\">批量删除</a></span></div></div></div><div class='table_fot_ri'><span>共<font  id='totleCount'></font>条，<font><label id='currentPage'></label>/<label id='totlePage'></label></font>页</span><span><span class='table_for_arrow_le png'><a  href='javascript:PrePage()'></a></span><span class='table_page'><a href='javascript:PrePage()'>上一页</a></span></span><span><span><a href='javascript:NextPage()'>下一页</a></span><span class='table_for_arrow_ri'><a href='javascript:NextPage()'></a></span></span><span>转到第</span><span><input  id='jumpPage' type='text'class='table_fot_input'/></span><span>页</span><span class='table_fot_page'><a href='javascript:JumpPage()'></a></span><span><a href='javascript:JumpPage()' class='text_line'>转</a></span><span class='set_btn'><a href='javascript:ChangePageBox()'>设置</a></span><div class='set_pop_box' id='pageBox' style='display: none'><div class='set_pop'><span class='set_pop_arrow'></span><span>每页</span><input id='pageSize' type='text' class='set_pop_input'/><span>条</span><span class='set_pop_btn'><a href='javascript:JumpPage()'>确定</a></span></div></div></div>";
        $("#foot").append(pagerFoot);
    }
    $.ajax({
        type: "POST",
        url: postUrl + "?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
        dataType: "json",
        data: G_params,
        success: function (msg) {
            if (msg.flag == true) {
                if (msg.list.length <= 0) {//没有数据
                    $("#showPage").hide();
                    if ($(".new_table_no").length == 0) {
                        $(".beitab").append("<div class='new_table_no'>没有数据</div>");
                    } else {
                        $(".new_table_no").show();
                    }
                    $(".tab_ft_ri").eq(0).hide();
                    pageCallBack(null);
                } else {
                    $("#showPage").show();
                    $(".tab_ft_ri").eq(0).show();
                    pageCallBack(msg.list);
                }
                //加载成功
                G_totleCount = msg.totleCount;
                if (msg.totleCount % pageSize > 0) {
                    G_totlePage = Math.floor(msg.totleCount / pageSize) + 1;
                } else {
                    G_totlePage = msg.totleCount / pageSize;
                }

                $("#totleCount").text(G_totleCount);
                $("#currentPage").text(G_page);
                $("#totlePage").text(G_totlePage);

                $("#jumpPage").val(G_page);
                $("#pageSize").val(G_pageSize);
                //一个分页，多个回调函数
                if (pageCallBack != null) {
                    $("#showPage").find("tr:gt(0)").remove();
                    pageCallBack(msg.list);
                }
                checkbind();
            }
            else {
                //加载失败
                $(".ri_box_fot").eq(0).hide();
                $(".new_table_no").eq(0).show();
                $(".new_table").eq(0).hide();
                ShowMsg("提示", "加载失败", null, null);
            }
        }
    });
}

//上一页
function PrePage() {
    if (parseInt(G_page, 10) - 1 < 1) {
        ShowMsg("提示", "已经是首页", null, null);
        return;
    }
    if ($("#selectAll").prop("checked")) {
        $("#selectAll").removeAttr("checked");
    }
    return init(parseInt(G_page, 10) - 1, G_pageSize, G_postUrl, G_params, G_ShowPageFunctionName);
}

//下一页
function NextPage() {
    if (parseInt(G_page, 10) + 1 > $("#totlePage").text()) {
        ShowMsg("提示", "已经是尾页", null, null);
        return;
    }
    if ($("#selectAll").prop("checked")) {
        $("#selectAll").removeAttr("checked");
    }
    return init(parseInt(G_page, 10) + 1, G_pageSize, G_postUrl, G_params, G_ShowPageFunctionName);
}
//验证数字 num
function isInteger(obj) {
    var re = /^(\d){1,4}$/;
    if (re.exec(obj)) {
        obj = new Number(obj);
        if (obj > 0 && obj <= 1000) {
            return true;
        } else {
            return false;
        }
    }
    else {
        return false;
    }
}
//跳转
function JumpPage() {
    if (!isInteger($("#jumpPage").val()) || !isInteger($("#pageSize").val())) {
        $("#jumpPage").val('1');
        ShowMsg("提示", "请输入大于0的整数", null, null);
        return;
    } else {
        if (parseInt($("#pageSize").val()) > 50) {
            $("#pageSize").val('10');
            ShowMsg("提示", "请输入不大于50的整数", null, null);
            return;
        }
    }

    if ($("#jumpPage").val() > G_totlePage) {
        $("#jumpPage").val('1');
        ShowMsg("提示", "输入的数字超出界限", null, null);
        return;
    }
    $("#pageBox").css("display", "none");
    if ($("#selectAll").prop("checked")) {
        $("#selectAll").removeAttr("checked");
    }
    return init($("#jumpPage").val(), $("#pageSize").val(), G_postUrl, G_params, G_ShowPageFunctionName);
}

//分页尾部设置按钮
function ChangePageBox() {
    $("#pageBox").toggle();
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

function GetSelectActivityIds() {
    var activityIds = "";
    $("input[name='MySelect']").each(function () {
        if ($(this)[0].checked) {
            activityIds += $(this).attr("title") + ",";
            names += $(this).attr("class") + ",";
        }
    })
    return activityIds;
}


//复选框全选，全不选
function selectAlls() {
    $("input[name='MySelect']").not($("input[disabled='disabled']")).each(function () {
        $(this).prop("checked", $("#selectAll").prop("checked"));
    })
}


//控制全选控件状态
function checkstate() {
    var flag = true;
    $("input[name='MySelect']").each(function () {
        if (!$(this).prop("checked")) {
            flag = false;
        }
    })
    if (flag) {
        $("#selectAll").prop("checked", true);
    } else {
        $("#selectAll").prop("checked", false);
    }
}

//控制数据加载后选择复选框的状态
function checkbind() {
    $("input[name='MySelect']").each(function () {
        $(this).click(function () {
            checkstate();
        })
    })
}