//非法评论js
//add by: fuzhenzhen
//date： 15-07-13

function deleteCmtswAll() {

    var cmtswId = $("#cmtswId").val();
    var commentId = $("#commentId").val();
    var param = { action: "deleteCmtswAll", id: cmtswId, comId: commentId };
    getAjax("/SiteManager/Service/CommentManager.ashx", param, function (msg) {
        if (msg == "1") {

            ShowMsg("提示", "删除成功！", RefreshCmtswLoad, null);

        } else {
            ShowMsg("提示", "删除失败！", null, null);
        }

    });
}

//删除非法评论
function deleteCmtsw() {

    var cmtswId = $("#cmtswId").val();
    var param = { action: "deletecmtsw", id: cmtswId };
    getAjax("/SiteManager/Service/CommentManager.ashx", param, function (msg) {
        if (msg == "1") {

            ShowMsg("提示", "忽略成功！", RefreshCmtswLoad, null);

        } else {
            ShowMsg("提示", "忽略失败！", null, null);
        }

    });
}


function RefreshCmtswLoad() {
    $.cookie("useCookie", "true");
   window.location.href="/SiteManager/CmtSwCommentList.aspx";
}