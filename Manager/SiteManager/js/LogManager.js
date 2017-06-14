//获取日志分页列表 王思媛 2015-04-24
function Search() {
    var id = $.trim($("#logid").val());
    var model = $("#model").val();
    var data = "?action=Select";
    if (model != "") {
        data = data + "&model=" + model;
    }
    if (id != "")
    { data = data + "&id=" + id; }
    GetPageList("Service/LogManager.ashx", data, "content", "pagefoot", 10, GetIndex);
}
//获取当前页数及列表总数
//add by wsy
//2015-08-20
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
//2015-08-20
function ExportExcel(type) {
    var id = $.trim($("#logid").val());
    var model = $("#model").val();
    var pageSize = 10;
    if (type == "all") {
        pageSize = recordCount;
    }
    var data = "?action=exportExcel&type=" + type + "&pageIndex=" + pageindex + "&pageSize=" + pageSize + "&model=" + model + "&id=" + id;
    window.location.href = "Service/LogManager.ashx" + data;
}


