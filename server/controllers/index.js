let express = require('express');
let router = express.Router();

module.exports.displayHomePage = (req,res,next) =>{
    res.render('index',{title:'Home'});
}

module.exports.displayHomePage = (req,res,next) =>{
    res.render('index',{title:'About'});
}

module.exports.displayHomePage = (req,res,next) =>{
    res.render('index',{title:'Projects'});
}

module.exports.displayHomePage = (req,res,next) =>{
    res.render('index',{title:'Services'});
}

module.exports.displayHomePage = (req,res,next) =>{
    res.render('index',{title:'Contact'});
}