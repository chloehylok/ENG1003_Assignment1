"use strict";
//name of documentation: shared.js
//purpose: to define classes that will be used in later JS files

// Predefined keys for LS
const CATEGORY_KEY = "currentCategoryIndex";
const ITEM_KEY = "currentItemIndex";
const WAREHOUSE_KEY = "warehouseData";

class ClothingItem
{
    // TODO: Task 1
    //constructor: all properties are private
    constructor(name = "", stock = 0, price = 0)
    {
        this._name = name;
        this._stock = stock;
        this._price = price;
    }

    //accessors: used to return values
    get name()
    {
        return this._name;
    }

    get stock()
    {
        return this._stock;
    }

    get price()
    {
        return this._price;
    }

    //mutators: used to change values
    set name(newName)
    {
        this._name = newName;
    }

    set price(newPrice)
    {
        this._price = newPrice;
    }

    set stock(newStock)
    {
        this._stock = newStock;
    }

    //method
    //fromData takes in data and restore it from local storage
    fromData(data)
    {
        this._name = data._name;
        this._stock = data._stock;
        this._price = data._price;
    }
}

class Inventory
{
    // TODO: Task 1
    //constructor: all properties are private
    constructor()
    {
        this._warehouse = [];
    }

    //accessor: used to retunr values
    get warehouse()
    {
        return this._warehouse;
    }

    //method
    //addCategory takes the parameter of "categoryName" and adds a new category to the warehouse array
    addCategory(categoryName)
    {
        //creating a new category object that contains the name of category & corresponding items
        let categoryObject = 
        {
           category: categoryName,
           items: []
        };
        //push the new object into the warehouse array
        this._warehouse.push(categoryObject);
    }

    //addItem takes the parameters "clothingItem" and "categoryIndex" then adds a clothing item to the warehouse array according to its category
    addItem(clothingItem, categoryIndex)
    {
        //check if clothingItem is a ClothingItem instance...
        if (clothingItem instanceof ClothingItem)
        {
            //adding clothing item into warehouse array, where categoryIndex indexs the category object in warehouse array
            this._warehouse[categoryIndex].items.push(clothingItem);
        };
    }

    //getItem takes the parameters "categoryIndex" and "itemIndex" and returns the corresponding clothing item from the warehouse array
    getItem(categoryIndex, itemIndex)
    {
        return this._warehouse[categoryIndex].items[itemIndex];
    }

    //fromData takes in data and restore it from local storage
    fromData(data)
    {
        this._warehouse = [];
        //looping over warehouse array
        for (let i = 0; i < data._warehouse.length; i++)
        {
            //creating an object for the category and items array
            let categoryObject =
            {
                category: data._warehouse[i].category,
                items: []
            };
            
            //looping & creating each item in object
            for (let j = 0; j < data._warehouse[i].items.length; j++)
            {
                let sampleClothingItem = new ClothingItem();
                sampleClothingItem.fromData(data._warehouse[i].items[j]);
                //pushing data into "category"
                categoryObject.items.push(sampleClothingItem);
            }
            
            //pushing "category" into the warehouse array
            this._warehouse.push(categoryObject);

        }
    }
}

/**
 * checkLSData function
 * Used to check if any data in LS exists at a specific key
 * @param {string} key LS Key to be used
 * @returns true or false representing if data exists at key in LS
 */
 function checkLSData(key)
 {
     if (localStorage.getItem(key) != null)
     {
         return true;
     }
     return false;
 }
 /**
  * retrieveLSData function
  * Used to retrieve data from LS at a specific key. 
  * @param {string} key LS Key to be used
  * @returns data from LS in JS format
  */
 function retrieveLSData(key)
 {
     let data = localStorage.getItem(key);
     try
     {
         data = JSON.parse(data);
     }
     catch(err){}
     finally
     {
         return data;
     }
 }
 /**
  * updateLSData function
  * Used to store JS data in LS at a specific key
  * @param {string} key LS key to be used
  * @param {any} data data to be stored
  */
 function updateLSData(key, data)
 {
     let json = JSON.stringify(data);
     localStorage.setItem(key, json);
 }
 // Global inventory variable
 let inventory = new Inventory();
 // Check if data available in LS before continuing
 if (checkLSData(WAREHOUSE_KEY))
 {
     // If data exists, retrieve it
     let data = retrieveLSData(WAREHOUSE_KEY);
     // Restore data into inventory
     inventory.fromData(data);
 }
