
//获取领读者评论列表
function GetLeaderCmtList() {
    GetPageList("/SiteManager/Service/LeaderManager.ashx",
        "?action=getLeaderCmtList",
        "content",
        "pagefoot",
        10,
        function (data) { GetIndex(data); LoadLevel(); });
}

//获取当前页数及列表总数
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

//删除提示
function DeleteConfirm() {
    var ids = GetSelectIds();
    if (ids == "") {
        ShowMsg("提示", "请选择删除项！", null, null);
    } else {
        ShowConfirm("提示", "确定删除？", DeleteOperate, ids);
    }
}

//执行删除
function DeleteOperate(ids) {
    var param = { action: "deleteComments", id: ids };
    getAjax("/SpecialManager/Service/EassayVoteCmtList.ashx", param, function (msg) {
        if (msg != "0") {
            ShowMsg("提示", "删除成功！", function () {
                GetLeaderCmtList();
            });
        } else {
            ShowMsg("提示", "删除失败！");
        }
    })
}


//审核通过
function AuditStatus(id) {
    var data = { action: "auditstatus", id: id };
    getAjax("/SpecialManager/Service/EassayVoteCmtList.ashx", data, function (msg) {
        if (msg == "0") {
            ShowMsg("提示", "审核失败！", null, null);
        }
        else if (msg == "1") {
            ShowMsg("提示", "审核成功！", function () { $.cookie("useCookie", "true"); GetLeaderCmtList(); });
        }
    }, null)
}
//批量通过
function AuditStatusCommets() {
    var id = GetSelectIds();
    if (!id) {
        ShowMsg("提示", "请选择！");
        return;
    }
    AuditStatus(id);//审核
}

//导出Excel
function ExportExcel(type) {
    var data = "?action=exportExcel&pageIndex=" + pageindex + "&pageSize=10&recordCount=" + recordCount + "&type=" + type;
    window.location.href = "/SiteManager/Service/LeaderManager.ashx" + data;
}