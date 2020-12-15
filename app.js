const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");

const app=express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  res.render("index");
});

app.post("/",function(req,res){

  var keyword = req.body.search;

  var url = "http://www.omdbapi.com/?s="+keyword+"&apikey=thewdb";

  // Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
	request(url,function(error,response,body) {
		if(!error && response.statusCode==200) {
			var data = JSON.parse(body);

			if(data.Response==="True") {
				res.render("results", {data:data});
			} else {
				res.render("error");
			}
		} else {
			res.render("error");
		}

	});
});

app.get("/result/:id",function(req,res){
  var id= req.params.id;
  var url="http://www.omdbapi.com/?i="+id+"&apikey=thewdb";

  request(url,function(error,response,body){
    if(!error && response.statusCode==200 ){
      var data= JSON.parse(body);
      if(data.Response==="True"){
        res.render("details",{data:data});
      }
      else{
        res.render("error");
      }
    }
    else {
      res.render("error");
    }
  });

});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server running on port 3000");
});
