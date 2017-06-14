//创建人：wsy
//时间：2015-06-02

//保存
function Save() {

    var password = "";
    var againpwd;
    var roles = $.trim($("#roleBind").val());
    var username = $.trim($("#username").val());
    var name = $.trim($("#realName").val());
    var tel = $.trim($("#tel").val());
    var email = $.trim($("#email").val());
    var remark = $.trim($("#remark").val());
    var userid = $.trim($("#userid").val());
    var status = $("input[name='State']:checked").val();
    var result = true;

    if (roles == "") {
        $("#roleBind").next().html("必选").show();
        result = false;
    }
    else {
        $("#roleBind").next().hide();
    }

    if (username == "") {
        $("#username").next().html("必填").show();
        result = false;
    }
    else {
        //登录名验证
        if (username.length > 25) {
            $("#username").next().html("长度为1-25").show();
            result = false;
        }
        else {
            if (!CheckName(username)) {
                $("#username").next().html("输入数字、字母、_").show();
                result = false;
            } else {
                $("#username").next().hide();
            }
        }
    }

    if ($.trim(name) == "") {
        $("#realName").next().html("必填").show();
        result = false;
    }
    else {
        if (name.length > 20 || name.length < 1) {
            $("#realName").next().html("长度为1-20").show();
            result = false;
        }
        else {
            //验证用户名
            if (CheckRealName(name)) {
                $("#realName").next().html("只能包含汉字、字母、英文 .").show();
                result = false;
            } else {
                $("#realName").next().hide();
            }
        }
    }

    if ($.trim(email) != "") {
        if (!isEmail(email)) {
            $("#email").next().html("邮箱格式不正确").show();
            result = false;
        }
        else {
            var index = email.indexOf("@");
            var headstr = email.substr(0, index);
            if ($.trim(headstr).length > 25 || $.trim(headstr).length < 3) {
                $("#email").next().html("邮箱前缀长度为3-25").show();
                result = false;
            }
            else {
                $("#email").next().hide();
            }
        }
    }
    else {
        $("#email").next().hide();
    }

    if ($.trim(tel) != "") {
        if (!CheckTelephone(tel)) {
            $("#tel").next().html("必须为固定电话或手机格式").show();
            result = false;
        }
        else {
            $("#tel").next().hide();
        }
    }
    else {
        $("#tel").next().hide();
    }

    var action = userid == "" ? "addUser" : "editUser";

    if (action == "addUser") {
        var password = $("#pwd").val();
        var repwd = $("#repwd").val();
        var a = password.length;
        var b = repwd.length;


        //输入密码
        if (a > 0 && CheckSpace(password)) {
            $("#pwd").next().html("空格不计入密码").show();
            result = false;
        } else if (a == 0) {

            $("#pwd").next().html("必填").show();
            result = false;
        } else if ($.trim(password).length < 6 || $.trim(password).length > 20) {
            $("#pwd").next().html("长度为6-20").show();
            result = false;
        }
        else {
            $("#pwd").next().hide();
        }



        //确认密码
        if (b > 0 && CheckSpace(repwd)) {
            $("#repwd").next().html("空格不计入密码").show();
            result = false;
        } else if (b == 0) {
            $("#repwd").next().html("必填").show();
            result = false;
        } else if ($.trim(repwd).length < 6 || $.trim(repwd).length > 20) {
            $("#repwd").next().html("长度为6-20").show();
            result = false;
        }
        else if (password != repwd) {
            $("#repwd").next().html("两次密码不一致").show();
            result = false;
        }
        else {
            $("#repwd").next().hide();
        }
    }

    if (result) {
        var url = "Service/UserManager.ashx?time=" + new Date().toLocaleTimeString();
        var parm = { action: action, pwds: password == "" ? "" : hex_md5(password), Role: roles, UserName: username, RealName: name, tel: tel, email: email, remark: remark, id: userid, status: status };
        getAjax(url, parm, function (msg) {
            if (msg == "1") {
                ShowMsg("提示", "保存成功！", Urlhref, "UserList.aspx");
            }
            if (msg == "0") {
                ShowMsg("提示", "保存失败！", null, null);
            }
            if (msg == "-1") {
                ShowMsg("提示", "名称重复！", null, null);
            }
            if (msg == "-2") {
                ShowMsg("提示", "名称重复！", null, null);
            }
        })
    }
}

function BindRole() {
    var data = { action: "selectRole", roleid: $("#roleid").val() }
    getAjax("Service/UserManager.ashx", data, function (msg) {
        $("#roleBind").html(msg);
    });

}

//重置或返回
function Back() {
    var id = $("#userid").val();
    if ($.trim(id) == "") {
        //重置
        Reset();
    }
    else {
        $.cookie("useCookie", "true");
        //返回
        window.location.href = "UserList.aspx";
    }
}

//弹出层
function pwdUpdate(id) {

    var data = { action: "resetpwd", id: id, pwd: hex_md5(id) };
    getAjax("Service/UserManager.ashx", data, function (msg) {
        if (msg == 1) {
            ShowMsg("提示", "重置成功！");
        }
        else {
            ShowMsg("提示", "重置失败！");
        }
    });
}

