var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

var ingredientIDGenerator = 100;
var recipeIDGenerator = 100;

//mongoose schemas defined 
var Recipes;
var Categories;
var Ingredients;


// app.set('port', process.env.PORT || 8080); //3000);

var FACEBOOK_APP_ID = '258167231203399';
var FACEBOOK_APP_SECRET = '6c8c9d00d4480e6704a39b3d3e0829a0';

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(id, done){
    Accounts.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use(new FacebookStrategy({

        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:8080/auth/facebook/callback",
        profileFields: ['email', 'name']
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            Accounts.findOne({email: profile.emails[0].value}, function(err, user){
                if(err)
                    return done(err);
                if(user)
                {
                    console.log("found user is: "+ user);

                    return done(null, user);

                }
                else {
                    var newUser = new Accounts();
                    //newUser.facebookid = profile.id;

                    newUser.facebooktoken = accessToken;
                        newUser.firstName = profile.name.givenName;
                    console.log("newUser.firstName "+ newUser.firstName);
                    newUser.lastName  = profile.name.familyName;
                    //newUser.dob = profile.birthday;
                    console.log("test1 here pls first.. 1 ..");
                    newUser.email = profile.emails[0].value;
                    //newUser.facebook.photo = 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';

                    newUser.save(function(err){
                        if(err){
                            throw err;
                        }
                        console.log("newuser is: "+ newUser);
                        return done(null, newUser);
                    })
                    console.log("profile is: "+ profile);
                }
            });
        });
    }
));

app.get('/auth/facebook', passport.authenticate("facebook", {scope: ['email']}),
    function(req,res){

    });

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/client/views/login.html' }),
    function(req, res){
        console.log("auth newuser is: "+ req.user.email);
        console.log("req.session.passport.user: "+ req.session.passport.user._id);

        console.log("is auth: ? "+ req.isAuthenticated());
        /*if(req.isAuthenticated()){
         var isloogedin = true;
         }*/
        res.redirect('http://localhost:8080/#/mySets');

        //res.json(newUser.email);
        //res.json(newUser);
    });

app.get('/fbsessionurl', function(req, res){
    console.log("Inside server side fb session call url !!!");

    Accounts.find({_id: req.session.passport.user._id}, function(err, found){
        if(err)
            res.send(err);
        else
            res.json(found);
    });
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');

});




//connect to DB
var mongoDBConnection = require('./db.recipe_box.config');
console.log("DB connection at: " + mongoDBConnection.uri);
mongoose.connect(mongoDBConnection.uri);

//define and model schemas 
mongoose.connection.on('open', function () {
    var Schema = mongoose.Schema;
	
	//first attempt at a user schema 
	var UserSchema = new Schema(
		{
			userID: Number,
			email: String,
			userName: String,
			hashed_pwd: String
		}
	);
	Users = mongoose.model('Users', UserSchema);
	
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
            ingredientIDs: [{ingredientID: Number}],
			userID: Number 
        },
        {collection: 'recipes'}
    );
    Recipes = mongoose.model('Recipes', RecipeSchema);

    var IngredientSchema = new Schema(
        {
            ingredientID: Number,
            quantity: Number,
			units: String,
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

function retrieveCategoryData(res, query) {
    var query = Categories.findOne(query);
    query.exec(function (err, categoryData) {
        res.json(categoryData);
    });
}

function retrieveUsers(res, query) {
    var query = Users.find(query);
    query.exec(function (err, userArray) {
        res.json(userArray);
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

app.get("/categoryName/:categoryID", function (req, res) {
	var id = req.params.categoryID;
    console.log("Query for category id: " + id);
    retrieveCategoryData(res, {categoryID: id});
});

//retrieve a given ingredient 
app.get("/ingredientlist/:ingredientID", function (req, res) {
    var id = req.params.ingredientID;
    console.log("Query for ingredient: " + id);
    retrieveIngredientData(res, {ingredientID: id});
});

//retrieve user list for demonstration
app.get("/users", function (req, res) 
{
	console.log("Query for all users");
	retrieveUsers(res, {});
});

//retrieve all recipes in a given category 
app.get("/categories/:categoryID/:userID", function (req, res) {
    var catID = req.params.categoryID;
	var uID = req.params.userID;
    console.log("Query for category id: " + catID + " and for user id: " + uID);
    retrieveRecipesInCategory(res, {categoryID: catID, userID: uID});
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
	console.log(jsonObj);
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
			console.log(err);
        }
    });

    res.send(jsonObj.recipeID.toString());
    console.log('Created: ' + jsonObj.recipeID);
});

//remove ingredient from DB
app.delete("/ingredientlist/:ingredientid", function(req, res) {
	var id = req.params.ingredientid;
	console.log("Removing ingredient: " + id);
	Ingredients.remove({ingredientID: id}, function(err) {
		if (err) 
		{
			console.log("Unable to remove ingredient");
		}
	});
	res.send(id);
});

//remove recipe from DB                  
app.delete("/recipe/:recipeID", function(req, res) {
	var id = req.params.recipeID;
	console.log("Removing recipe: " + id);
	Recipes.remove({recipeID: id}, function(err) {
		if (err) 
		{
			console.log("Unable to remove recipe");
		}
	});
	res.send(id);
});

//update existing recipe
app.post("/updaterecipe", function(req, res) {
	var id = req.body.recipeID;
	console.log("Updating recipe " + id);
	var recipeName = req.body.recipeName;
	var categoryID = req.body.categoryID;
	var recipeInstructions = req.body.recipeInstructions;
	var ingredientIDs = req.body.ingredientIDs;
	var options = {new: false};
	var update = {recipeName, categoryID, recipeInstructions, ingredientIDs};
	console.log(update);
	Recipes.findOneAndUpdate({recipeID: id}, update, options, function(err) {
		if (err)
		{
			console.log("Unable to update");
			console.log(err);
		}
	});
	res.send(update);
});

// var port;
// if(process.env.port)
//     port = process.env.port;
// else
//     port = 3000;
//
// var server = app.listen(port, function () {
//     var host = server.address().address;
//
//     console.log('App listening at http://%s:%s', host, port);
// });
// module.exports = server;
// var port;
if(process.env.port)
    port = process.env.port;
else
    port = 8080;
app.listen(port);

console.log("Server running on port 3000");