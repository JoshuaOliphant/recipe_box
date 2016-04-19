var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('ingredientlist', ['ingredientlist']);
var bodyParser = require('body-parser');


//static location of files
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/ingredientlist", function(req, res) {
    console.log("I received a GET request")
    db.ingredientlist.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post("/ingredientlist", function(req, res) {
    console.log(req.body);
    db.ingredientlist.insert(req.body, function(err, doc) {
        res.json(doc);
    })
});

app.delete("/ingredientlist/:id", function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.ingredientlist.remove({
        _id: mongojs.ObjectId(id)
    }, function(err, doc) {
        res.json(doc);
    });
});

app.get("/ingredientlist/:id", function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.ingredientlist.findOne({
        _id: mongojs.ObjectId(id)
    }, function(err, doc) {
        res.json(doc);
    });
});

app.put("/ingredientlist/:id", function(req, res) {
    var id = req.params.id;
    console.log(req.body.ingredient);
    db.ingredientlist.findAndModify({
        query: {
            _id: mongojs.ObjectId(id)
        },
        update: {
            $set: {
                quantity: req.body.quantity,
                ingredient: req.body.ingredient,
                caloriecount: req.body.caloriecount
            }
        },
        new: true
    }, function(err, doc) {
        res.json(doc);
    });
});

app.listen(3000);
console.log("Server running on port 3000");
