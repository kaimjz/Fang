//add by wsy

//查询敏感词列表
function Search() {
    var data = "?action=selectSensitiveWord&sname=" + encodeURIComponent($.trim($("#sname").val()));
    GetPageList("Service/SensitiveWordManager.ashx", data, "content", "pagefoot", 10, function (data) { GetIndex(data); LoadLevel(); });
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
    //导出当前页
    var data = "?action=exportExcel&type=" + type + "&pageIndex=" + pageindex + "&pageSize=" + pageSize + "&sname=" + encodeURIComponent($.trim($("#sname").val()));
    window.location.href = "Service/SensitiveWordManager.ashx" + data;
}
//删除
function Delete(id) {
    ShowConfirm("提示", "确定删除？", dele, id);
}
function dele(id) {
    var data = { action: "delete", id: id };
    getAjax("Service/SensitiveWordManager.ashx", data, function (msg) {
        if (msg == "1") {
            ShowMsg("提示", "删除成功！", function () {
                Search();
            });
        }
        else {
            ShowMsg("提示", "删除失败！", null, null);
        }
    });
}

//重置或返回
function Back() {
    var id = $.trim($("#id").val());
    if ($.trim(id) == "") {
        //重置
        Reset();
    }
    else {
        $.cookie("useCookie", "true");
        //编辑功能时启用cookie读取分页信息
        //返回
        window.location.href = "SensitiveWordList.aspx";
    }
}

//保存、编辑
function Save() {

    var name = $.trim($("#name").val());
    var id = $.trim($("#id").val());
    var result = true;
    if ($.trim(name) == "") {
        $("#name").next().html("必填").show();//敏感词内容不能为空
        result = false;
    }
    else {
        //登录名验证
        if ($.trim(name).length > 50) {
            $("#name").next().html("长度为1-50").show();
            result = false;
        }
        else {
            $("#name").next().html("").hide();
        }
    }
    if (result) {
        var mess = id == "" ? "添加" : "编辑";
        var data = { action: "validName", id: id, name: name };
        getAjax("Service/SensitiveWordManager.ashx", data, function (msg) {
            if (msg == "1") {
                var url = "Service/SensitiveWordManager.ashx?time=" + new Date().toLocaleTimeString();
                var action = id == "" ? "addSW" : "editSW";

                if (action == "editSW") {
                    $.cookie("useCookie", "true");
                    //编辑功能时启用cookie读取分页信息
                }

                var parm = { action: action, id: id, name: name };
                getAjax(url, parm, function (msg) {
                    if (msg == "1") {
                        ShowMsg("提示", mess + "成功！", Urlhref, "SensitiveWordList.aspx");
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

