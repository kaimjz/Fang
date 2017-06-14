//图片上传预览    IE是用了滤镜。
//创建人：lwj
//时间：2015-7-15
function previewImage(file, width, heigth, divid, imgheadid, divhead) {
    var MAXWIDTH = width;
    var MAXHEIGHT = heigth;
    $("#" + divid).show();
    var div = document.getElementById(divid);
    if (file.files && file.files[0]) {

        div.innerHTML =" <img id="+imgheadid+">";
        var img = document.getElementById(imgheadid);
        img.onload = function () {

            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
            img.style.marginLeft = rect.left + 'px';
            img.style.marginTop = rect.top + 'px';
        }
        var reader = new FileReader();
        reader.onload = function (evt) { img.src = evt.target.result; }
        reader.readAsDataURL(file.files[0]);
    }
    else //兼容IE
    {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        //file.blur();
        preview.focus();
        var src = "";
        if (document.selection) {
            src = document.selection.createRange().text;
        } else {
            src = obj.value.substring(obj.selectionStart, obj.selectionEnd);
        }

        div.innerHTML = "<img id="+imgheadid+">";
        var img = document.getElementById(imgheadid);

        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = "";
        rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id=" + divhead + " style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";

    }
}
function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = { top: 0, left: 0, width: width, height: height };
    if (width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }

    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}