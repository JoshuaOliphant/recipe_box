var express = require('express');
var app = express();
/*var mongojs = require('mongojs');
var db = mongojs('ingredientlist', ['ingredientlist']);*/
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var jsonParser = bodyParser.json(); 
var ingredientIDGenerator = 100;
var recipeIDGenerator = 100;

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
		{collection: 'categories'} //collection similar to table in RDBMS
	);
	Categories = mongoose.model('Categories', CategorySchema);
	
	var RecipeSchema = new Schema(
		{
			recipeID: Number, 
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
function retrieveAllCategories(res) {
	var query = Categories.find({});
	query.exec(function(err, categoryArray) {
		res.json(categoryArray);
	});
}

//is this the correct syntax for requesting all recipes with categoryID equal to an ID passed in as 'ID'?
function retrieveRecipesInCategory(res, query) {
	var query = Recipes.find(query);
	query.exec(function(err, recipeArray) {
		res.json(recipeArray);
	});
}

function retrieveRecipeData(res, query) {
	var query = Recipes.findOne(query);
	query.exec(function(err, recipeData) {
		res.json(recipeData);
	});
}

//static location of files
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json()); //is this still necessary with var jsonParser defined above?

//retrieve all recipes in a category 
//can use ng-repeate in a view to display in category tab 
app.get("/category/:categoryID", function(req, res) {
	var id = req.params.categoryID;
	console.log("Query for category id: " + id);
	retrieveRecipesInCategory(res, {categoryID: id});
});

//retrieve all data for a recipe
//can use (nested?) ng-repeat in view to display on notecard
//shouldn't need a separate get for ingredients as this will also return an ingredient array
app.get("/recipeData/:recipeID", function(req, res) {
	var id = req.params.recipeID;
    console.log("Query for recipe id: " + id);
    retrieveRecipeData(res, {recipeID: id});
});

//add an ingredient to the DB
//currently will create duplicates in the DB 
app.post("/ingredientlist", function(req, res) {
    console.log(req.body);
	var jsonObj = req.body;
	jsonObj.ingredientID = ingredientIDGenerator;
	Ingredients.create([jsonOBJ], function(err) {
		if (err)
		{
			console.log('Ingredient creation failed');
		}
	});	
	res.send(ingredientIDGenerator.toString());
	ingredientIDGenerator++;
    })
});

//save recipe (should include saving all ingredients in recipe into the document)
app.post("/recipeData", function(req, res) {
	console.log(req.body);
	var jsonObj = req.body;
	jsonObj.recipeID = recipeIDGenerator;
	Recipes.create([jsonObj], function(err) {
		if (err) {
			console.log('recipe creation failed')
		}
	});
	res.send(recipeIDGenerator.toString());
	recipeIDGenerator++;
});

/*
//Update to remove an ingredient from a recipe
//need to send both the ingredient and recipe id to this function
//waiting up updat this until we have a better idea of the Angular used in the view 
app.delete("/ingredientlist/:recipeid/:ingredientid", function(req, res) {
    var recipeid = req.params.recipeid;
	var ingredientid = req.params.ingredientid;
    console.log("Removing: Recipe: " + recipeid + " Ingredient: " + ingredientid);
    Recipes.update({recipeID: recipeid}, {$pullAll: {ingredientIDs: ingredientid});
	res.send(ingredientID.toString());
});
*/


/*
//Not sure if these are necessary anymore 
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
*/

app.listen(3000);
console.log("Server running on port 3000");
