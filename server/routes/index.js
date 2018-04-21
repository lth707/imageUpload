var express = require('express');
var router = express.Router();
var fes = require('fs-extra');
var path = require('path')
var uploadDir = path.resolve(__dirname, '../public/imgupload');
fes.ensureDirSync(uploadDir)
var multiparty = require('connect-multiparty')({ uploadDir });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', multiparty, function (req, res, next) {
  if (req.files && req.files.files) {
    let urls = []
    if (!(req.files.files instanceof Array)) {
      req.files.files = [req.files.files]
    }
    let ids = [] //这里的id为后台生成的唯一id
    let id = 0
    for (let file of req.files.files) {
      urls.push(`http://${req.headers.host}/imgupload/${path.basename(file.path)}`)
      ids.push(++id)
    }
    res.json({ urls, ids })
  }
})
module.exports = router;
