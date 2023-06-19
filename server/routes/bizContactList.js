let express = require('express');
let router = express.Router();
let mongoose =require('mongoose');

let passport = require('passport');

//connect to our bizContactListModel Model             ==============================check this one later if error take place.
let BizContact = require('../models/bizContactList');
const e = require('express');

//helper function for guard purposes
function requireAuth(req,res,next)
{
  //check if the user is logged in
  if(!req.isAuthenticated())
  {
    return res.redirect('/login');
  }
  next();
}

/* GET Route for the bizContactListModel List page - Read Operation*/
router.get('/', async (req, res) => {
  try {
    let bizContactList = await BizContact.find().sort({ username: 1 });
    // Rearrange names in alphabetical order
    bizContactList.sort((a, b) => a.username.localeCompare(b.username));
    res.render('bizContactList/list', {
      title: 'Business Contact List',
      ContactList: bizContactList,
      displayName: req.user ? req.user.displayName : '',
    });
  } catch (err) {
    console.error(err);
    // handle the error in an appropriate way, such as sending an error response
    res.status(500).send('Internal Server Error 1');
  }
});


 

 /* GET Route for displaying Add page - Create Operation*/
 router.get('/add',requireAuth, async (req, res) => {
  try {
    const bizContactList = await BizContact.find();
    res.render('bizContactList/add', { title: 'Add a Client',
    displayName : req.user ? req.user.displayName :'' });
  } catch (err) {
    console.error(err);
    // handle the error in an appropriate way, such as sending an error response
    res.status(500).send('Internal Server Error 2');
  }
});

  /* GET Route for processing Add page - Create Operation*/
  router.post('/add',requireAuth, async (req, res) => {
    try{
    let newUser = BizContact({
      "username":req.body.username,
      "phonenumber":req.body.phonenumber,
      "email":req.body.email,
      "age":req.body.age
    });

    await newUser.save();
    res.redirect('/biz-contact');
  } catch (err){
       console.log(err);
       res.status(500).send('Internal Server Error 3');
      }
});
     

/* POST Route for displaying the Edit page -UPDATE Operation*/

router.get('/edit/:id',requireAuth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const bizContactToEdit = await BizContact.findById(id);

    if (!bizContactToEdit) {
      res.status(404).send('Client not found');
      return;
    }

    res.render('bizContactList/edit', 
    { title: 'Edit User',
      ContactList: bizContactToEdit,
      displayName : req.user ? req.user.displayName :''
     });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error 4');
  }
});



/* POST Route for processing the Edit page -UPDATE Operation*/

router.post('/edit/:id',requireAuth, async(req,res,next) =>{
  try{
    let id= req.params.id;

    let updatedBizContact = {
      "username":req.body.username,
      "phonenumber":req.body.phonenumber,
      "email":req.body.email,
      "age":req.body.age
    };

    await BizContact.updateOne({_id:id},updatedBizContact);
    res.redirect('/biz-contact');
  }catch(err)
  {
    console.log(err);
    res.status(500).send(err);
  }
});

  

/* GET to perform Deletion - Delete Operation*/
router.get('/delete/:id',requireAuth,async(req,res)=>{
  try{
    let id = req.params.id;

    await BizContact.deleteOne({_id:id});
    res.redirect('/biz-contact');
  }catch (err){
    console.log(err);
    res.status(500).send(err);
  }
});


                                                 


module.exports = router;