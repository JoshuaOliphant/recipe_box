var express = require('express');
var app = express();
/*var mongojs = require('mongojs');
var db = mongojs('ingredientlist', ['ingredientlist']);*/
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var jsonParser = bodyParser.json(); 

//mongoose schemas defined 

var Recipes;
var Categories;
var Ingredients;

var mongoDBConnection = require('db.config');
console.log(mongoDBConnection.uri);
 
mongoose.connect(mongoDBConnection.uri);
mongoose.connection.on('open', function() {
	var Schema = mongoose.Schema;
	var CategorySchema = new Schema(
		{
			categoryName: String
			categoryID: Number 
		},
		{collection: 'categories'}
	);
	Categories = mongoose.model('Categories', CategorySchema);
	
	var RecipeSchema = new Schema(
		{
			recipeName: String,
			categoryID: Number,
			recipeInstructions: String, 
			ingredientIDs: [{ingredientID: Number}]
		},
		{collection: 'recipes'};
	);
	Recipes = mongoose.model('Recipes', RecipeSchema);
	
	var IngredientSchema = new Schema(
		{
			ingredientName: String,
			ingredientID: Number,
			ingredientQuantity: Number,
			calorieCount: Number
		},
		{collection: 'ingredients'}
	);
	Ingredients = mongoose.model('Ingredients, IngredientSchema);
	console.log('models have been created);
});

//Define functions with Mongoose queries that can then
//be called by the Express routes 

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
