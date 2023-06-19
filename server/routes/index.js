let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let DB = require('../config/db');
//create the user Model instance
let userModel = require('../models/user');
let User = userModel.User; //alias



let posts =[];



/* GET home page. */




router.get('/', function(req, res, next) {
  res.render('content/home', {
     title: 'Home',
     posts:posts 
    
    }); 
  
});
// When router.get is triggered,   render/create the page index inside view folder ,it goes to index.ejs file ..

/* GET home page. */
//router.get('/home',indexController.displayHomePage);
router.get('/home', function(req, res, next) {
  res.render('content/home', {
     title: 'Home',
     posts:posts,
     displayName: req.user ? req.user.displayName: ''
    });  
});

/* GET about page. */
//router.get('/about',indexController.displayHomePage);

router.get('/about', function(req, res, next) {
  res.render('content/about', { 
  title: 'About Me',
  displayName: req.user ? req.user.displayName: ''
});     
});

/* GET Projects page. */
//router.get('/projects',indexController.displayHomePage);
router.get('/projects', function(req, res, next) {
  res.render('content/projects', {
     title: 'Projects',
     displayName: req.user ? req.user.displayName: ''
    });     
});

/* GET Services page. */
//router.get('/services',indexController.displayHomePage);
router.get('/services', function(req, res, next) {
  res.render('content/services', {
     title: 'Services',
     displayName: req.user ? req.user.displayName: ''
    });     
});


/* GET Contact page. */
//router.get('/contact',indexController.displayHomePage);
router.get('/contact', function(req, res, next) {
  res.render('content/contact', { 
    title: 'Contact Us',
    name: 'Yeyul Choi',
    email:'yeyulchoi@outlook.com',
    phone:'6479958585',
    displayName: req.user ? req.user.displayName: ''
  
  });     
});



/*POST method*/
router.post('/contact',function(req,res,next){
   const post ={
    fullname:req.body.fullname,
    contactNum:req.body.contactnumber,
    email:req.body.email,
    msg:req.body.message
  };

posts.push(post);

res.redirect('/home');
});
    




//=======================================
//for authentification

/*GET route for displaying the login page */

router.get('/login', async (req, res) => {
  try {
    // Check if the user is already logged in
    if (!req.user) {
      return res.render('auth/login', {
        title: "Login",
        messages: req.flash('loginMessage'),
        displayName: req.user ? req.user.displayName : ''
      });
    } else {
      return res.redirect('/');
    }
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/*POST Route for processingthe login page */
                                                        


router.post('/login', async (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, info) => {
      // server error?
      if (err) {
        return next(err);
      }
      // is there a user login error?
      if (!user) {
        req.flash('loginMessage', 'Authentication Failed');
        return res.redirect('/login');
      }
      req.login(user, (err) => {
        // server error?
        if (err) {
          return next(err);
        }
        return res.redirect('/biz-contact');
      });
    })(req, res, next);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

/*GET Route for displaying the Register page */
router.get('/register', (req, res) => {
  // Check if the user is not already logged in
  if (!req.user) {
    res.render('auth/register', {
      title: 'Register',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
  } else {
    return res.redirect('/');
  }
});


/*POST Route for processing the Register page */
    

router.post('/register', (req, res) => {
  // Instantiate a user object
  let newUser = new User({
    username: req.body.username,
    phonenumber: req.body.phonenumber,
    email: req.body.email,
    age:req.body.age,
    
   displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) 
    {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") 
      {
        req.flash('registerMessage', 'Registration Error: User Already Exists!');
        console.log('Error: User Already Exists!');
      }
      return res.render('auth/register', //to test should be auth/register
      {
        title: 'Register',
        messages: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName : ''
      });
    } else {
      // If no error exists, then registration is successful
      //redirect the user and authentificate them

      /* TO DO ; getting ready to convert to API
      res.json({success:true,msg:'User Registered Successfully!'})
      */
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/biz-contact');
      });
    }
  });
});

module.exports.processRegisterPage = (req, res, next) => {
  // This is a separate function. Implement your specific logic here if needed.
  // It is not related to the route handlers above.
};





/*GET to perform UserLogout */

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.redirect('/');
    }
    res.redirect('/');
  });
});







module.exports = router;
