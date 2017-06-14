//js 热词管理
//创建人:yxy
//创建时间：2015-06-05
function Save() {
    var result = true;
    var name = $("#Name").val();
    var istop = $("input[name=radio1]:checked").val();
    var id = $("#HidID").val();
    if ($.trim(name) == "") {
        $("#Name").siblings("i").show();
        $("#Name").siblings("i").html("必填");
        result = false;
    }
    if (name.length > 25) {
        $("#Name").siblings("i").show();
        $("#Name").siblings("i").html("长度为1-25");
        result = false;
    }
    if (result) {
        var act = $("#action").val();
        var mge = "";
        if (act == "add") {
            act = "SearchWordAdd";
            mge = "添加";
        }
        else {
            act = "SearchWordEdit";
            mge = "编辑";

            $.cookie("useCookie", "true");
            //编辑功能时启用cookie读取分页信息
        }

        var url = "Service/SearchWordManager.ashx?time=" + new Date().toLocaleTimeString();
        var parm = { action: act, name: name, istop: istop, id: id };
        getAjax(url, parm, function (msg) {
            if (msg == "1") { ShowMsg("提示", mge + "成功！", Urlhref, "SearchWordList.aspx"); }
            else if (msg == "0") { ShowMsg("提示", mge + "失败！", null, null); }
            else if (msg == "-1") {
                ShowMsg("提示", "热词已存在！", null, null);
            }
        });
    }
}

//重置和返回列表
function Reset() {
    if ($("#action").val() == "add") {
        document.getElementById("form1").reset();
        $("input[type='checkbox']").removeAttr('checked');
        $("i").html("").hide();
    }
    else {
        $.cookie("useCookie", "true");
        //编辑功能时启用cookie读取分页信息
        location.href = "SearchWordList.aspx";
    }
}

//热词绑定
//创建人:gm
//创建时间:2015.7.10
function SearchWordBind() {
    var searchContent = $("#searchContent").val();
    var searchWordSort = $("#searchWordSort").val();
    var param = "?action=SearchWordList&searchContent=" + encodeURIComponent(searchContent) + "&searchWordSort=" + searchWordSort;
    GetPageList("Service/SearchWordManager.ashx", param, "content", "pagefoot", 10, function (data) { GetIndex(data); LoadLevel(); });
}
//返回pageindex 
//add by wsy
//时间：2015-08-16
function GetIndex(result) {
    if (!result.thisPageIndex) {
        pageindex = 1;
        recordCount = result.count;
    }
    else {
        pageindex = result.thisPageIndex;
        recordCount = result.recordCount;
    }
}
//导出Excel
//add by wsy
//时间：2015-08-16
function ExportExcel(type) {
    var pageSize = 10;
    if (type == "all") {
        pageSize = recordCount;
    }
    var data = "?action=exportExcel&type=" + type + "&pageIndex=" + pageindex + "&pageSize=" + pageSize + "&searchContent=" + escape($("#searchContent").val()) + "&searchWordSort=" + $("#searchWordSort").val();
    window.location.href = "Service/SearchWordManager.ashx" + data;
}
//删除热词(单个批量)
function del(id, name) {
    if (id == "") {
        id = GetSelectIds();
    }
    else {
        names = name;
    }
    if (id == "") {
        ShowMsg("提示", "请选择删除项！", null, null);
        return;
    }
    ShowConfirm("提示", "确定删除？", delinfo, id);
}
function delinfo(id) {
    $.post("Service/SearchWordManager.ashx", { action: "delSearchWord", id: id, names: names }, function (data) {
        if (data == "0") {
            ShowMsg("提示", "删除失败！", null, null);
        }
        if (data == "1") {
            ShowMsg("提示", "删除成功！", function () {
                SearchWordBind();
            });
        }
    })
}

//设置置顶
function ResetIsTop(id, state, topIndex) {
    var mge = "";
    if (state == "True") {
        mge = "取消置顶";
    }
    else {
        mge = "置顶";
    }
    $.post("Service/SearchWordManager.ashx", { action: "SetIsTop", id: id, state: state, topIndex: topIndex }, function (data) {
        if (data == "0") {
            ShowMsg("提示", mge + "失败！", null, null);
        }
        if (data == "1") {
            ShowMsg("提示", mge + "成功！", function () {
                SearchWordBind();
            });
        }
    })
}

