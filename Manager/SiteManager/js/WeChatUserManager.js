//添加微信用户
//add by fzz
//date 15-12-29
//userid:微信用户id
function AddWeChatUser(userid) {
    $.post("Service/WeChatUserManager.ashx", { action: "addwechatuser", userid: userid }, function (msg) {
        var result = eval('(' + msg + ')');
        if (result.data == "1") {
            alert("成功");
        }
        else if (result.data == "-2") {
            alert("重复");
        }
        else {
            alert("失败");
        }
    });
}


//修改用户兑换码
//add by fzz
//date 15-12-29
//userid:微信用户id
//code: 兑换码
function UpdateWeChatUser(userid, code) {
    $.post("Service/WeChatUserManager.ashx", { action: "updatewechatuser", userid: userid,code:code }, function (msg) {
        var result = eval('(' + msg + ')');
        if (result.data == "1") {
            alert("成功");
        }
        else {
            alert("失败");
        }
    });
}


//查询用户列表
function Search() {
    var statime = $("#regtimea").val();
    var endtime = $("#regtimeb").val();
    GetPageList("Service/WeChatUserManager.ashx", "?action=search&statime=" + statime + "&endtime=" + endtime + "", "content", "pagefoot", 10, GetIndex);
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
function ExportExcel(type) {
    var statime = $("#regtimea").val();
    var endtime = $("#regtimeb").val();
    var data ="?action=exportExcel&statime=" + statime + "&endtime=" + endtime + ""+"&pageIndex=" + pageindex + "&pageSize=10&type=" + type + "&recordCount=" + recordCount + "";
    window.location.href = "Service/WeChatUserManager.ashx" + data;
}