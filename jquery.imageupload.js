(function ($) {
    $.fn.imageupload = function ($option) {
        //init dom
        var url = $option.url;
        var $this = $(this);
        $this.addClass('image-upload-filed')
        var $uploadbtn = $('<div class="upload-btn"></div>');
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
            uploadToServer(files)
        }
        function uploadToServer(files) {
            for (var i = 0; i < files.length; i++) {
                $imgul.append($('<li><img src="./image/add_image.png" /></li>'))
            }
        }
    }
})(jQuery)