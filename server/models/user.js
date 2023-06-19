// Require modules for the user model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(
    {
        username:
        {
            type:String,
            default:"",
            trim:true,
            required: 'username is required'
        },
       
        // password:  //because password is not saved as plain text but another form. but just in case....
        // {
        //     type:String,
        //     default:"",
        //     trim:true,
        //     required: 'password is required'
        // },
        phonenumber:
        {
         type:String,
         default:"",
         trim:true,
         required: 'phone number is required'
        },
       email:
       {
        type:String,
        default:"",
        trim:true,
        required: 'email address is required'
       },
       displayName:
       {
        type:String,
        default:"",
        trim:true,
        required: 'Display name is required'
       },
       created:
       {
        type:Date,
        default:Date.now
       },
       updated:
       {
        type:Date,
        default:Date.now
       }
    },
    {
        collection: "users"
    }
);

//configure options for user model

let options=({missingPasswordError: 'Wrong/Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);