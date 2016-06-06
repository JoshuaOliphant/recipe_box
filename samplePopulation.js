db = db.getSiblingDB('MY_RECIPE_BOX')
//db = db.getSiblingDB('myrecipebox')

db.createCollection('users')
usersCollection = db.getCollection('users')
usersCollection.remove({})
usersCollection.insert(
{
	userID: 1,
	email: 'stromb@seattleu.edu',
	userName: 'Bailey',
	hashed_pwd: 'abcd'
});
usersCollection.insert(
{
	userID: 2,
	email: 'trimachij@seattleu.edu',
	userName: 'Justin',
	hashed_pwd: 'efgh'
});
usersCollection.insert(
{
	userID: 3,
	email: 'oliphantj@seattleu.edu',
	userName: 'Josh',
	hashed_pwd: 'ijkl'
}
);

db.createCollection('accounts')
Accounts = db.getCollection("accounts")

db.createCollection('ingredients')
ingredientsCollection = db.getCollection('ingredients')
ingredientsCollection.remove({})
ingredientsCollection.insert(
{
	ingredient: "Chicken Breast",
	ingredientID: 1,
	quantity: 1,
	units: "lbs",
	caloriecount: 100
}
);
ingredientsCollection.insert(
{
	ingredient: "Olive Oil",
	ingredientID: 2,
	quantity: 1,
	units: "tbsp",
	caloriecount: 100
}
);
ingredientsCollection.insert(
{
	ingredient: "Broccoli",
	ingredientID: 3,
	quantity: 2,
	units: "cups",
	caloriecount: 20
}
);
ingredientsCollection.insert(
{
	ingredient: "Salmon",
	ingredientID: 4,
	quantity: 4,
	units: "oz",
	caloriecount: 300
}
);
ingredientsCollection.insert(
{
	ingredient: "Lemon pepper",
	ingredientID: 5,
	quantity: 1,
	units: "tsp",
	caloriecount: 1
}
);
ingredientsCollection.insert(
{
	ingredient: "Thyme",
	ingredientID: 6,
	quantity: 1,
	units: "tsp",
	caloriecount: 5
}
);
ingredientsCollection.insert(
{
	ingredient: "Onion powder",
	ingredientID: 7,
	quantity: 1,
	units: "tsp",
	caloriecount: 5
}
);
ingredientsCollection.insert(
{
	ingredient: "Garlic powder",
	ingredientID: 8,
	quantity: 1,
	units: "tsp",
	caloriecount: 5
}
);
ingredientsCollection.insert(
{
	ingredient: "Butternut squash",
	ingredientID: 9,
	quantity: 1,
	units: "each",
	caloriecount: 400
}
);
ingredientsCollection.insert(
{
	ingredient: "Baby red potatoes",
	ingredientID: 10,
	quantity: 6,
	units: "each",
	caloriecount: 600
}
);
ingredientsCollection.insert(
{
	ingredient: "Sage",
	ingredientID: 11,
	quantity: 1,
	units: "tsp",
	caloriecount: 5
}
);
ingredientsCollection.insert(
{
	ingredient: "Ice cream",
	ingredientID: 12,
	quantity: 1,
	units: "cup",
	caloriecount: 250
}
);
ingredientsCollection.insert(
{
	ingredient: "Rainbow sprinkles",
	ingredientID: 13,
	quantity: 1,
	units: "tbsp",
	caloriecount: 50
}
);
ingredientsCollection.insert(
{
	ingredient: "Yukon gold potatoes",
	ingredientID: 14,
	quantity: 0.5,
	units: "lb",
	caloriecount: 500
}
);
ingredientsCollection.insert(
{
	ingredient: "Yukon gold potatoes",
	ingredientID: 15,
	quantity: 1,
	units: "tbsp",
	caloriecount: 200
}
);

