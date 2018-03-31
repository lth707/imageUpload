imageUpload可拖拽上传图片的jquery插件

#开始使用
##启动后台服务
``
cd server
npm i
npm start
``
##前端引入插件的样式和js文件，注意jquery要先引入
  ``
  <link href="./plugin/imageupload.css" rel="stylesheet" type="text/css" />
  <script type="text/javascript" src="./javascripts/jquery-3.3.1.min.js"></script>
  <script type="text/javascript" src="./plugin/jquery.imageupload.js"></script>
  ``

##使用插件
    ``
    $(function () {
        $('#upload-field').imageupload({ url: '/upload' })
    })
    ``
##运行效果

