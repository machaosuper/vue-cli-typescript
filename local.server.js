var express = require('express');
// var config = require('./config/index');

var opn = require('opn');

var port = 9000;

var autoOpenBrowser = true


var app = express();

var router = express.Router();

router.get('/', function(req, res, next) {
    req.url = '/index.html';
    next();
});

app.use(router);



// // var appData = require('./data.json');
// // var seller = appData.seller;
// // var goods = appData.goods;
// // var ratings = appData.ratings;

// var apiRoutes = express.Router();

// apiRoutes.get('/seller', function(req, res) {
//     res.json({
//         errno: 0,
//         data: seller
//     });
// });

// apiRoutes.get('/goods', function(req, res) {
//     res.json({
//         errno: 0,
//         data: goods
//     });
// });

// apiRoutes.get('/ratings', function(req, res) {
//     res.json({
//         errno: 0,
//         data: ratings
//     });
// });

// app.use('/api', apiRoutes);


app.use(express.static('./dist'));


var uri = 'http://localhost:' + port

// devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
// })

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
