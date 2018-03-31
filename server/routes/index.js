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
    for (let file of req.files.files) {
      console.log(file.path)
      urls.push(`http://${req.headers.host}/imgupload/${path.basename(file.path)}`)
    }
    res.json({ urls })
  }
})
module.exports = router;
