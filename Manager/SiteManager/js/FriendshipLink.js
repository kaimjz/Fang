function deleteFriendLink(id) {
    ShowConfirm("提示", "确定删除？", deleteFriendLinkSub, id);
}
function deleteFriendLinkSub(id) {
    var param = { action: "delete", id: id };
    getAjax("Service/FriendshipLinkManager.ashx", param, function (msg) {
        if (msg == "True") {

            ShowMsg("提示", "删除成功！", function () {
                GetFriendshipLink();
            });

        } else {
            ShowMsg("提示", "删除失败！", null, null);
        }
    })

}

function updateSort(id, sortType)
{

    var data = { action: "updateSort", id: id, sortType: sortType };
    getAjax("Service/FriendshipLinkManager.ashx", data, function (msg) {
        debugger;
        if (msg == "true") {
            ShowMsg("提示", "修改成功！", GetFriendshipLink, null);
        } else {
            if (msg != false) {
                ShowMsg("提示", msg, GetFriendshipLink, null);
            } else {
                ShowMsg("提示", "修改失败！", GetFriendshipLink, null);
            }
        }
    }, null);
}

//加载友情链接列表
//wp
//2016-4-15
function GetFriendshipLink() {
    var isshunt = $("#isshunt").val();
    var sname = encodeURIComponent($.trim($("#sname").val()));
    GetPageList("Service/FriendshipLinkManager.ashx", "?action=search&isshunt=" + isshunt + "&sname=" + sname, "content", "pagefoot", 10, function (data) { GetIndex(data); LoadLevel() });
}
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

//保存友情链接
//wp
//2016-4-15
function Save() {
    var result = true;
    var name = $("#Name").val();
    var isshunt = $("input[name=radio1]:checked").val();
    var address = $("#Address").val();
    var id = $.trim($("#HidID").val());



    if ($.trim(name) == "") {
        $("#Name").siblings("i").show();
        $("#Name").siblings("i").html("必填");
        result = false;
    }
    else if (name.length > 25) {
        $("#Name").siblings("i").show();
        $("#Name").siblings("i").html("长度为1-25");
        result = false;
    }
    else {
        $("#Name").siblings("i").html("");
    }


    if ($.trim(address) == "") {
        $("#Address").siblings("i").show();
        $("#Address").siblings("i").html("必填");
        result = false;
    }
    else if (!isUri(address)) {
        $("#Address").siblings("i").show();
        $("#Address").siblings("i").html("格式错误");
        result = false;
    }
    else {
        $("#Address").siblings("i").html("");
    }


    if (result) {
        var mess = id == "" ? "添加" : "编辑";
        var data = { action: "validName", id: id, name: name, address: address, isshunt: isshunt };
        getAjax("Service/FriendshipLinkManager.ashx", data, function (msg) {
            if (msg == "1") {
                var url = "Service/FriendshipLinkManager.ashx?time=" + new Date().toLocaleTimeString();
                var action = id == "" ? "addlink" : "editlink";

                var parm = { action: action, id: id, name: name, address: address, isshunt: isshunt };
                getAjax(url, parm, function (msg) {
                    if (msg == "1") {
                        ShowMsg("提示", mess + "成功！", Urlhref, "FriendshipLink.aspx");
                    }
                    if (msg == "0") {
                        ShowMsg("提示", mess + "失败！", null, null);
                    }
                })
            } else if (msg == "0") {
                ShowMsg("提示", "名称重复！", null, null);
            }
        }, null);


    }
}


//重置和返回列表
function Reset() {
    var action = $("#action").val();
    if ($("#action").val() == "edit") {
        location.href = "FriendshipLink.aspx";
    }
    else {

        document.getElementById("form1").reset();
        $("input[type='checkbox']").removeAttr('checked');
        $("i").html("").hide();
    }

}
