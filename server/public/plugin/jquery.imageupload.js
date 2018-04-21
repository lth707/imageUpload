(function ($) {
    $.fn.imageupload = function ($option) {
        //init dom
        var url = $option.url;
        var handleSuccess = $option.handleSuccess;
        var handleError = $option.handleError;
        var handleDelete = $option.handleDelete;
        var handleClick = $option.handleClick;
        var $this = $(this);
        $this.addClass('image-upload-filed')
        var $uploadbtn = $('<div class="upload-btn"><img src="./plugin/images/add_image.png"/>可拖图片上传</div>');
        var $tipmodal = $('<div class="tip-model"></div>');
        var $tip = $('<span class="tip"></span>');
        var tip_no_drag = "将图片拖拽到此区域上传"
        var tip_drag_over = "释放图标上传图片"
        var $imgul = $('<ul></ul>')
        $tipmodal.append($tip);
        $this
            .css({
                position: 'relative',
                minHeight: '200px'
            })
            .append($imgul)
            .append($uploadbtn)
            .append($tipmodal);
        var $fileupInput = $('<input type="file" multiple style="display:none" accept="image/*"/>')
        $uploadbtn.before($fileupInput)
        $this.on('dragover', handleDrag)
        $this.on('dragleave', handleNotDrag)
        $this.on('drop', handleDrop)
        // handle event
        document.addEventListener('dragleave', function (event) {
            $tipmodal.hide();
            event.preventDefault();
        }, true);
        document.addEventListener('dragenter', function (event) {
            handleNotDrag()
        }, true);
        document.addEventListener('dragover', function (event) {
            $tipmodal.show();
            event.preventDefault();
        }, true);
        document.addEventListener('drop', function (event) {
            $tipmodal.hide();
            event.preventDefault();
        }, true);
        $uploadbtn.click(function () {
            $fileupInput.trigger('click');
            return true;
        })
        $fileupInput.change(function () {
            uploadToServer(this.files)
            return false;
        })
        function setTipText(text) {
            $tip.text(text)
        }
        function handleDrag() {
            $tipmodal.show();
            setTipText(tip_drag_over);
        }
        function handleNotDrag() {
            $tipmodal.show();
            setTipText(tip_no_drag);
        }
        function handleDrop(event) {
            $tipmodal.hide();
            var originEvent = event.originalEvent;
            //拿到拽入的文件
            var files = originEvent.dataTransfer.files;
            uploadToServer(files);
            return false;
        }
        function isFunction(handle) {
            return handle && typeof handle === 'function';
        }
        function isArray(arr) {
            return arr && (arr instanceof Array);
        }
        function uploadToServer(files) {
            var formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                formData.append('files', files[i])
            }
            $.ajax({
                url: url,
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function (result) {
                    var urls = result.urls;
                    var ids = result.ids;
                    var errMsg = '';
                    if (!urls) {
                        errMsg = '必须返回urls参数';
                    }
                    if (!errMsg && !ids) {
                        errMsg = '必须返回ids参数';
                    }
                    if (!errMsg && !isArray(urls)) {
                        errMsg = 'urls参数必须是数组';
                    }
                    if (!errMsg && !isArray(ids)) {
                        errMsg = 'ids参数必须是数组';
                    }
                    if (!errMsg && ids.length != urls.length) {
                        errMsg = 'urls参数长度必须等于ids参数的长度';
                    }
                    if (errMsg) {
                        console.error(errMsg);
                        if (isFunction(handleError)) {
                            handleError(errMsg);
                        }
                        return false
                    }
                    for (var i = 0; i < urls.length; i++) {
                        $imgul.append($('<li><div class="img-div"><img src="' + urls[i] + '" data-id="' + ids[i] + '" class="open-img"/><a class="del-btn" data-id="' + ids[i] + '"></a></div></li>'))
                    }
                    if ($imgul.children().length) {
                        $uploadbtn.addClass('has-img')
                    }
                    if (isFunction(handleSuccess)) {
                        handleSuccess(result)
                    }
                },
                error: function (error) {
                    if (error) {
                        console.error(error)
                        if (isFunction(handleError)) {
                            handleError(error)
                        }
                    }
                }
            })
        }
        $imgul.on('click', '.del-btn', function () {
            var $this = $(this)
            $this.closest('li').remove()
            if (isFunction(handleDelete)) {
                handleDelete($this.data('id'))
            }
            if (!$imgul.children().length) {
                $uploadbtn.removeClass('has-img')
            }
        })
        $imgul.on('click', '.open-img', function () {
            var $this = $(this)
            if (isFunction(handleClick)) {
                handleClick($this.data('id'))
            }
        })
    }
})(jQuery)