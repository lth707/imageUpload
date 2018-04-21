imageUpload可拖拽上传图片的jquery插件

# 开始使用

## 启动后台服务

``` shell
cd server
npm i
npm start
访问localhost:3000
```

## 前端引入插件的样式和js文件，注意jquery要先引入

``` html
<link href="./plugin/imageupload.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="./javascripts/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="./plugin/jquery.imageupload.js"></script>
```

## 使用插件

``` js
 $(function () {
    $('#upload-field').imageupload({
        url: '/upload', //上传图片的地址
        handleSuccess: function (result) {
            console.log(result); //上传图片成功的回调函数
        },
        handleError: function (error) {
            console.log(error); //上传图片失败的回调函数
        },
        handleClick: function (id) {
            console.log(id); //点击图片的回调函数
        },
        handleDelete: function (id) {
            console.log(id); //删除图片的回调函数
        }
    })
})
```

## 运行效果

