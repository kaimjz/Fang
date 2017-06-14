//上传文件  
//obj-上传file控件id
//url-处理上传的路径
//创建人：张斌
//创建时间：2015-1-14
function loadupload(obj, url) {
    $("#" + obj.toString()).uploadify({
        'uploader': '/js/upload/uploadify.swf', //上传控件的主体文件，flash控件
        'script': url, //相对路径的后端脚本，它将处理您上传的文件。
        'cancelImg': '/js/upload/cancel.png', //取消按钮。设定图片路径。默认cancel.png
        'folder': '/', //您想将文件保存到的路径。
        'sizeLimit': 1024 * 1024 * 1024, //控制上传文件的大小，单位byte
        'queueSizeLimit': 1, //限制在一次队列中的次数（可选定几个文件）。
        'fileDesc': '*.jpg;*.jpeg;*.png;*.gif', //出现在上传对话框中的文件类型描述。与fileExt需同时使用
        'fileExt': '*.jpg;*.jpeg;*.png;*.gif', //设置可以选择的文件的类型
        'method': 'Post', //提交方式Post 
        'queueID': 'ShowImage1', //文件队列的ID，该ID与存放文件队列的div的ID一致。
        'buttonImg': '/js/upload/btn.png', //浏览按钮的图片的路径。
        'wmode': 'transparent', //设置该项为transparent 可以使浏览按钮的flash背景文件透明，并且flash文件会被置为页面的最高层。默认值：opaque 。
        'auto': false, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
        'multi': false, //设置为true时可以上传多个文件。
        'removeCompleted': false, //队列上传完后不消失
        'onComplete': function (e, q, f, data, d) {
            removealertprogress();
            $("#" + obj + "start").unbind();
            $("#" + obj + "info").show();
            $("#" + obj + "name").val(data);
            $("#" + obj + "info").html("上传成功");
            $("#" + obj + "img").show();
            $("#" + obj + "img").attr("src", data);
        },
        'onSelect': function () {
            $("#" + obj + "start").click(function () {
                alert("1");
                if ($("#alertprogress").length > 0) {
                    return;
                }
                alertprogress();
                $("#" + obj).uploadifyUpload(); return false;
            });
        },
        'onError': function () {
            removealertprogress();
            $("#" + obj + "info").html("上传失败");
        }
    });
}

function newloadupload(obj, url, para, folder, fileext) {
    $("#" + obj.toString()).uploadify({
        'uploader': '/js/upload/uploadify.swf', //上传控件的主体文件，flash控件
        'script': url, //相对路径的后端脚本，它将处理您上传的文件。
        'scriptData': para, //键值对应
        'cancelImg': '/js/upload/cancel.png', //取消按钮。设定图片路径。默认cancel.png
        'folder': "/" + folder, //您想将文件保存到的路径。
        'sizeLimit': 1024 * 1024 * 1024, //控制上传文件的大小，单位byte
        'queueSizeLimit': 1, //限制在一次队列中的次数（可选定几个文件）。
        'fileDesc': fileext, //出现在上传对话框中的文件类型描述。与fileExt需同时使用
        'fileExt': fileext, //设置可以选择的文件的类型
        'method': 'Post', //提交方式Post 
        'queueID': 'ShowImage1', //文件队列的ID，该ID与存放文件队列的div的ID一致。
        'buttonImg': '/js/upload/btn.png', //浏览按钮的图片的路径。
        'wmode': 'transparent', //设置该项为transparent 可以使浏览按钮的flash背景文件透明，并且flash文件会被置为页面的最高层。默认值：opaque 。
        'auto': false, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
        'multi': false, //设置为true时可以上传多个文件。
        'removeCompleted': false, //队列上传完后不消失
        'onComplete': function (e, q, f, data, d) {
            removealertprogress();
            $("#" + obj + "start").unbind();
            $("#" + obj + "info").show();
            if (data == "Fail") {
                $("#" + obj + "info").html("上传失败");
            } else {
                $("#" + obj + "info").html("上传成功");
                $("#" + obj + "name").val(data);
            }
        },
        'onSelect': function () {
            $("#" + obj + "start").click(function () {
               
                if ($("#alertprogress").length > 0) {
                    return;
                }
                alertprogress();
                $("#" + obj).uploadifyUpload(); return false;
            });
        },
        'onError': function () {
            removealertprogress();
            $("#" + obj + "info").html("上传失败");
        },
        'onUploadError': function (event, queueID, fileObj, errorObj) {
            if (errorObj.type === "File Size") {
                alert('超过文件上传大小限制（1G）！');
                return;
            }
            alert("文件:" + fileObj.name + "上传失败");
        }
    });
}



function alertprogress() {
    var txt = "<div id=\"alertprogress\" class=\"tan_cong3\"><div class=\"tan_top_bj\"><span class=\"tan_top_title\">正在上传</span><span class=\"tan_top_fast\"></span></div><div class=\"tan_st_tit\"><img src=\"../images/012.gif\" width=\"190\" height=\"14\"></div><div class=\"tan_st_but\">正在上传，请等待</div></div>";
    $("body").append(txt);
}
function removealertprogress() {
    $("#alertprogress").remove();
}