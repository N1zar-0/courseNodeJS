"use strict";

function isSubstring(mainStr, subStr) {
    return mainStr.toLowerCase().includes(subStr.toLowerCase());
}

function searchProducts(products, search) {
    let arr = [];

    for (let i of products) {
        if (isSubstring(i.name, search) || isSubstring(i.description, search)) {
            arr.push(i);
        }
    }

    return arr;
}

function sortProducts(products, sortRule) {
    switch (sortRule) {
        case "price":
            return products.sort((a, b) => a.price - b.price);
        case "ID":
            return products.sort((a, b) => a.ID.localeCompare(b.ID));
        case "name":
            return products.sort((a, b) => a.name.localeCompare(b.name));
        default:
            console.log(`Unknown sort rule: ${sortRule}`);
            return products;
    }
}

export { searchProducts, sortProducts };