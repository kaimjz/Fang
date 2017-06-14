//上传合同附件
function LoadUploadify(obj, url, para, folder, fileext) {
    $("#filemodelstart").hide();//隐藏开始上传按钮

    $("#" + obj).uploadify({
        'uploader': '/js/upload/uploadify.swf', //上传控件的主体文件，flash控件
        'script': url, //相对路径的后端脚本，它将处理您上传件。
        'scriptData': para, //键值对应
        'cancelImg': '/images/cancel.png', //取消按钮。设定图片路径。默认cancel.png
        'folder': "/" + folder, //您想将文件保存到的路径。
        'sizeLimit': 1024 * 1024 * 1024 * 1024 * 1024 * 1024, //控制上传文件的大小，单位byte
        'queueSizeLimit': 1, //限制在一次队列中的次数（可选定几个文件）。
        'fileDesc': fileext, //出现在上传对话框中的文件类型描述。与fileExt需同时使用
        'fileExt': fileext, //设置可以选择的文件的类型
        'method': 'Post', //提交方式Post 
        'queueID': 'ShowImage1', //文件队列的ID，该ID与存放文件队列的div的ID一致。
        'buttonImg': '/js/upload/btn.png', //浏览按钮的图片的路径。
        'wmode': 'opaque', //设置该项为transparent 可以使浏览按钮的flash背景文件透明，并且flash文件会被置为页面的最高层。默认值：opaque 。
        'auto': false, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
        'multi': false, //设置为true时可以上传多个文件。
        'removeCompleted': false, //队列上传完后不消失
        'onComplete': function (e, q, f, data, d) {
            $("#" + obj + "start").hide();
            if (data == 1) {
                newalert("提示", "上传成功", null, null);
                //$("#filemodelstart").unbind();
                GetContraResList();
            } else if (data == 2) {
                newalert("提示", "上传文件不能为空", null, null);
            } else {
                newalert("提示", "上传错误", null, null);
            }
        },
        'onSelect': function (a, b, c) {
            //todo:显示上传列表
            $("#" + obj + "start").show();

            $("#" + obj + "start").click(function () {
                $("#" + obj).uploadifyUpload();
            });
        },
        'onError': function (event, ID, fileObj, errorObj) {
            $("#" + obj + "start").hide();
            newalert("提示", "上传错误", null, null);
        }
    });
}
//上传图片集封面
function LoadUploadifyPicGroup(obj, url, para, folder, fileext, queueID, multi, selectCallBack, completeCallBack) {
    $("#" + obj + "start").hide();//隐藏开始上传按钮

    $("#" + obj).uploadify({
        'uploader': '/Theme/js/upload/uploadify.swf', //上传控件的主体文件，flash控件
        'script': url, //相对路径的后端脚本，它将处理您上传件。
        'scriptData': para, //键值对应
        'cancelImg': '/Theme/js/upload/cancel.png', //取消按钮。设定图片路径。默认cancel.png
        'folder': "/" + folder, //您想将文件保存到的路径。
        'sizeLimit': 1024 * 1024 * 1024 * 1024 * 1024 * 1024, //控制上传文件的大小，单位byte
        'queueSizeLimit': 1, //限制在一次队列中的次数（可选定几个文件）。
        'fileDesc': fileext, //出现在上传对话框中的文件类型描述。与fileExt需同时使用
        'fileExt': fileext, //设置可以选择的文件的类型
        'method': 'Post', //提交方式Post 
        'queueID': queueID, //文件队列的ID，该ID与存放文件队列的div的ID一致。
        'buttonImg': '/Theme/js/upload/btn.png', //浏览按钮的图片的路径。
        'wmode': 'opaque', //设置该项为transparent 可以使浏览按钮的flash背景文件透明，并且flash文件会被置为页面的最高层。默认值：opaque 。
        'auto': false, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
        'multi': multi, //设置为true时可以上传多个文件。
        'removeCompleted': false, //队列上传完后不消失
        'onSelect': function (a, b, c) {
            selectCallBack(a, b, c);
        },
        'onComplete': function (e, q, f, data, d) {
            completeCallBack(e, q, f, data, d);
        },
        'onError': function (event, ID, fileObj, errorObj) {
            $("#" + obj + "start").hide();
            newalert("提示", "上传错误", null, null);
        }
    });
}
//清空
function ResetUploadify() {
    $(":file").each(function () {
        var fileObjId = $(this).attr("id");
        $(".uploadifyQueueItem").each(function () {
            var q = $(this).attr('id').replace(fileObjId, '');
            $("#" + fileObjId).uploadifyCancel(q); //删除文件队列
            $("#h_coverPath").val('');
            $("#l_coverPath").val('');
            $("#r_coverPath").val('');
        });
    });
}
