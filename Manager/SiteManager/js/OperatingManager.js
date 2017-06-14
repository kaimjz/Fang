//创建人：yxy
//创建时间：2015-06-02
//保存权限
function Save() {
    debugger;
    if (JudgeValidate("form1")) {
        var act = $("#action").val();
        var mge = "";
        if (act == "add") {
            act = "OperatingAdd";
            mge = "添加";
        }
        else {
            act = "OperatingEdit";
            mge = "编辑";
        }
        $("#isPublic2").val($("#isPublic").val());
        var data = $("#form1").serialize();
        if (JudgeValidate("form1")) {
            getAjax("Service/OperatingManager.ashx?action=" + act, data, function (msg) {
                if (msg == "1") { ShowMsg("提示", mge + "成功", Urlhref, "OperatingList.aspx"); }
                else if (msg == "0") { ShowMsg("提示", mge + "失败", null, null); }
            });
        }
    }
}

//重置和返回列表
function Reset() {
    if ($("#action").val() == "add") {
        document.getElementById("form1").reset();
        $("input[type='checkbox']").removeAttr('checked');
        $("i").html("").hide();
    }
    else {
        location.href = "OperatingList.aspx";
    }
}
