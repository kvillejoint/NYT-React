//Include server dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

//Require schema
const Article = require("./server/model/Article.js");

//Create express instance
let app = express();
//Set initial port for listener
let PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type:"application/vnd.api+json" }));

app.use(express.static("public"));
// -------------------------------------------------

// MongoDB Configuration configuration
//mongoose.connect('mongodb://localhost/nytreact');
mongoose.connect('mongodb://localhost/3000');
//For heroku deployment
//mongoose.connect("mongodb://kvillejoint:<dbpassword>@ds125994.mlab.com:25994/kvillejoint");

let db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});

// -------------------------------------------------

//Get route for non-API calls. These will be directed to react app and managed by react router
app.get("*", function(req,res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Get route for all saved articles
app.get('/api/saved', function(req, res) {

  Article.find({})
    .exec(function(err, doc){

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});

// Post route to add an article to saved list
app.post('/api/saved', function(req, res){

  let newArticle = new Article(req.body);
    console.log(req.body);
  newArticle.save(function(err, doc){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.json(doc);
    }
  });

});

//Delete route for articles in saved list by article url
app.delete("/api/saved", function(req, res){
  let url = req.param("url");
  Article.find({ url: url }).remove().exec(function(err) {
    if (err) {
      console.log(err);
    } 
    else {
    res.send("Article deleted.");
    }
  });
});

// -------------------------------------------------
//App listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});