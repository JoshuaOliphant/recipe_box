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
	recipeName: 'Chicken',
	categoryID: 1,
	recipeInstructions: 'Boil chicken',
	ingredientIDs: [{ingredientID: 1}]
}
);
recipeCollection.insert(
{
	recipeID: 2, 
	recipeName: 'Ferret treat',
	categoryID: 3,
	recipeInstructions: 'Put olive oil on ferret bellies',
	ingredientIDs: [{ingredientID: 2}]
}
);
recipeCollection.insert(
{
	recipeID: 3, 
	recipeName: 'Broccoli Snack',
	categoryID: 2,
	recipeInstructions: 'Boil broccoli until mostly cooked, then saute in olive oil for 5-10 minutes',
	ingredientIDs: [{ingredientID: 2}, {ingredientID: 3}]
}
);
recipeCollection.insert(
{
	recipeID: 4, 
	recipeName: 'Baked salmon',
	categoryID: 1,
	recipeInstructions: 'Line baking sheet with foil. Rub spices into salmon and allow to sit for 1 hour. Cook at 375 for 30 minutes.',
	ingredientIDs: [{ingredientID: 4}, {ingredientID: 5},{ingredientID: 6}, {ingredientID: 7}, {ingredientID: 8}]
}
);
