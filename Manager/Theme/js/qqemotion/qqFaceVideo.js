// QQ表情插件
(function ($) {
    $.fn.qqFace = function (options) {

        var defaults = {
            id: 'facebox',
            path: 'face/',
            tip: 'em_'
        };

        var option = $.extend(defaults, options);
        var id = option.id;
        var path = option.path;
        var tip = option.tip;
        var type = option.type;


        //if($('#'+id).parent().siblings('textarea').length<=0){
        //	alert('缺少表情赋值对象。');
        //	return false;
        //}


        $(this).click(function (e) {
            $('#' + id).remove();//先清空所有的表情
            var strFace, labFace;
            //二级回复
            //专题12
            if (window.location.toString().indexOf("caowenxuan") != -1 && $(this).parent().siblings('input').length > 0) {

                strFace = '<div id="' + id + '" style="position:absolute;z-index:1000;margin-top:-199px; left:545px" class="qqFace">' +
                                  '<table border="0" cellspacing="0" cellpadding="0"><tr>';
                for (var i = 1; i <= 75; i++) {
                    labFace = '[' + tip + i + ']';
                    strFace += '<td><img src="' + path + i + '.gif" onclick="$(\'#' + id + '\').prev(\'li\').find(\'input\').setCaret();$(\'#' + id + '\').prev(\'li\').find(\'input\').insertAtCaret(\'' + labFace + '\');" /></td>';

                    if (i % 15 == 0) strFace += '</tr><tr>';
                }
                strFace += '</tr></table></div>';
                $(this).closest("li").after(strFace);


                $('#' + id).css('top', parseInt($(this).closest("li").offset().top, 10) + $(this).closest("li").scrollHeight + 100);
                $('#' + id).css('left', parseInt($("#hid_lefttwo").val(), 10));
                $('#' + id).show();
                e.stopPropagation();
                return;
            }
            //二级回复
            if ($(this).parent().siblings('input').length > 0) {

                strFace = '<div id="' + id + '" style="position:absolute;z-index:1000;margin-top:-199px;" class="qqFace">' +
                                  '<table border="0" cellspacing="0" cellpadding="0"><tr>';
                for (var i = 1; i <= 75; i++) {
                    labFace = '[' + tip + i + ']';
                    strFace += '<td><img src="' + path + i + '.gif" onclick="$(\'#' + id + '\').prev(\'li\').find(\'input\').setCaret();$(\'#' + id + '\').prev(\'li\').find(\'input\').insertAtCaret(\'' + labFace + '\');" /></td>';

                    if (i % 15 == 0) strFace += '</tr><tr>';
                }
                strFace += '</tr></table></div>';
                $(this).closest("li").after(strFace);


                $('#' + id).css('top', parseInt($(this).closest("li").offset().top, 10) + $(this).closest("li").scrollHeight + 100);
                $('#' + id).css('left', parseInt($("#hid_lefttwo").val(), 10));
            }

            //资源的评论
            if ($(this).closest('.boookytear_bt').siblings('.boookytear_tp').children('textarea').length > 0) {


                strFace = '<div id="' + id + '" style="position:absolute;margin-top:-133px;" class="qqFace">' +
                                 '<table border="0" cellspacing="0" cellpadding="0"><tr>';
                for (var i = 1; i <= 75; i++) {
                    labFace = '[' + tip + i + ']';
                    strFace += '<td><img src="' + path + i + '.gif" onclick="$(\'#' + id + '\').siblings(\'.boookytear_tp\').children(\'textarea\').setCaret();$(\'#' + id + '\').siblings(\'.boookytear_tp\').children(\'textarea\').insertAtCaret(\'' + labFace + '\');" /></td>';

                    if (i % 15 == 0) strFace += '</tr><tr>';
                }
                strFace += '</tr></table></div>';
                $(this).closest('.boookytear_bt').after(strFace);

                $('#' + id).css('top', parseInt($(this).closest(".boookytear").offset().top, 10));
                $('#' + id).css('left', parseInt($("#hid_left").val(), 10));
            }
            //专题12
            if (window.location.toString().indexOf("caowenxuan") != -1 && $(this).closest('.boookytear_bt').siblings('.boookytear_tp2').children('textarea').length > 0) {


                strFace = '<div id="' + id + '" style="position:absolute;margin-top:-133px;" class="qqFace">' +
                                 '<table border="0" cellspacing="0" cellpadding="0"><tr>';
                for (var i = 1; i <= 75; i++) {
                    labFace = '[' + tip + i + ']';
                    strFace += '<td><img src="' + path + i + '.gif" onclick="$(\'#' + id + '\').siblings(\'.boookytear_tp2\').children(\'textarea\').setCaret();$(\'#' + id + '\').siblings(\'.boookytear_tp2\').children(\'textarea\').insertAtCaret(\'' + labFace + '\');" /></td>';

                    if (i % 15 == 0) strFace += '</tr><tr>';
                }
                strFace += '</tr></table></div>';
                $(this).closest('.boookytear_bt').after(strFace);

                $('#' + id).css('top', "8320px");
                $('#' + id).css('left', "675px");
                $('#' + id).show();
                e.stopPropagation();
                return;
            }

            //专题10的评论
            if ($(this).closest('.boookytear_bt').siblings('.boookytear_tp2').children('textarea').length > 0) {


                strFace = '<div id="' + id + '" style="position:absolute;margin-top:-133px;" class="qqFace">' +
                                 '<table border="0" cellspacing="0" cellpadding="0"><tr>';
                for (var i = 1; i <= 75; i++) {
                    labFace = '[' + tip + i + ']';
                    strFace += '<td><img src="' + path + i + '.gif" onclick="$(\'#' + id + '\').siblings(\'.boookytear_tp2\').children(\'textarea\').setCaret();$(\'#' + id + '\').siblings(\'.boookytear_tp2\').children(\'textarea\').insertAtCaret(\'' + labFace + '\');" /></td>';

                    if (i % 15 == 0) strFace += '</tr><tr>';
                }
                strFace += '</tr></table></div>';
                $(this).closest('.boookytear_bt').after(strFace);

                $('#' + id).css('top', parseInt($(this).closest(".boookytear_bt").offset().top, 10) + 34);
                $('#' + id).css('left', parseInt($("#hid_left").val(), 10));
            }

            //一级回复
            //专题12
            if (window.location.toString().indexOf("caowenxuan") != -1 && $(this).parent().siblings('textarea').length > 0) {

                strFace = '<div id="' + id + '" style="position:absolute;" class="qqFace">' +
                                 '<table border="0" cellspacing="0" cellpadding="0"><tr>';
                for (var i = 1; i <= 75; i++) {
                    labFace = '[' + tip + i + ']';
                    strFace += '<td><img src="' + path + i + '.gif" onclick="$(\'#' + id + '\').prev(\'li\').find(\'.circle_back2\').children(\'textarea\').setCaret();$(\'#' + id + '\').prev(\'li\').find(\'.circle_back2\').children(\'textarea\').insertAtCaret(\'' + labFace + '\');" /></td>';

                    if (i % 15 == 0) strFace += '</tr><tr>';
                }
                strFace += '</tr></table></div>';
                $(this).closest("li").after(strFace);
                var hei = 0;
                if ($(this).closest("li").find(".add_img").length > 0) {
                    hei = $(this).closest("li").find(".add_img").height();
                }
                $('#' + id).css('top', parseInt($(this).closest("li").offset().top, 10) - 350 + hei);
                $('#' + id).css('left', "675px");
                $('#' + id).show();
                e.stopPropagation();
                return;
            }

            //一级回复
            if ($(this).parent().siblings('textarea').length > 0) {

                strFace = '<div id="' + id + '" style="position:absolute;" class="qqFace">' +
                                 '<table border="0" cellspacing="0" cellpadding="0"><tr>';
                for (var i = 1; i <= 75; i++) {
                    labFace = '[' + tip + i + ']';
                    strFace += '<td><img src="' + path + i + '.gif" onclick="$(\'#' + id + '\').prev(\'li\').find(\'.circle_back\').children(\'textarea\').setCaret();$(\'#' + id + '\').prev(\'li\').find(\'.circle_back\').children(\'textarea\').insertAtCaret(\'' + labFace + '\');" /></td>';

                    if (i % 15 == 0) strFace += '</tr><tr>';
                }
                strFace += '</tr></table></div>';
                $(this).closest("li").after(strFace);

                $('#' + id).css('top', parseInt($(this).closest("li").offset().top, 10) + $(this).closest("li").scrollHeight);
                $('#' + id).css('left', parseInt($("#hid_left").val(), 10));
            }


            //$(this).parent().append(strFace);
            //var offset = $(this).position();
            //var top = offset.top + $(this).outerHeight();
            //$('#'+id).css('top',top);
            //$('#'+id).css('left',offset.left-275);
            $('#' + id).show();
            e.stopPropagation();

        });

        $(document).click(function () {
            $('#' + id).hide();
            $('#' + id).remove();

        });
    };

})(jQuery);

