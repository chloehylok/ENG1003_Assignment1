"use strict";
//name of documentation: main.js
//purpose: has function files that enables user to add new clothing categories and items

/**
 * edit function
 * Runs when the edit button of an item is clicked.
 * Sends the user to the edit page after storing the information necessary
 * @param {number} category category index in inventory
 * @param {number} item item index in inventory
 */
function edit(category,item)
{
    // store data in LS
    localStorage.setItem(CATEGORY_KEY,category);
    localStorage.setItem(ITEM_KEY,item);
    // redirect to edit page
    window.location = "edit.html";
}
/**
 * addClothingCategory function
 * Runs when 'Add Category' is clicked on the header nav bar.
 * Creates a new category, saves it in LS and updates the display
 */
function addClothingCategory()
{
    // Get category name
    let newCategory = prompt("Name of new category?");
    // if user clicks cancel
    if(newCategory == null)
    {
        return;
    }
    // Try again if empty input
    while (newCategory == "")
    {
        alert("That input is invalid");
        newCategory = prompt("Name of new category?");
    }
    // Confirm add category
    if(confirm(`Confirm to add ${newCategory} as a category?`))
    {
        // add to inventory
        inventory.addCategory(newCategory);
        // update LS
        updateLSData(WAREHOUSE_KEY, inventory);
        // update display
        displayInventory(inventory);
    }
}
/**
 * cancelAddClothingItem function
 * Runs when the cancel button is clicked inside the dialog polyfill.
 * Closes the dialog box.
 */
function cancelAddClothingItem()
{
    // close dialog box
    dialog.close();
}

//"addClothingItem" allows users to add new clothing item by pressing the "Add Clothing Item" button in the main (index) page
function addClothingItem()
{
    // TODO: Task 2

    //resetting dialog box inputs to empty string values
    let newItemName = document.getElementById("newItemName");
    newItemName.value = "";
    let newItemStock = document.getElementById("newItemStock");
    newItemStock.value = "";
    let newItemPrice = document.getElementById("newItemPrice");
    newItemPrice.value = "";

    //create a constant that extracts values from the warehouse array
    const items = inventory.warehouse;
    let selectRef = document.getElementById("newItemCategory");
    let output = `<option value = "0"></option>`;

    //create a loop that will loop through all items in the warehouse, extract each category, and paste them in the dropdown menu
    for (let i = 0; i < items.length; i++)
    {
        output += `<option value="${i}">${items[i].category}</option>`;
    }
    selectRef.innerHTML = output;

    //display dialog box to user
    dialog.showModal();
}

//displayInventory displays the information of the current inventory onto the main (index) page
function displayInventory(inventory) 
{
    // TODO: Task 3
    //creating an empty string for the output 
    let output = "";

    //creating a constant value that has the information from the warehouse array
    const warehouseArray = inventory.warehouse;
    
    //creating a for loop that will output the input values from Task 2
    for (let i = 0; i < warehouseArray.length; i++) 
    {
        output += `<div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone">
        <h3>${warehouseArray[i].category}</h3>
        <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
            <thead>
                <tr>
                <th class="mdl-data-table__cell--non-numeric">Item</th>
                <th>Stock</th>
                <th>Unit Price</th>
                <th>Actions</th>
                </tr>
            </thead>
          <tbody>`;
        for (let j = 0; j < warehouseArray[i].items.length; j++) 
        {
          output += `<tr>
                        <td class="mdl-data-table__cell--non-numeric">${warehouseArray[i].items[j].name}</td>
                        <td>${warehouseArray[i].items[j].stock}</td>
                        <td>$${warehouseArray[i].items[j].price}</td>
                        <td><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button" onclick="edit(${i},${j})">Edit</button></td>
                    </tr>`;
        }
        output += `</tbody>
                        </table></div></div>`;
    }
     
    //inventory is displayed using innerHTML attribute with the id "inventoryContainer"
    document.getElementById("inventoryContainer").innerHTML = output;
}

//confirmAddClothingItem runs when the user clicks "add" inside the dialog box, which will then add and update the local storage with the new clothing item
function confirmAddClothingItem() //This function allows the user to confirm and add a clothing item
{
    // TODO: Task 4

    //retrieving input values for newItemName, newItemStock, newItemPrice, and newItemCategory
    //same variables can be used since this is a different function to addClothingItem
    let newItemName = document.getElementById("newItemName").value;
    let newItemStock = document.getElementById("newItemStock").value;
    let newItemPrice = document.getElementById("newItemPrice").value;

    //create a new ClothingItem based on the input values
    let clothingItem = new ClothingItem(newItemName, newItemStock,newItemPrice);

    //adding new clothing item into the inventory
    let categoryIndex = document.getElementById("newItemCategory").value;
    inventory.addItem(clothingItem,categoryIndex);
    
    //update LS
    updateLSData(WAREHOUSE_KEY, inventory);

    //calling the displayInventory function to display the new information
    displayInventory(inventory);

    //closing dialog
    dialog.close();
    
}

// Global code
// Registers the dialog box polyfill
let dialog = document.getElementById("addDialog");
if (!dialog.showModal) 
{
    dialogPolyfill.registerDialog(dialog);
}
// Displays the warehouse inventory when the page loads
displayInventory(inventory);