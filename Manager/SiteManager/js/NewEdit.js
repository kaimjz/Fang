//var editor1;
//图片上传
$(function () {
    var $ = jQuery,
        $list = $('#fileList'),
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 90 * ratio,
        thumbnailHeight = 90 * ratio,
        // Web Uploader例
        uploader;
    uploader = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: false,
        disableGlobalDnd: true,
        swf: '/Theme/moreImgUpload/Script/Uploader.swf',
        // 文件接收服务端。
        server: '/SiteManager/Service/NewsManager.ashx?action=imgUpload',
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker',
        chunked: false,
        //只允许选择图片
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png,mp4,mp3',
            mimeTypes: 'image/*'
        },
        fileNumLimit: 10,
        fileSizeLimit: 5000 * 1024 * 1024 * 1024 * 1024 * 1024,
        fileSingleSizeLimit: 703 * 1024 * 1024
    });

    //当文件被加入队列之前触发，此事件的handler返回值为false，则此文件不会被添加进入队列。
    uploader.on('beforeFileQueued', function (file) {
        var picount = parseInt($("#count").val(), 10);
        picount++;
        commitImg = picount;
        $("#count").val(picount);
        if (picount > 10) {
            this.trigger('error', 'Q_EXCEED_NUM_LIMIT', 10, file);
            setTimeout(function () {
            }, 1);
        }
        return picount > 10 ? false : true;
    });

    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        var $li = $(
            '<div id="' + file.id + '" class="cp_img" style="position:relative;width:121px;height:81px;margin-bottom:10px;">' +
            '<img style="width:121px;height:81px;">' +
            '<div class="cp_img_jian" style="width:121px;height:81px;"></div><div id="div_name' + file.id + '" class="int_1" style="width:121px;height:81px;display:none;position:absolute;left:0px; bottom:0px; height:20px; line-height:20px; color:#fff;  text-align:center; overflow: hidden;">' + file.name + '</div><div id="div_' + file.id + '" class="iht" style="display:none;width:121px;height:81px;position:absolute; right:5px; bottom:5px;"></div></div>'
        ),
            $img = $li.find('img');
        // $list为容器jQuery实例
        $list.append($li);
        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                if (file.source.ext == "mp3") {
                    src = "Images/audio.png";
                }
                if (file.source.ext == "mp4") {
                    src = "Images/video.png";
                }
                //$img.replaceWith('<span>不能预览</span>');
                //return;
            }
            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
        SetpageHeight();
    });

    //选择文件错误触发事件;
    uploader.on('error', function (code) {
        switch (code) {
            case 'F_DUPLICATE': text = '该文件已经被选择了!';
                break;
            case 'Q_EXCEED_NUM_LIMIT': text = '上传文件数量超过限制!';

                break;
            case 'F_EXCEED_SIZE': text = '文件大小超过限制!';
                break;
            case 'Q_EXCEED_SIZE_LIMIT': text = '所有文件总大小超过限制!';
                break;
            case 'Q_TYPE_DENIED': text = '文件类型不正确或者是空文件!';
                break;
            default: text = '未知错误!';
                break;
        }
        alert(text);
        if ($("#count").val() != "") {
            var picount = parseInt($("#count").val(), 10);
            picount--;
            $("#count").val(picount);
        }
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class="progress"><span></span></p>')
                .appendTo($li)
                .find('span');
        }
        $percent.css('width', percentage * 100 + '%');
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file, response) {
        //$('#' + file.id).addClass('upload-state-done');
        $("#div_" + file.id).html("<img src=\"../Theme/moreImgUpload/Images/cur.png\" />").show();
    });

    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function (file) {
        var $li = $('#' + file.id),
            $error = $li.find('div.error');
        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }
        alert("上传失败！");
        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on(' ', function (file) {
        $('#' + file.id).find('.progress').remove();
    });

    //所有文件上传完毕
    uploader.on("uploadFinished", function () {
        //提交表单
        var id = $("#Newid").val();
        var title = $.trim($("#title").val());
        var content = UE.getEditor('content1').getContent();
        var deletepic = $("#deleteid").val();
        var source = $.trim($("#source").val());
        var draftbox = $("#draftbox").val();////是否保存草稿箱  0 否 1是 add  by fuzhenzhen
        var mg = "";
        var action = "";
        if (id == "") {
            action = "addNews";
            mg = "添加";
        } else {
            action = "editNews";
            mg = "编辑";
        }

        var param = { action: action, title: title, content: content, id: id, deletepic: deletepic, source: source, subtitle: $("#subtitle").val(), draftbox: draftbox };
        getAjax("/SiteManager/Service/NewsManager.ashx", param, function (msg) {
            if (msg != "") {
                if ($("#flag").val() == "1") {
                    var previewid;
                    if ($("#Newid").val() == "") {
                        previewid = msg;
                    } else {
                        previewid = $("#Newid").val();
                    }
                    window.location.href = "/SiteManager/NewsPreview.aspx?flag=1&id=" + previewid;
                } else {
                    alert(mg + "成功！");
                    var myDate = new Date();
                    window.location.href = "/SiteManager/NewsList.aspx?random=" + myDate.getSeconds();
                }
                return;
            }
            if (msg == "") {
                alert(mg + "失败！");
                return;
            }
        })
    });

    var ueditor = UE.getEditor('content1', {
        imageActionName: "news"
    });

    //浏览
    $("#preview").click(function () {
        $("#flag").val("1");
        publicjs();
    });
    //开始上传
    $("#ctlBtn").click(function () {
        publicjs();
    });
    $("#back").click(function () {
        //var id = $("#Newid").val();
        if ($("#back").text() == "重置") {
            //重置
            Reset();
            //KindEditor.instances[0].html("");
            UE.getEditor('content1').setContent("")//清空编辑器

            //重置图片
            $("#countmore").val();
            $("#count").val();
            $("#fileList").html("");
            uploader.reset();
        } else {
            $.cookie("useCookie", "true");
            //返回
            window.location.href = "/SiteManager/NewsList.aspx";
        }
    })
    //保存草稿箱
    $("#savedraft").click(function () {
        SaveDraft();
    });

    //显示删除按钮
    $(".cp_img").live("mouseover", function () {
        $(this).children(".int_1").show();
        var imagess = $(this).children(".iht").html();
        if (imagess == "") {
            $(this).children(".cp_img_jian").css('display', 'block');
            $(this).children(".cp_img_jian").css('style', 'width:121px;height:81px;');
        }
    });
    //隐藏删除按钮
    $(".cp_img").live("mouseout", function () {
        $(this).children(".int_1").hide();
        $(this).children(".cp_img_jian").css('display', 'none');
    });
    //执行删除方法
    $list.on("click", ".cp_img_jian", function () {
        try {
            var Id = $(this).parent().attr("id");
            uploader.removeFile(uploader.getFile(Id, true));
            $(this).parent().remove();
        }
        catch (ex) {
            if ($("#Newid").val() != "") {
                var Id = $(this).parent().attr("id");
                $(this).parent().remove();

                //记录删除的个数
                var before = $("#deleteid").val();
                $("#deleteid").val(before + "'" + $(this).parent().attr("name") + "',");

                //传到后台的数量（用于控制最后一个图片）
                var houcount = parseInt($("#countmore").val(), 10);
                houcount--;
                $("#countmore").val(houcount);
            }
        }

        //记录图片总个数
        var picount = parseInt($("#count").val(), 10);
        picount--;
        $("#count").val(picount);

        SetpageHeight();
    });
    SetpageHeight();
});
//关闭  添加外部视频 弹窗
function closeVideotan() {
    $(".pop_bg").hide();
    $(".pop_bg").next().hide();

    $(".videoHeight").val("200");
    $(".videoWidth").val("200");
    $(".MyvideoThirdPath").val("");

    $("div > em").text("");
}
//获取文本编辑器内容
function getContent() {
    var arr = [];
    arr.push("使用editor.getContent()方法可以获得编辑器的内容");
    arr.push("内容为：");
    arr.push(UE.getEditor('content1').getContent());
}

