let mongoose = require('mongoose');

//create a model class ; model is just a class
let bookModel = mongoose.Schema(
{
    name: String,
    author: String,
    published: String,
    description: String,
    price: Number
},
{
    collection:"books"  //point to which collection this is a table
});

module.exports = mongoose.model('Book',bookModel);