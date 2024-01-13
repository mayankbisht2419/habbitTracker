const express = require("express");
const path = require("path");
const app= express();
const port = 8000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));;
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname,"views"));

var sno = 1;

var habbitList = [{
    "habbitId":sno++,
    "habbitName" : "Reading book",
    "status" : "DONE",
    "dateToday" :"1"
},
{
    "habbitId":sno++,
    "habbitName" : "Reading book 2",
    "status" : "TODO",
    "dateToday" :"3"
}];

app.get('/', function(req, res){
    return res.render("index" , {title : "Habbit Tracker" , data:habbitList});
});

app.post('/add-habbit', function(req, res){
    var obj ={
        "habbitId":sno++,
        "habbitName" : req.body.habbitName,
        "status" : "TODO",
        "dateToday" :req.body.day
    };
    habbitList.push(obj);
    return res.redirect("/");
});

app.post('/edit-habbit', function(req, res){
    console.log("edit habbit called");
    var obj ={
        "habbitId":req.body.habbitId,
        "habbitName" : req.body.habbitName,
        "status" : req.body.status,
        "dateToday" :req.body.day
    };
    for(let i in habbitList){
        if(habbitList[i].habbitId==req.body.habbitId){
            habbitList[i].status=req.body.status;
        }
    }
    return {"result":"success"};
});

app.listen(port, function(err){
    if(err){
        console.log('error starting the server');
    }
}); 