//查询列表
function Search() {
    var name = $("#name").val();
    var data = "?action=selectUser&name=" + name;
    GetPageList("Service/UserManager.ashx", data, "content", "pagefoot", 10, function (data) { GetIndex(data); LoadLevel(); });
}
//返回pageindex 及列表总数
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
    var data = "?action=exportExcel&type=" + type + "&pageIndex=" + pageindex + "&pageSize=" + pageSize + "&name=" + encodeURIComponent($.trim($("#name").val()));
    window.location.href = "Service/UserManager.ashx" + data;
}
//关闭重置密码弹出层
function Close() {
    $("#psdForm").hide();
    window.location.href = "UserList.aspx";
}

//重置密码：确定
function UpdateEnd() {
    var id = $("#psdID").val();
    var before = $("#beforepsd").val();
    var news = $("#newpsd").val();
    var result = true;
    if (before == "") {
        $("#first").show();
        $("#first").html("必填");
        result = false;
    }
    else {
        if ($.trim(before).length < 6 || $.trim(before).length > 20) {
            $("#first").show();
            $("#first").html("长度为6-20位字符");
            result = false;
        }
        else {
            $("#first").hide();

        }
    }
    if (news == "") {
        $("#second").show();
        $("#second").html("必填");
        result = false;
    }
    else {
        if ($.trim(news).length < 6 || $.trim(news).length > 20) {
            $("#second").show();
            $("#second").html("长度为6-20");
            result = false;
        }
        else {
            $("#second").hide();
        }

    }

    if (before != news && ($.trim(news).length > 0 && $.trim(news).length > 0)) {
        $("#second").show();
        $("#second").html("两次密码不一致");
        result = false;
    }

    if (result) {
        var param = { action: "editPassword", before: hex_md5(before), id: id };
        getAjax('/SiteManager/Service/UserManager.ashx', param, function (data) {
            if (data == "1") {
                ShowMsg("提示", "重置成功！", Urlhref, "UserList.aspx");
                return;
            }
            if (data == "0") {
                ShowMsg("提示", "重置失败！", null, null);
                return;
            }
        })
    }
}

//重置密码
function pwdUpdate(id) {
    $(".pop_bg").show();
    $("#id").val(id);
    $("#updatepwd").show();
}
function checkPWD() {
    var password = $("#pwd").val();
    var repwd = $("#repwd").val();
    var result = true;
    var zhengze = /\s+/g;
    var a = password.length;
    var b = repwd.length;

    //输入密码
    if (a > 0 && CheckSpace(password)) {
        $("#pwd").next().html("空格不计入密码").show();
        result = false;
    } else if (a == 0) {

        $("#pwd").next().html("必填").show();
        result = false;
    } else if ($.trim(password).length < 6 || $.trim(password).length > 20) {
        $("#pwd").next().html("长度为6-20").show();
        result = false;
    }
    else {
        $("#pwd").next().hide();
    }



    //确认密码
    if (b > 0 && CheckSpace(repwd)) {
        $("#repwd").next().html("空格不计入密码").show();
        result = false;
    } else if (b == 0) {
        $("#repwd").next().html("必填").show();
        result = false;
    } else if ($.trim(repwd).length < 6 || $.trim(repwd).length > 20) {
        $("#repwd").next().html("长度为6-20").show();
        result = false;
    }
    else if (password != repwd) {
        $("#repwd").next().html("两次密码不一致").show();
        result = false;
    }
    else {
        $("#repwd").next().hide();
    }
    if (result) {
        //reset password
        var param = { action: "resetpwd", pwd: hex_md5(password), id: $("#id").val() };
        $(".tan_cong").hide();
        getAjax('Service/UserManager.ashx', param, function (data) {
            if (data == "1") {
                ShowMsg("提示", "重置成功！", closetan);
                return;
            }
            if (data == "0") {
                ShowMsg("提示", "重置失败！", null, null);
                return;
            }
        })
    }

}
//关闭弹窗
function closetan() {
    $("#updatepwd").hide();
    $(".pop_bg").hide();
    $("#pwd").val("");
    $("#repwd").val("");
    $("#pwd").next().html("").hide();
    $("#repwd").next().html("").hide();
}

//授权/停权
function Stop(id, status) {
    var newstatus;
    if (status == "1") {
        newstatus = 0;
    } else {
        newstatus = 1;
    }
    var param = { action: "editStatus", newstatus: newstatus, id: id };
    getAjax('/SiteManager/Service/UserManager.ashx', param, function (data) {
        if (data == "1") {
            if (newstatus == 0) {
                //ShowMsg("提示", "停用成功！", Urlhref, "UserList.aspx");
                ShowMsg("提示", "停用成功！", function () {
                    Search();
                });
            } else {
                ShowMsg("提示", "启用成功！", function () {
                    Search();
                });
            }
            return;
        }
        if (data == "0") {
            if (newstatus == 0) {
                ShowMsg("提示", "停用失败！", null, null);
            } else {
                ShowMsg("提示", "启用失败！", null, null);
            }
            return;
        }
    })
}

//用户退出
//创建人：yxy
//创建时间：2015-06-08
function Exitlogin() {
    $.post("/SiteManager/Service/UserManager.ashx", { action: "Exitlogin" }, function (data) {
        if (data == "1") {
            var date = new Date();
            location.href = "login.aspx?ds=" + date.getTime() + "&random=" + Math.round(Math.random() * 100);

        } else {
            alert("退出失败！");
        }

    })
}


