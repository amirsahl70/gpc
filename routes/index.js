var express = require('express');
var app = express();
var path = require("path");
var router = express.Router();

var multer = require('multer');
var upload = multer(); 

var bodyParser= require('body-parser');
var urlencode= bodyParser.urlencoded({extended:true})
app.use(bodyParser.json());

var session = require('express-session');
var cookieParser = require('cookie-parser');
router.use(cookieParser());
router.use(session({    secret: "secret key",
    proxy: true,
    resave: true,
    saveUninitialized: true}));


var Users = [];

router.use(express.static(path.join(__dirname, 'public')))

router.get('/signup', function(req, res){
   res.render('signup');
});



router.post('/signup', function(req, res){
   if(!req.body.id || !req.body.password){
      res.status("400");
      res.send("Invalid details!");
   } else {
      Users.filter(function(user){
         if(user.id === req.body.id){
            res.render('signup', {
               message: "User Already Exists! Login or choose another user id"});
         }
      });
      var newUser = {id: req.body.id, password: req.body.password};
      Users.push(newUser);
      req.session.user = newUser;
      res.redirect('/protected_page');
   }
});

function checkSignIn(req, res, next){
   if(req.session.user){
      next();     //If session exists, proceed to page
   } else {
      var err = new Error("Not logged in!");
      console.log(req.session.user);
      next(err);  //Error, trying to access unauthorized page!
   }
}

router.get('/protected_page', checkSignIn ,function(req, res,next){
   res.render('protected_page',{id:req.session.user.id})
});

router.get('/login', function(req, res){
   res.render('login');
});

router.post('/login', function(req, res){
   console.log(Users);
   if(!req.body.id || !req.body.password){
      res.render('login', {message: "Please enter both id and password"});
   } else {
      Users.filter(function(user){
         if(user.id === req.body.id && user.password === req.body.password){
            req.session.user = user;
            res.redirect('/protected_page');
         }else{

		    res.render('login', {message: "Invalid credentials!"});
         }
      });
   }
});

router.get('/logout', function(req, res){
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
});


router.route('/')
	.get(function(req,res){

	  // if(req.session.page_views){
   //    req.session.page_views++;
   //    res.send("You visited this page " + req.session.page_views + " times");
   // 	  } else {
   //    req.session.page_views = 1;
   //    res.send("Welcome to this page for the first time!");
   // 	  }



		res.render('index',{title:'Express'})
	});


router.route('/test')
	.post(function(req,res){
		 var data = req.body;
		 res.send(data.name);
	});

router.use('/protected_page', function(err, req, res, next){
console.log(err);
   //User should be authenticated! Redirect him to log in.
   res.redirect('/login');
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
