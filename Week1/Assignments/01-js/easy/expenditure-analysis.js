/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let categoryTotals = {};

  // Iterate through transactions
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    
    // Check if the category already exists in categoryTotals
    if (categoryTotals.hasOwnProperty(transaction.category)) {
      // If the category exists, add the price to its total
      categoryTotals[transaction.category] += transaction.price;
    } else {
      // If the category doesn't exist, create a new entry with the price
      categoryTotals[transaction.category] = transaction.price;
    }
  }
  console.log(categoryTotals);

  // Convert categoryTotals object into the desired array format
  const result = [];
  for (const category in categoryTotals) {
    if (categoryTotals.hasOwnProperty(category)) {
      result.push({ category: category, totalSpent: categoryTotals[category] });
    }
  }
  console.log("result : "+ result)
  return result;
}




module.exports = calculateTotalSpentByCategory;
