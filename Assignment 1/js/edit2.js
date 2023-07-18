"use strict";
// Global code to retrieve data to be edited
let categoryIndex = localStorage.getItem(CATEGORY_KEY);
let itemIndex = localStorage.getItem(ITEM_KEY);
let item = inventory.getItem(categoryIndex,itemIndex);

// TODO: Task 5.2.1
    /*
        1. Take values from item variable (above)
        2. display category, stock, and unit price in the edit page
    */

    //Updating value in index page:
    document.getElementById("editedItemName").value = item._name;
    document.getElementById("editedItemStock").value = item.stock;
    document.getElementById("editedItemPrice").value = item.price;


function submit()
{
    // TODO: Task 5.2.2

    //Retrieving edited data (same variables from main.js have been used since this is a new function)
    let newItemName = document.getElementById("editedItemName").value;
    let newItemStock = document.getElementById("editedItemStock").value;
    let newItemPrice = document.getElementById("editedItemPrice").value;

    //Create a new ClothingItem based on the input values
    let updatedItem = new ClothingItem(newItemName, newItemStock, newItemPrice);

    //Checking edited values:
    //If the user has made an edit, the code continues (and updates information)
    //If the user has not made any edits, the information from index page does not change
    if (newItemName == "")
    {
        newItemName = item._name; //Calling item variable from above

    }
    if (newItemStock == "")
    {
        newItemStock = item._stock;
    }
    if (newItemPrice == "")
    {
        newItemPrice = item._price;
    }

    // Confirm submission
    if(confirm(`Are you sure you are done with your edit? :0`))
    {
        // inventory.getItem(categoryIndex, itemIndex);
        inventory.warehouse[categoryIndex].items[itemIndex] = updatedItem;

        //update LS
        updateLSData(WAREHOUSE_KEY, inventory);
        
        // return to index page
        window.location = "index.html";
    }
}


function cancel()
{
    // TODO: Task 5.2.3
    // Confirm cancellation
    if(confirm(`Are you sure you want to cancel your edit? :<`))
    {
        // return to index page
        window.location = "index.html";
    }
}

