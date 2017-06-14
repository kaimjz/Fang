//三级权限控制
//add by fzz
//date 16-03-02
function LoadLevel() {

    //获取菜单Id
    var id = $("#menuid", parent.document).val();
    //获取角色Id
    var roleid = $("#roleid", parent.document).val();
    //解决新增后跳转列表页没有menuid不更新，修改为根据url动态查询后再判断权限
  
  
    $.ajax({
        type: 'get',
        dataType: "text",
        url: "/SiteManager/Service/RoleOperateManager.ashx",
        data: { action: "GetOpidByUrl", opUrl: window.location.pathname },
        cache: false,
        async: true,
        success: function (msg) {
            if (msg != "0") {

                parent.$("#menuid").val(msg);
                id = msg;//将获取的新值重新赋值

                //获取当前页面三级权限
                OperateLevel(id, roleid);
                
            }

        }
    });

}
///获取当前页面三级权限
function OperateLevel(id, roleid) {
    getJsonAjax("/SiteManager/Service/RoleOperateManager.ashx", { action: "OperateLevel", id: id, roleid: roleid }, function (msg) {
        var list = msg;
        var name = "";
        for (var i = 0; i < list.length; i++) {
            name += list[i].Name + ",";
        }
        //过滤操作
        $(".level a").each(function () {
            var value = $(this).html();
            if (value == "") {
                return;
            }
            if (name.split(",").indexOf(value) == -1) // edit by zfj 修改成数组，更加安全
            {
                $(this).css("display", "none");
            }
        })
        //过滤分页处 批量操作  edit by zfj 
        $("#divbottom a").each(function () {
            name += "按时间导出全部列表,按投票数导出全部列表,导出当前页,导出全部列表,同步至天鹅商城"; //除批量删除外 ，导出写死到js中
            var value = $(this).html();
            if (value == "") {
                return;
            }
            if (name.split(",").indexOf(value) == -1) // edit by zfj 修改成数组，更加安全
            {

                $(this).css("display", "none");
            }
        })
    });
}