function publicjs() {
    if ($.trim($("#Newid").val()) != "") {
        $.cookie("useCookie", "true");
    }//编辑功能时启用cookie读取分页信息

    var id = $("#Newid").val();
    var title = $.trim($("#title").val());
    var content = UE.getEditor('content1').getContent();
    var subtitle = $.trim($("#subtitle").val());
    var source = $.trim($("#source").val());
    var commitImg = $("#countmore").val();//再判重复时，将编辑原图片的数量赋值给公共变量editCount，以便插入图片时用到
    var result = true;

    if (title == "") {
        $("#title").next().html("必填").show();
        result = false;
    } else {
        if (title.length < 5 || title.length > 50) {
            $("#title").next().html("长度为5-50").show();
            result = false;
        } else {
            $("#title").next().html("").hide();
        }
    }

    if (content == "") {
        $("#content1").siblings("i").show();
        $("#content1").siblings("i").html("必填");
        //$("#edit i").html("必填").show();
        result = false;
    } else {
        if (content.length < 20) {//removeHTMLTag
            // $("#edit i").html("长度大于20").show();
            $("#content1").siblings("i").show();
            $("#content1").siblings("i").html("长度大于20");
            result = false;
        } else {
            $("#content1").siblings("i").html("").hide();
        }
    }
    if (subtitle != "") {
        if (subtitle.length > 50) {
            $("#subtitle").next().html("长度小于50").show();
            result = false;
        } else {
            $("#subtitle").next().html("").hide();
        }
    }

    if (source == "") {
        $("#source").next().html("必填").show();
        result = false;
    } else {
        if (source.length > 20) {
            $("#source").next().html("长度为1-20").show();
            result = false;
        } else {
            $("#source").next().html("").hide();
        }
    }

    if (result) {
        //先判重复
        var param = { action: "repeatName", title: title, id: id, commitImg: commitImg };
        getAjax("/SiteManager/Service/NewsManager.ashx", param, function (msg) {
            if (msg == "0") {
                //不重复，插入图片
                uploader.upload();
            } else {
                //重复
                alert("标题重复！");
            }
        })
    }
}

