//时间：2015-07-23
//创建人：wsy

//广告列表分页
function Search() {
    var advid = $("#advid").val();
    var data = "?action=search&advid=" + advid + "&sname=" + encodeURI($.trim($("#sname").val()));
    GetPageList("Service/AdvManager.ashx", data, "content", "pagefoot", 10, function (data) { GetIndex(data); LoadLevel(); });
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

//导出Excel
function ExportExcel(type) {
    var data = "?action=exportExcel&type=" + type + "&pageIndex=" + pageindex + "&recordCount=" + recordCount + "&pageSize=10" + "&sname=" + encodeURI($.trim($("#sname").val())) + "&advid=" + $("#advid").val();
    window.location.href = "Service/AdvManager.ashx" + data;
}
//删除
function Delete(id) {
    ShowConfirm("提示", "确定删除？", DeleteClass, id);
}
function DeleteClass(id) {
    var data = { action: "delete", id: id };
    getAjax("Service/AdvManager.ashx", data, function (msg) {
        if (msg == "0") {
            ShowMsg("提示", "删除失败！", null, null);
        }
        else if (msg == "1") {
            ShowMsg("提示", "删除成功！", Urlhref, "AdvList.aspx");
        }
    }, null)
}

//编辑广告
function Save() {
    var type = $.trim($("#pictype").val());
    var advid = $.trim($("#advid").val());
    var url = $.trim($("#pic_url").val());
    var altname = $.trim($("#altname").val());
    var isnofollow = $(":radio[name=isnofollow]:checked").val();

    var result = true;
    if (url.length > 200 || url.length < 1) {
        $("#pic_url").next().html("长度为1-200").show();
        result = false;
    }
    else {
        $("#pic_url").next().html("").hide();
    }
    if (altname.length > 200) {
        $("#altname").next().html("长度为0-200").show();
    }
    else {
        $("#altname").next().html("").hide();
    }
    if (result) {
        //上传图片
        $.ajaxFileUpload({
            url: "Service/AdvManager.ashx",
            secureuri: false,
            fileElementId: ['uploadfile'],
            data: { "action": "edit", "advid": advid, "url": url, "altname": altname, "isnofollow": isnofollow },
            dataType: 'text',
            success: function (data, status) {
                if (data.indexOf("-2") > 0) {
                    ShowMsg("提示", "图片过大！", LastPicture, null);
                    return;
                }
                else if (data.indexOf("-3") > 0) {
                    ShowMsg("提示", "图片必选！", null, null);
                    return;
                }
                else if (data.indexOf("1") > 0) {
                    //添加积分商城广告判断标识0：阅读网 1：积分商城 edit by fuzhenzhen 15-11-05
                    if (type == "0") {

                        ShowMsg("提示", "编辑成功！", Urlhref, "AdvList.aspx");
                    }
                    if (type == "1") {
                        ShowMsg("提示", "编辑成功！", Urlhref, "../MallManager/Mall_AdvList.aspx");
                    }
                }
                else if (data.indexOf("-1") > 0) {
                    ShowMsg("提示", "图片格式不正确！", LastPicture, null);
                }
                else {
                    ShowMsg("提示", "编辑失败！", null, null);
                }
            }, error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
        });
    }
}

//返回
function Back() {
    //添加积分商城广告判断标识0：阅读网 1：积分商城 edit by fuzhenzhen 15-11-05
    var id = $.trim($("#advid").val());
    var type = $.trim($("#pictype").val());
    if (id != "") {
        if (type == "0") {

            Urlhref("AdvList.aspx");
        }
        if (type == "1") {

            Urlhref("../MallManager/Mall_AdvList.aspx");
        }
    }
}

//图片不正确时返回初始图片或清除图片
function LastPicture() {
    var pic = $.trim($("#pic").val());
    var advid = $.trim($("#advid").val());
    if (advid == "") {
        $("#preview").html("").hide();
    }
    else {
        $("#preview").html("<img id='imghead' src=" + pic + " width='150px' height='150px'/>");
    }
}
//上移下移操作  lyn
function SortPreAndNext(id,type) {
        $.ajax({
        url: "Service/AdvManager.ashx",
        data: { action: "SortPreAndNext", id: id, SortType: type },
        type: "post",
        dataType:"text",
        cache: false,
        async: false,
        success: function (msg) {
            if (msg == -1) {
                ShowMsg("提示", "无法执行移动操作");
            }
            else if (msg == 1) {
                ShowMsg("提示", "移动成功", Search);
            }
            else {
                ShowMsg("提示", "移动失败");
            }
        }
    });
}