jQuery.extend({
    unselectContents: function () {
        if (window.getSelection)
            window.getSelection().removeAllRanges();
        else if (document.selection)
            document.selection.empty();
    }
});
jQuery.fn.extend({
    selectContents: function () {
        $(this).each(function (i) {
            var node = this;
            var selection, range, doc, win;
            if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined') {
                range = doc.createRange();
                range.selectNode(node);
                if (i == 0) {
                    selection.removeAllRanges();
                }
                selection.addRange(range);
            } else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())) {
                range.moveToElementText(node);
                range.select();
            }
        });
    },

    setCaret: function () {
        if (!$.browser.msie) return;
        var initSetCaret = function () {
            var textObj = $(this).get(0);
            textObj.caretPos = document.selection.createRange().duplicate();
        };
        $(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret);
    },

    insertAtCaret: function (textFeildValue) {

        var textObj = $(this).get(0);
        if (document.all && textObj.createTextRange && textObj.caretPos) {
            var caretPos = textObj.caretPos;
            caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == '' ?
			textFeildValue + '' : textFeildValue;
        } else if (textObj.setSelectionRange) {
            var rangeStart = textObj.selectionStart;
            var rangeEnd = textObj.selectionEnd;
            var tempStr1 = textObj.value.substring(0, rangeStart);
            var tempStr2 = textObj.value.substring(rangeEnd);
            textObj.value = tempStr1 + textFeildValue + tempStr2;
            textObj.focus();
            var len = textFeildValue.length;
            textObj.setSelectionRange(rangeStart + len, rangeStart + len);
            textObj.blur();
        } else {
            textObj.value += textFeildValue;
        }
    }
});