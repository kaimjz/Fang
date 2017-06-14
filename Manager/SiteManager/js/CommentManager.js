//评论列表js
//创建人：fuzhenzhen
//创建时间：15-07-09

//获取评论列表
function getCommentList() {
    var type = $("#cmttype").val();
    var resName = $("#searchContent").val();
    GetPageList("/SiteManager/Service/CommentManager.ashx", "?action=getCommentList&cmttype=" + type + "&name=" + escape(resName), "content", "pagefoot", 10, function (data) { GetIndex(data); LoadLevel(); });
}

//删除提示
function Delete(id) {
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
    var param = { action: "deleteComments", id: ids };
    getAjax("/SiteManager/Service/CommentManager.ashx", param, function (msg) {
        if (msg != "0") {
            ShowMsg("提示", "删除成功！", function () {
                getCommentList();
            });

        } else {
            ShowMsg("提示", "删除失败！", null, null);
        }
    })
}

//重新加载列表
function RefreshLoad() {
    getCommentList();
}

//加载非法评论列表
function getCmtswcontentList() {
    var strwhere = $("#cmttype").val();
    var handle = $("#handletype").val();
    var name = $("#searchName").val();
    GetPageList("/SiteManager/Service/CommentManager.ashx", "?action=getCmtswcontentList&cmttype=" + strwhere + "&handle=" + handle + "&name=" + escape(name), "content", "pagefoot", 10, function (data) { GetIndex(data); LoadLevel(); });
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
function ExportExcel(type, isSW) {
    if (isSW == "true") {
        //非法评论
        var strwhere = $("#cmttype").val();
        var handle = $("#handletype").val();
        var name = $("#searchName").val();
        var data = "?action=exportSWExcel&type=" + type + "&pageIndex=" + pageindex + "&pageSize=10&recordCount=" + recordCount + "&cmttype=" + strwhere + "&handle=" + handle + "&name=" + escape(name);
        window.location.href = "Service/CommentManager.ashx" + data;
    } else {
        var cmttype = $("#cmttype").val();
        var resName = $("#searchContent").val();
        var data = "?action=exportExcel&type=" + type + "&pageIndex=" + pageindex + "&pageSize=10&recordCount=" + recordCount + "&cmttype=" + cmttype + "&name=" + escape(resName);
        window.location.href = "Service/CommentManager.ashx" + data;
    }
}

//删除非法评论
//function Deletecmtsw(id) {
//    var ids;
//    if (id == "") {
//        //批量删除
//        ids = GetSelectIds();
//        if (ids == "") {
//            ShowMsg("提示", "请选择删除项！", null, null);
//        } else {
//            ShowConfirm("提示", "确定删除？", DeleteOperateBycmtsw, ids);
//        }
//    } else {
//        //单个删除
//        ids = id + ",";
//        ShowConfirm("提示", "确定删除？", DeleteOperateBycmtsw, ids);
//    }
//}

////执行删除非法评论
//function DeleteOperateBycmtsw(ids) {
//    var param = { action: "deletecmtsw", id: ids };
//    getAjax("/SiteManager/Service/CommentManager.ashx", param, function (msg) {
//        if (msg == "1") {

//            ShowMsg("提示", "删除成功！", RefreshCmtswLoad, null);

//        } else {
//            ShowMsg("提示", "删除失败！", null, null);
//        }
//        })
//}


////重新加载非法评论列表
//function RefreshCmtswLoad() {
//    getCmtswcontentList();
//}