//保存草稿箱 add by fuzhenzhen
function SaveDraft() {
    var id = $("#Newid").val();
    var title = $.trim($("#title").val());
    var content = UE.getEditor('content1').getContent();
    var subtitle = $.trim($("#subtitle").val());
    var source = $.trim($("#source").val());
    var commitImg = $("#countmore").val();//再判重复时，将编辑原图片的数量赋值给公共变量editCount，以便插入图片时用到
    $("#draftbox").val("1");////是否保存草稿箱  0 否 1是 add by fuzhenzhen
    var result = true;
    if (title == "") {
        $("#title").next().html("必填").show();
        result = false;
    } else {
        if (title.length < 5 || title.length > 50) {
            $("#title").next().html("长度为5-50").show();
            result = false;
        } else {
            $("#title").next().html("").hide();
        }
    }
    if (result) {
        //先判重复
        var param = { action: "repeatName", title: title, id: id, commitImg: commitImg };
        getAjax("/SiteManager/Service/NewsManager.ashx", param, function (msg) {
            if (msg == "0") {
                //不重复，插入图片
                uploader.upload();
            } else {
                //重复
                alert("标题重复！");
            }
        })
    }
}
//过滤编辑器中的html标签，用于判断内容长度
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, ''); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g, ''); //去除多余空行
    str = str.replace(/ /ig, '');//去掉
    str = str.replace(/\t/g, '');
    str = str.replace(/&nbsp;/g, '');
    return str;
}