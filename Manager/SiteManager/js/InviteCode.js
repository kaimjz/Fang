//邀请码列表js
//add by fuzhenzhen
//date 07-24

//获取邀请码列表
function getInviteCodeList() {
    var status = $("#status").val();
    GetPageList("/SiteManager/Service/InviteCodeManager.ashx", "?action=getInviteCodeList&status=" + status, "content", "pagefoot", 10, function (data) { GetIndex(data); LoadLevel(); });
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
    var status = $("#status").val();
    var data = "?action=exportExcel&type=" + type + "&pageIndex=" + pageindex + "&recordCount=" + recordCount + "&pageSize=10&status=" + status;
    window.location.href = "Service/InviteCodeManager.ashx" + data;
}
//删除提示
function del(id) {
    var ids;
    if (id == "") {
        //批量删除
        ids = GetSelectIds();
        if (ids == "") {
            ShowMsg("提示", "请选择删除项！", null, null);
        } else {
            ShowConfirm("提示", "确定删除？", DeleteOperate, ids);
        }
    } else {
        //单个删除
        ids = id + ",";
        ShowConfirm("提示", "确定删除？", DeleteOperate, ids);
    }
}

//执行删除
function DeleteOperate(ids) {
    var param = { action: "deleteInviteCode", id: ids };
    getAjax("/SiteManager/Service/InviteCodeManager.ashx", param, function (msg) {
        if (msg == "1") {

            ShowMsg("提示", "删除成功！", function () {
                getInviteCodeList();
            });

        } else {
            ShowMsg("提示", "删除失败！", null, null);
        }
    })
}

//刷新列表
function RefreshList() {
    getInviteCodeList();
}

//生成code
function createCode() {
    var param = { action: "createInviteCode" };
    getAjax("/SiteManager/Service/InviteCodeManager.ashx", param, function (msg) {
        if (msg == "1") {
            ShowMsg("提示", "生成成功！", function () {
                getInviteCodeList();
            });

        } else {
            ShowMsg("提示", "生成失败！", null, null);
        }
    })
}