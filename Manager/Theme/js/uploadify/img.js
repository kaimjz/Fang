
$(function () {
    //$(".pop_bg").click(function () {
    //    $(".user_login_le,.pop_bg").hide();
    //});
    $("#uploadify2Uploader").css("width", "106px");
    $("#uploadify2Uploader").css("height", "24px");
    $("#uploadify2Uploader").css("float", "left");
})

//url:图片保存路径，不包括名称  '../Upload/user'
//size:现在图片个数
//queueID:上传列队显示的位置(输入div的id即可比如：ShowImage1)
//buttonImg:点击按钮的图片路径   /Theme/images/register_up.png
//ifImg:图像是否剪裁  1是  0否  //无用，可删
function CreateImg(url, size, queueID, buttonImg, ifImg) {
    $(document).ready(function () {
        $("#uploadify").uploadify({
            'uploader': '/Theme/js/uploadify/uploadify.swf', //上传控件的主体文件，flash控件
            'script': '/Activity/Service/ImgHelp.ashx?action=addImg', //相对路径的后端脚本，它将处理您上传的文件。
            'scriptData': { "myType": 1 },  //传递参数
            'cancelImg': '/Theme/images/cancel.png', //取消按钮。设定图片路径。默认cancel.png
            'folder': url, //您想将文件保存到的路径。
            'sizeLimit': 1024 * 1024 * 1024 * 1024 * 1024 * 1024, //控制上传文件的大小，单位byte
            'queueSizeLimit': size, //限制在一次队列中的次数（可选定几个文件）。
            'fileDesc': '只允许上传bmp,gif,jpg,jpeg,png文件', //出现在上传对话框中的文件类型描述。与fileExt需同时使用
            'fileExt': '*.bmp;*.gif;*.jpg;*.jpeg;*.png', //设置可以选择的文件的类型
            'method': 'Post', //提交方式Post 
            'queueID': queueID, //文件队列的ID，该ID与存放文件队列的div的ID一致。
            'buttonImg': buttonImg, //浏览按钮的图片的路径.
            'wmode': 'transparent', //设置该项为transparent 可以使浏览按钮的flash背景文件透明，并且flash文件会被置为页面的最高层。默认值：opaque 。
            'auto': true, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
            'multi': true, //设置为true时可以上传多个文件。
            'removeCompleted': false, //队列上传完后不消失 
            'onComplete': function (e, q, f, data, d) {
                $("#uploadify" + q).hide();
                $("#img_url").val(url + "/image/" + data);  //上传后图片隐藏区域(方便剪裁调用)
                $("#newimg").attr("src", url + "/image/" + data);
                cut();
            }
        });

        //活动banner
        $("#uploadify2").uploadify({
            'uploader': '/Theme/js/uploadify/uploadify.swf', //上传控件的主体文件，flash控件
            'script': '/Activity/Service/ImgHelp.ashx?action=addImg', //相对路径的后端脚本，它将处理您上传的文件。
            'scriptData': { "myType": 0 },  //传递参数
            'cancelImg': '/Theme/images/cancel.png', //取消按钮。设定图片路径。默认cancel.png
            'folder': url, //您想将文件保存到的路径。
            'sizeLimit': 1024 * 1024 * 1024 * 1024 * 1024 * 1024, //控制上传文件的大小，单位byte
            'queueSizeLimit': size, //限制在一次队列中的次数（可选定几个文件）。
            'fileDesc': '只允许上传bmp,gif,jpg,jpeg,png文件', //出现在上传对话框中的文件类型描述。与fileExt需同时使用
            'fileExt': '*.bmp;*.gif;*.jpg;*.jpeg;*.png', //设置可以选择的文件的类型
            'method': 'Post', //提交方式Post 
            'queueID': queueID, //文件队列的ID，该ID与存放文件队列的div的ID一致。
            'buttonImg': buttonImg, //浏览按钮的图片的路径.
            'wmode': 'transparent', //设置该项为transparent 可以使浏览按钮的flash背景文件透明，并且flash文件会被置为页面的最高层。默认值：opaque 。
            'auto': true, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
            'multi': true, //设置为true时可以上传多个文件。
            'removeCompleted': false, //队列上传完后不消失 
            'onComplete': function (e, q, f, data, d) {
                $("#uploadify" + q).hide();
                $("#imgPath").val(url + "/image/" + data); //隐藏域路径
                $("#img_url").val(url + "/image/" + data);  //上传后图片显示
                $("#imgsrc").attr("src", url + "/image/" + data);
            }
        });


        //专题背景图片
        $("#upload").uploadify({
            'uploader': '/Theme/js/uploadify/uploadify.swf', //上传控件的主体文件，flash控件
            'script': '/SubjectManager/Service/SubjectManager.ashx?action=addImg', //相对路径的后端脚本，它将处理您上传的文件。
            'scriptData': { "myType": 0 },  //传递参数
            'cancelImg': '/Theme/images/cancel.png', //取消按钮。设定图片路径。默认cancel.png
            'folder': url, //您想将文件保存到的路径。
            'sizeLimit': 1024 * 1024 * 1024 * 1024 * 1024 * 1024, //控制上传文件的大小，单位byte
            'queueSizeLimit': size, //限制在一次队列中的次数（可选定几个文件）。
            'fileDesc': '只允许上传bmp,gif,jpg,jpeg,png文件', //出现在上传对话框中的文件类型描述。与fileExt需同时使用
            'fileExt': '*.bmp;*.gif;*.jpg;*.jpeg;*.png', //设置可以选择的文件的类型
            'method': 'Post', //提交方式Post 
            'queueID': queueID, //文件队列的ID，该ID与存放文件队列的div的ID一致。
            'buttonImg': buttonImg, //浏览按钮的图片的路径.
            'wmode': 'transparent', //设置该项为transparent 可以使浏览按钮的flash背景文件透明，并且flash文件会被置为页面的最高层。默认值：opaque 。
            'auto': true, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
            'multi': true, //设置为true时可以上传多个文件。
            'removeCompleted': false, //队列上传完后不消失 
            'onComplete': function (e, q, f, data, d) {
                $("#uploadify" + q).hide();
                $("#imgpath").val(url + "/image/" + data); //隐藏域路径
                //$("#img").val(url + "/image/" + data);  //上传后图片显示
                $("#img").attr("src", url + "/image/" + data);
                $("input[type='radio']").eq(0).attr("checked", "checked");//选中背景图片的按钮 清空颜色信息
                $("#backcolor").attr("nowcolor", "");
                $("#backcolor").css("background-color", "");
            }
        });

        //专题背景图片--add by wsy--2016年3月18日
        $("#bg_upload").uploadify({
            'uploader': '/Theme/js/uploadify/uploadify.swf', //上传控件的主体文件，flash控件
            'script': '/SpecialManager/Service/ImgHelp.ashx?action=addImg', //相对路径的后端脚本，它将处理您上传的文件。
            'scriptData': { "myType": 0 },  //传递参数
            'cancelImg': '/Theme/images/cancel.png', //取消按钮。设定图片路径。默认cancel.png
            'folder': url, //您想将文件保存到的路径。
            'sizeLimit': 1024 * 1024 * 1024 * 1024 * 1024 * 1024, //控制上传文件的大小，单位byte
            'queueSizeLimit': size, //限制在一次队列中的次数（可选定几个文件）。
            'fileDesc': '只允许上传bmp,gif,jpg,jpeg,png文件', //出现在上传对话框中的文件类型描述。与fileExt需同时使用
            'fileExt': '*.bmp;*.gif;*.jpg;*.jpeg;*.png', //设置可以选择的文件的类型
            'method': 'Post', //提交方式Post 
            'queueID': queueID, //文件队列的ID，该ID与存放文件队列的div的ID一致。
            'buttonImg': buttonImg, //浏览按钮的图片的路径.
            'wmode': 'transparent', //设置该项为transparent 可以使浏览按钮的flash背景文件透明，并且flash文件会被置为页面的最高层。默认值：opaque 。
            'auto': true, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
            'multi': true, //设置为true时可以上传多个文件。
            'removeCompleted': false, //队列上传完后不消失 
            'onComplete': function (e, q, f, data, d) {
                $("#bg_upload" + q).hide();
                $("#bg_imgpath").val(url + "/image/" + data); //隐藏域路径
                $("#bg_img").attr("src", url + "/image/" + data);
                $("input[type='radio'][name='radio_bg']").eq(1).attr("checked", "true");//选中背景图片的按钮 清空颜色信息
                $("#bg_color").attr("nowcolor", "");
                $("#bg_color").css("background-color", "");
            }
        });

        //积分商城资源封面
        $("#uploadResource").uploadify({
            'uploader': '/Theme/js/uploadify/uploadify.swf', //上传控件的主体文件，flash控件
            'script': '/MallManager/Service/Mall_ResourceManager.ashx?action=addImg', //相对路径的后端脚本，它将处理您上传的文件。
            'scriptData': { "myType": 0 },  //传递参数
            'cancelImg': '/Theme/images/cancel.png', //取消按钮。设定图片路径。默认cancel.png
            'folder': url, //您想将文件保存到的路径。
            'sizeLimit': 1024 * 1024 * 1024 * 1024 * 1024 * 1024, //控制上传文件的大小，单位byte
            'queueSizeLimit': size, //限制在一次队列中的次数（可选定几个文件）。
            'fileDesc': '只允许上传bmp,gif,jpg,jpeg,png文件', //出现在上传对话框中的文件类型描述。与fileExt需同时使用
            'fileExt': '*.bmp;*.gif;*.jpg;*.jpeg;*.png', //设置可以选择的文件的类型
            'method': 'Post', //提交方式Post 
            'queueID': queueID, //文件队列的ID，该ID与存放文件队列的div的ID一致。
            'buttonImg': buttonImg, //浏览按钮的图片的路径.
            'wmode': 'transparent', //设置该项为transparent 可以使浏览按钮的flash背景文件透明，并且flash文件会被置为页面的最高层。默认值：opaque 。
            'auto': true, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
            'multi': true, //设置为true时可以上传多个文件。
            'removeCompleted': false, //队列上传完后不消失 
            'onComplete': function (e, q, f, data, d) {
                $("#uploadify" + q).hide();
                $("#resourceImgPath").val(url + "/image/" + data); //隐藏域路径
                $("#imgsrc").attr("src", url + "/image/" + data);
            }
        });

        //视频合辑封面
        $("#videogroupcoverload").uploadify({
            'uploader': '/Theme/js/uploadify/uploadify.swf', //上传控件的主体文件，flash控件
            'script': '/Activity/Service/ImgHelp.ashx?action=addImg', //相对路径的后端脚本，它将处理您上传的文件。
            'scriptData': { "myType": 0 },  //传递参数
            'cancelImg': '/Theme/images/cancel.png', //取消按钮。设定图片路径。默认cancel.png
            'folder': url, //您想将文件保存到的路径。
            'sizeLimit': 1024 * 1024 * 1024 * 1024 * 1024 * 1024, //控制上传文件的大小，单位byte
            'queueSizeLimit': size, //限制在一次队列中的次数（可选定几个文件）。
            'fileDesc': '只允许上传bmp,gif,jpg,jpeg,png文件', //出现在上传对话框中的文件类型描述。与fileExt需同时使用
            'fileExt': '*.bmp;*.gif;*.jpg;*.jpeg;*.png', //设置可以选择的文件的类型
            'method': 'Post', //提交方式Post 
            'queueID': queueID, //文件队列的ID，该ID与存放文件队列的div的ID一致。
            'buttonImg': buttonImg, //浏览按钮的图片的路径.
            'wmode': 'transparent', //设置该项为transparent 可以使浏览按钮的flash背景文件透明，并且flash文件会被置为页面的最高层。默认值：opaque 。
            'auto': true, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传
            'multi': true, //设置为true时可以上传多个文件。
            'removeCompleted': false, //队列上传完后不消失 
            'onComplete': function (e, q, f, data, d) {
                $("#uploadify" + q).hide();
                $("#imgPath").val(url + "/image/" + data); //隐藏域路径
                $("#img_url").val(url + "/image/" + data);  //上传后图片显示
                $("#imgsrc").attr("src", url + "/image/" + data);
            }
        });


    });
}


function cut() {
    $(".user_login_le,.pop_bg").show();
    var myDate = new Date();
    $(".user_login_le").load("../Theme/js/uploadify/cutimg.html?img=" + $("#img_url").val() + "&t=" + myDate.getTime());
}


//删除图片
function DeleteImage1(q, n) {
    $.ajax({
        type: "POST",
        url: "../services/DeleteHander.ashx?q=" + q + "&n=" + n,
        success: function (msgs) {
            if (msgs != "0") {
                jQuery("#uploadify").uploadifyCancel(msgs);
            }
        }
    });
}