db.createCollection('categories')
categoryCollection = db.getCollection('categories')
categoryCollection.remove({})
categoryCollection.insert(
{
	categoryName: 'Entrees',
	categoryID: 1 
}
);
categoryCollection.insert(
{
	categoryName: 'Sides',
	categoryID: 2
}
);
categoryCollection.insert(
{
	categoryName: 'Desserts',
	categoryID: 3
}
);

db.createCollection('recipes')
recipeCollection = db.getCollection('recipes')
recipeCollection.remove({})
recipeCollection.insert(
{
	recipeID: 1, 
	recipeName: 'Boiled chicken.',
	categoryID: 1,
	recipeInstructions: 'Boil chicken for 30 minutes. Serve with brown rice if desired.',
	ingredientIDs: [{ingredientID: 1}],
	userID: 1
}
);
recipeCollection.insert(
{
	recipeID: 4, 
	recipeName: 'Baked salmon',
	categoryID: 1,
	recipeInstructions: 'Line baking sheet with foil. Rub spices into salmon and allow to sit for 1 hour. Cook at 375 for 30 minutes.',
	ingredientIDs: [{ingredientID: 4}, {ingredientID: 5},{ingredientID: 6}, {ingredientID: 7}, {ingredientID: 8}],
	userID: 2
}
);
recipeCollection.insert(
{
	recipeID: 5, 
	recipeName: 'Butternut Squash Chicken',
	categoryID: 1,
	recipeInstructions: 'Rub chicken with sage and place in pan. Chop squash and potatoes and toss with olive oil, sage, and thyme. Cover chicken and bake at 400 for an hour.',
	ingredientIDs: [{ingredientID: 1}, {ingredientID: 2},{ingredientID: 6}, {ingredientID: 9}, {ingredientID: 10}, {ingredientID: 11}],
	userID: 3
}
);
recipeCollection.insert(
{
	recipeID: 2, 
	recipeName: 'Ferret treat',
	categoryID: 3,
	recipeInstructions: 'Put olive oil on ferret bellies',
	ingredientIDs: [{ingredientID: 2}],
	userID: 1 
}
);
recipeCollection.insert(
{
	recipeID: 6, 
	recipeName: 'Ice cream with sprinkles',
	categoryID: 3,
	recipeInstructions: 'Scoop copious amounts of ice cream into a bowel; cover with sprinkles.',
	ingredientIDs: [{ingredientID: 12}, {ingredientID: 13}],
	userID: 3
}
);
recipeCollection.insert(
{
	recipeID: 7, 
	recipeName: 'Ice cream WITHOUT sprinkles',
	categoryID: 3,
	recipeInstructions: 'Scoop copious amounts of ice cream into a bowel; DO NOT cover in sprinkles.',
	ingredientIDs: [{ingredientID: 12}],
	userID: 2
}
);
recipeCollection.insert(
{
	recipeID: 3, 
	recipeName: 'Broccoli Snack',
	categoryID: 2,
	recipeInstructions: 'Boil broccoli until mostly cooked, then saute in olive oil for 5-10 minutes',
	ingredientIDs: [{ingredientID: 2}, {ingredientID: 3}],
	userID: 1
}
);
recipeCollection.insert(
{
	recipeID: 8, 
	recipeName: 'Roasted Red Potatoes',
	categoryID: 2,
	recipeInstructions: 'Chop red potatoes and toss in olive oil, sage, and thyme. Wrap in foil and bake at 350 for 30 minutes.',
	ingredientIDs: [{ingredientID: 6}, {ingredientID: 10},{ingredientID: 11}],
	userID: 2
}
);
recipeCollection.insert(
{
	recipeID: 9, 
	recipeName: 'Mashed Potatoes',
	categoryID: 2,
	recipeInstructions: 'Boil potatoes for 40 minutes. Peel and mash until almost smooth. Add melted butter and continue to mash. Serve hot.',
	ingredientIDs: [{ingredientID: 14}, {ingredientID: 15}],
	userID: 3
}
);

