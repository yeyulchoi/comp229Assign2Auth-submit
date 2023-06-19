let express = require('express');
let router = express.Router();
let mongoose =require('mongoose');

let passport = require('passport');

//connect to our Book Model             ==============================check this one later if error take place.
let Book = require('../models/book');
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

/* GET Route for the Book List page - Read Operation*/
router.get('/', async (req, res) => {
    try {
      let bookList = await Book.find();
      res.render('book/list', 
      {
         title: 'Books',
         BookList: bookList,
         displayName : req.user ? req.user.displayName :''
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
    const bookList = await Book.find();
    res.render('book/add', { title: 'Add a Book',
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
    let newBook = Book({
      "name":req.body.name,
      "author":req.body.author,
      "published":req.body.published,
      "description":req.body.description,
      "price":req.body.price
    });

    await newBook.save();
    res.redirect('/book-list');
  } catch (err){
       console.log(err);
       res.status(500).send('Internal Server Error 3');
      }
});
     

/* POST Route for displaying the Edit page -UPDATE Operation*/

router.get('/edit/:id',requireAuth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const bookToEdit = await Book.findById(id);

    if (!bookToEdit) {
      res.status(404).send('Book not found');
      return;
    }

    res.render('book/edit', 
    { title: 'Edit Book',
      book: bookToEdit,
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

    let updatedBook = {
      "_id":id,
      "name":req.body.name,
      "author":req.body.author,
      "published":req.body.published,
      "description":req.body.description,
      "price":req.body.price
    };

    await Book.updateOne({_id:id},updatedBook);
    res.redirect('/book-list');
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

    await Book.deleteOne({_id:id});
    res.redirect('/book-list');
  }catch (err){
    console.log(err);
    res.status(500).send(err);
  }
});


                                                 


module.exports = router;