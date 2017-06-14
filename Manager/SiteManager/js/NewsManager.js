
//创建人：lwj
//时间：2015-6-15

//查询列表
function Search() {
    var sname = encodeURIComponent($.trim($("#sname").val()));
    var status = $("#status").val();//状态
    GetPageList("/SiteManager/Service/NewsManager.ashx", "?action=newsList&sname=" + sname + "&status=" + status, "content", "pagefoot", 10, function (data) { GetIndex(data); LoadLevel(); });
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
    var pageSize = 10;
    if (type == "all") {
        pageSize = recordCount;
    }
    var status = $("#status").val();//状态
    var data = "?action=exportExcel&type=" + type + "&pageIndex=" + pageindex + "&pageSize=" + pageSize + "&sname=" + encodeURIComponent($.trim($("#sname").val())) + "&status=" + status;
    window.location.href = "Service/NewsManager.ashx" + data;
}
//删除提示
function Delete(id) {
    var ids;
    if (id == "") {
        //批量删除
         
        var ids = "";
        $("input[name='MySelect']").each(function () {
            if ($(this)[0].checked) {
                ids += "'"+$(this).val() + "',";
            }
        })

        if (ids == "") {
            ShowMsg("提示", "请选择删除项！", null, null);
        } else {
            ShowConfirm("提示", "确定删除？", DeleteOperate, ids);
        }
    } else {
        //单个删除
        ids ="'"+id + "',";
        ShowConfirm("提示", "确定删除？", DeleteOperate, ids);
    }
}
//执行删除
function DeleteOperate(ids) {
    var param = { action: "deleteNews", id: ids };
    getAjax("/SiteManager/Service/NewsManager.ashx", param, function (msg) {
        if (msg == "1") {

            ShowMsg("提示", "删除成功！", function () { Search(); });

        } else {
            ShowMsg("提示", "删除失败！", null, null);
        }
    })
}



//编辑状态
function EditState(id, status) {
    var param = { action: "updateStatus", id: id, status: status };
    getAjax("/SiteManager/Service/NewsManager.ashx", param, function (msg) {
        if (status == "1") {
            if (msg == "1") {
                ShowMsg("提示", "取消发布成功！", function () { Search(); });
            } else {
                ShowMsg("提示", "取消发布失败！", null, null);
            }
        } else {
            if (msg == "1") {
                ShowMsg("提示", "发布成功！", function () { Search(); });
            } else {
                ShowMsg("提示", "发布失败！", null, null);
            }
        }
    })
}

//设为头条
function Top(id, top, count) {
    if (top == 0) {
        if (count == 5) {
            ShowMsg("提示", "只允许设置5个头条！", null, null);
            return;
        }
        $(".pop_bg").show();
        $(".headlines").show();
        $("#file1").val("");//先清空file 值
        $("#topid").val(id);
        $("#topstatus").val(top);
    } else {
        //取消头条
        var param = { action: "topImgAdd", id: id, status: top };
        getAjax("/SiteManager/Service/NewsManager.ashx", param, function (msg) {
            if (msg == "1") {
                ShowMsg("提示", "取消头条成功！", function () { Search(); });
            } else {
                ShowMsg("提示", "取消头条失败！", null, null);
            }
        })
    }

}

//关闭弹窗
function closetan() {
    //$("#topimg").hide();
    $("#content1").val("");
    //$(".pop_bg").hide();
    $("#imghead").attr("src","");
    $(".pop_bg").hide();
    $(".headlines").hide();
    $("#file1").val("");//先清空file 值
    $("#topid").val("");
    $("#topstatus").val("");
    $("#preview").html("").hide();
    $("#content1").next().html("");
    Search();
}
//保存图片
function Upload() {
    var remark = $.trim($("#content1").val());

    if (remark == "") {
        $("#content1").next().html("必填");
        return;
    } else {
        if (remark.length > 200) {
            $("#content1").next().html("长度为1-200");
            return;
        } else {
            $("#content1").next().html("");
        }
    }

    var status = $("#topstatus").val();
    var div = document.getElementById("preview").style.display;
    $.ajaxFileUpload({
        url: "/SiteManager/Service/NewsManager.ashx?action=topImgAdd",
        secureuri: false,
        data: { "remark": remark, "id": $("#topid").val(), "status": status, "div": div },
        fileElementId: ['file1'],
        dataType: 'text',
        success: function (data, status) {
            
             
            //if (data.indexOf("-1") > 0) {
            //    ShowMsg("提示", "图片过大！", null, null);
            //    $(".pop_bg").show();
            //    $("#preview").html("").hide();
            //    return;
            //}
            if (data.indexOf("-2") > 0) {
                ShowMsg("提示", "图片必选！", null, null);
                $(".pop_bg").show();
                return;
            }
            if (data.indexOf("-3") > 0) {
                ShowMsg("提示", "图片格式错误！", null, null);
                $(".pop_bg").show();
                $("#preview").html("").hide();
                return;
            }
            if (data.indexOf("1") > 0) {
                closetan();
                ShowMsg("提示", "设置头条成功！");
                return;
            }
            if (data.indexOf("0") > 0) {
                closetan();
                ShowMsg("提示", "设置头条失败！");
                return;
            }

        }, error: function (data, status, e)//服务器响应失败处理函数
        {
            ShowMsg("提示", e, null, null);
        }
    })
}
