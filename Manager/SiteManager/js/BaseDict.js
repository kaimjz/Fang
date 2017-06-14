//创建人：sdz
//时间：2016.04.19

//查询列表
function Search() {   
    var sname = encodeURIComponent($("#sname").val());   
    var type = $("#hid_type").val();
    var zbfk = $("#skip").val();
    if (type == '1') {
        var data = "?action=getBaseDict&sname=" + sname;
        GetPageList("/SiteManager/Service/BaseDictList.ashx", data, "content", "pagefoot", 10);
        $("#divbottom").css('display', 'none');
    } else if (type == '2') {
        var data = "?action=getDictionary&did=" + zbfk + "&sname=" + sname;
        GetPageList("/SiteManager/Service/BaseDictList.ashx", data, "content", "pagefoot", 10, function () {
            $("#skip").val(zbfk);
            $("#hid_type").val("2");
            $("#divbottom").css('display', 'block');
        });
    }
    //else {
    //    var data = "?action=getBaseDict&sname=" + sname;
    //    GetPageList("/SiteManager/Service/BaseDictList.ashx", data, "content", "pagefoot", 10);
    //}
}


//创建人：sdz
//时间：2016.04.19
//查询子类列表
function selectBaseDictionary(did) {
    var data = "?action=getDictionary&did=" + did; //+ "&sname=" + sname;
    GetPageList("/SiteManager/Service/BaseDictList.ashx", data, "content", "pagefoot", 10, function () {
        $("#skip").val(did);
        $("#hid_type").val("2");
        $("#divbottom").css('display', 'block');
    });
}
//创建人：sdz
//时间：2016.04.20
//跳转到修改页面
function Updatepage(ID) {
    window.location.href = 'AddBaseDict.aspx?id=' + ID;
}

//创建人：sdz
//时间：2016.04.20
//修改添加词典

function BaseDictmanager() {
    var name = $("#Name").val();
    var bz = $("#Text3").val();
    var id = $("#baseid").val();
    var k = true;
    if (name.length > 100 || name.length < 1) {
        $("#pname").html("长度为1-100").show();
        k = false;
    } else {
        $("#pname").html("").hide();
    }

    if (k) {

        var action = "";
        if (id == "") {
            action = "AddBaseDict";
        }
        else {
            action = "UpdateBaseDict";
        }

        getAjax("/SiteManager/Service/BaseDictList.ashx", {
            action: action, name: name, bz: bz, id: id
        }, function (msg) {
            if (action == "AddBaseDict") {
                if (msg == "1") {
                    ShowMsg("提示", "添加成功！", function () {
                        if (msg == "1") {
                            Urlhref('BaseDict.aspx');
                        }
                    });
                }
                else {
                    //添加失败
                    ShowMsg("提示", "添加失败");
                }
            }
            else {
                if (msg == "1") {
                    ShowMsg("提示", "编辑成功！", function () {
                            window.location.href = 'BaseDict.aspx';
                    });
                }
                else {
                    //编辑失败
                    ShowMsg("提示", "编辑失败");
                }
            }
        });
    }
}
//创建人：sdz
//时间：2016.04.20
//删除词典内容
function DeleteDictionary(dictid) {
    var type = $("#hid_type").val();
    var zbfk = $("#skip").val();
    var data = "";
    var url = "";
    if (dictid == "") {
        //批量删除
        var ids = "";
        $("input[name='MySelect']").each(function () {
            if ($(this)[0].checked) {
                ids += "'" + $(this).val() + "',";
            }
        })
        if (type == '1') {
            data = "?dictid=" + ids + "&action=DeleteBaseDict";
            url = "/SiteManager/Service/BaseDictList.ashx" + data;
        } else if (type == '2') {
            data = "?dictid=" + ids + "&action=DeleteBaseDictionary";
            url = "/SiteManager/Service/BaseDictList.ashx" + data;
        }
        if (ids == "") {
            ShowMsg("提示", "请选择删除项！", null, null);
        } else {
            Deletedict(url, zbfk);
        }
    } else {
        if (type == '1') {
            var data = "?dictid=" + dictid + "&type=one&action=DeleteBaseDict";
            var url = "/SiteManager/Service/BaseDictList.ashx" + data;
            Deletedict(url);
        } else if (type == '2') {
            var data = "?dictid=" + dictid + "&type=one&action=DeleteBaseDictionary";
            var url = "/SiteManager/Service/BaseDictList.ashx" + data;
            Deletedict(url);
        }
    }
}

//创建人：sdz
//时间：2016.04.20
//跳转到添加词典子表页面
function urlBaseDictionarypage(did) {
    window.location.href = 'AddBaseDictionary.aspx?dictid=' + did;
}


//创建人：sdz
//时间：2016.04.20
//跳转修改页面
function UpdateDictionarypage(dictid) {
    window.location.href = 'AddBaseDictionary.aspx?dictid=' + dictid;
}

//创建人：sdz
//时间：2016.04.20
//修改添加词典子表内容

//
function SaveBaseDictionaty() {
    var type = $.trim($("#Name").val());
    var name = $.trim($("#Text1").val());
    var dictid = $("#did").val();
    //主表外键用于跳转
    var zbfk = $("#skip").val();
    var did = $("#dictid").val();
    //添加完成用于跳转的id
    var tzid = $("#tzid").val();
    var k = true;
    if (name.length > 6 || name.length < 1) {
        $("#dname").html("长度为1-6").show();
        k = false;
    } else {
        $("#dname").html("").hide();
    }
    if (type > 1000 || type.length < 1) {
        $("#dtype").html("值为0-1000").show();
        k = false;
    } else {
        $("#dtype").html("").hide();
    }
    if (k) {
        var action = "";
        if (dictid == "") {
            action = "AddBaseDictionary";
        }
        else {
            action = "UpdateBaseDictionary";
        }
        getAjax("/SiteManager/Service/BaseDictList.ashx", {
            action: action, dictid: dictid, did: did, name: name, type: type
        }, function (msg) {
            if (action == "AddBaseDictionary") {
                if (msg == "1") {

                    ShowMsg("提示", "添加成功！", function () {
                        if (msg == "1") {
                            window.location.href = 'BaseDict.aspx?tzid=' + tzid;
                        }
                        else {
                            //添加失败
                            ShowMsg("提示", "添加失败");
                        }
                    });
                }
                else if (msg == "-1") {
                    ShowMsg("提示", "名称重复");
                }
                else {
                    //添加失败
                    ShowMsg("提示", "添加失败");
                }
            }
            else {
                if (msg == "1") {
                    ShowMsg("提示", "编辑成功！", function () {
                            window.location.href = 'BaseDict.aspx?tid=' + did;
                    });
                }
                else if (msg == "-1") {
                    ShowMsg("提示", "名称重复");
                }
                else {
                    //编辑失败
                    ShowMsg("提示", "编辑失败");
                }


            }
        });
    }
}

//创建人：sdz
//时间：2016.04.20
//删除词典内容

function Deletedict(url, zbfk) {
    $.post(url, function (msg) {
        if (msg == "1") {

            ShowMsg("提示", "删除成功！", function () {
                if ($("#hid_type").val() == "1") {
                    window.location.href = 'BaseDict.aspx';
                } else {
                    window.location.href = 'BaseDict.aspx?tid=' + $("#skip").val();
                }
            });
        }
        else if(msg == "-1"){
            ShowMsg("提示", "该分类下已有圈子关联,不能删除！");
        }
        else {
            ShowMsg("提示", "删除失败！");
        }
    }, "text");
}
