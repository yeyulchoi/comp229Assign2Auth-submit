let mongoose = require('mongoose');

//create a model class ; model is just a class
let bizContactListModel = mongoose.Schema(
{
    username: String,
    phonenumber: String,
    email: String,
    age: Number
    
},
{
    collection:"bizContacts"  //point to which collection this is a table
});

module.exports = mongoose.model('BizContact',bizContactListModel);