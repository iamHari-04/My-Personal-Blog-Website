//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Hi This is my Personal Blog Website Please Add your Daily Blogs by composing it daily on Compose. Feel Free To Share your Blogs here";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let post = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render("home.ejs", {list1 : homeStartingContent, postList : post});       
});
app.get('/about', (req, res)=>{
  res.render("about.ejs", { list2 : aboutContent});
});
app.get('/contact', (req, res)=>{
  res.render("contact.ejs", { list3 : contactContent});
});
app.get('/compose', (req, res)=>{
  res.render("compose");
});


app.get('/posts/:postKey', (req, res)=>{
  post.forEach(element => {
    const searchPost = _.lowerCase(req.params.postKey);
    if(_.lowerCase(element['title']) === searchPost){
      res.render('post', {reqPost: element});
    }
    else{
      console.log('match not found');
    }
  });
  
});
app.post("/compose", function(req,res){  
  
  let composePost = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  post.push(composePost);
  res.redirect('/');
});
















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
