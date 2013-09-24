var express = require('express')
  , stylus = require('stylus'),
  partials = require('express3-partials'),
  nib = require('nib');

var app = express();
app.use(partials());
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
};
app.configure(function () {
        app.set('views', __dirname+ '/views');
        app.set('view engine', 'ejs');        
		app.use(express.bodyParser());
        app.use(app.router);
		app.use(stylus.middleware(
		  { src: __dirname + '/public'
		  , compile: compile
		  }
		));
		app.use(express.static(__dirname + '/public'));
});




app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
});
app.listen(3000);