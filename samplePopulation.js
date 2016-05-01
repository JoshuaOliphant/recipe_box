db = db.getSiblingDB('MY_RECIPE_BOX')

db.createCollection('ingredients')
ingredientsCollection = db.getCollection('ingredients')
ingredientsCollection.remove({})
ingredientsCollection.insert(
{
	ingredientName: "Chicken Breast",
	ingredientID: 1,
	ingredientQuantity: 2,
	calorieCount: 100
}
);
ingredientsCollection.insert(
{
	ingredientName: "Olive Oil",
	ingredientID: 2,
	ingredientQuantity: 1,
	calorieCount: 100
}
);
ingredientsCollection.insert(
{
	ingredientName: "Broccoli",
	ingredientID: 3,
	ingredientQuantity: 2,
	calorieCount: 20
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