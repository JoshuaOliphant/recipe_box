var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var ingredientIDGenerator = 100;
var recipeIDGenerator = 100;

//mongoose schemas defined 
var Recipes;
var Categories;
var Ingredients;

//connect to DB
var mongoDBConnection = require('./db.recipe_box.config');
console.log("DB connection at: " + mongoDBConnection.uri);
mongoose.connect(mongoDBConnection.uri);

//define and model schemas 
mongoose.connection.on('open', function () {
    var Schema = mongoose.Schema;
    var CategorySchema = new Schema(
        {
            categoryName: String,
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
        {collection: 'recipes'}
    );
    Recipes = mongoose.model('Recipes', RecipeSchema);

    var IngredientSchema = new Schema(
        {
            ingredientID: Number,
            quantity: Number,
            ingredient: String,
            caloriecount: Number
        },
        {collection: 'ingredients'}
    );
    Ingredients = mongoose.model('Ingredients', IngredientSchema);
    console.log('models have been created');
});

//Define functions with Mongoose queries that can then be called by the Express routes 
function retrieveCategories(res, query) {
    var query = Categories.find(query);
    query.exec(function (err, categoryArray) {
        res.json(categoryArray);
    });
}

function retrieveRecipesInCategory(res, query) {
    var query = Recipes.find(query);
    query.exec(function (err, recipeArray) {
        res.json(recipeArray);
    });
}

function retrieveRecipeData(res, query) {
    var query = Recipes.findOne(query);
    query.exec(function (err, recipeData) {
        res.json(recipeData);
    });
}

function retrieveIngredientData(res, query) {
    console.log("In retrieveIngredientData");
    var query = Ingredients.findOne(query);
    query.exec(function (err, ingredientData) {
        res.json(ingredientData);
    });
}

//static location of files
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//REST API routes 

//retrieve all categories
app.get("/categories", function (req, res) {
    console.log("Query for all categories");
    retrieveCategories(res, {});
});

//retrieve all recipes
//for testing 
/*
 app.get("/recipes", function(req, res) {
 console.log("Query for all recipes");
 retrieveRecipesInCategory(res, {});
 });*/

//retrieve a given ingredient 
app.get("/ingredientlist/:ingredientID", function (req, res) {
    var id = req.params.ingredientID;
    console.log("Query for ingredient: " + id);
    retrieveIngredientData(res, {ingredientID: id});
});

//retrieve all recipes in a given category 
app.get("/categories/:categoryID", function (req, res) {
    var id = req.params.categoryID;
    console.log("Query for category id: " + id);
    retrieveRecipesInCategory(res, {categoryID: id});
});

//retrieve all data for a given recipe
app.get("/recipeData/:recipeID", function (req, res) {
    var id = req.params.recipeID;
    console.log("Query for recipe id: " + id);
    retrieveRecipeData(res, {recipeID: id});
});

//create an ingredient in DB; currently allows duplicates 
app.post("/ingredientlist", function (req, res) {
    var jsonObj = req.body;
    console.log(jsonObj);
    jsonObj.ingredientID = ingredientIDGenerator;
    ingredientIDGenerator++;
    Ingredients.create(jsonObj, function (err) {
        if (err) {
            console.log('Ingredient creation failed');
        }
    });
    res.send(jsonObj);
});

//creates a new recipe 
app.post("/createrecipe", function (req, res) {
    console.log(req.body);
    var jsonObj = req.body;
    jsonObj.recipeID = recipeIDGenerator;
    recipeIDGenerator++;
    Recipes.create(jsonObj, function (err) {
        if (err) {
            console.log('Recipe initialization failed');
        }
    });
    res.send(jsonObj.recipeID.toString());
    console.log('Created: ' + jsonObj.recipeID);
});

//remove ingredient from DB
app.delete("/ingredientlist/:ingredientid", function(req, res) {
	var id = req.params.ingredientid;
	console.log("Removing ingredient: " + id);
	Ingredients.remove({ingredientId: id}, function(err) {
		if (err) 
		{
			console.log("Unable to remove ingredient");
		}
	});
});

app.listen(3000);
console.log("Server running on port 3000");