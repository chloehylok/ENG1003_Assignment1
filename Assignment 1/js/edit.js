"use strict";
//name of documentation: edit.js
//purpose: has functions that enable user to make changes to clothing items

// Global code to retrieve data to be edited
let categoryIndex = localStorage.getItem(CATEGORY_KEY);
let itemIndex = localStorage.getItem(ITEM_KEY);
let item = inventory.getItem(categoryIndex,itemIndex);

// TODO: Task 5.2.1

    //retrieving values from the index page and pasting them in the edit page
    document.getElementById("editItemName").innerHTML = item._name;
    document.getElementById("editItemStock").innerHTML = item.stock;
    document.getElementById("editItemPrice").innerHTML = item.price;

//submit runs when the user clicks "submit" on the edit page, which will change the information on the main (index) page and update the local storage
function submit() 
//This function, "submit()", will run when the "submit" button is clicked on the "edit" page
{
    // TODO: Task 5.2.2

    //retrieving edited data (same variables from main.js have been used since this is a new function)
    let newItemName = document.getElementById("editedItemName").value;
    let newItemStock = document.getElementById("editedItemStock").value;
    let newItemPrice = document.getElementById("editedItemPrice").value;

    //checking edited values:
    //if the user has left an input blank, the system will assume the user does not want to make any changes to the information, so the original information will be retained
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

    //create a new ClothingItem based on the input values
    let updatedItem = new ClothingItem(newItemName, newItemStock, newItemPrice);

    //confirm submission
    if(confirm(`Are you sure you are done with your edit? :0`))
    {
        //updating inventory
        inventory.warehouse[categoryIndex].items[itemIndex] = updatedItem;

        //update LS
        updateLSData(WAREHOUSE_KEY, inventory);
        
        // return to index page
        window.location = "index.html";
    }
}

//cancel runs when the user clicks "cancel" on the edit page, which will ask for confirmation before returning the user to the main (index) page if the user wants to cancel the edit
function cancel()
{
    // TODO: Task 5.2.3
    //confirm cancellation
    if(confirm(`Are you sure you want to cancel your edit? :<`))
    {
        //return to index page
        window.location = "index.html";
    }
}