var express = require('express');
var app = express();
var path = require("path");

var router = express.Router();
var bodyParser= require('body-parser');
var urlencode= bodyParser.urlencoded({extended:false})

// app.use(express.static(__dirname+"public"));
app.use(express.static(path.join(__dirname, 'public')))
router.route('/')
	.get(function(req,res){
		res.render('index',{title:'Express'})
	});

// router.route('/')
// 	.get(function(req,res){
// 		res.render('index',{title:'Express'})
// 	});

router.route('/test')
	.post(function(req,res){
		 var data = req.body;
		 res.send(data.name);
		// console.log(req.body);
	});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
