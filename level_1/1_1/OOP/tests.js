"use strict";

import Electronics from "./Electronics.js";
import Clothes from "./Clothes.js";
import Review from "./Review.js";
import { searchProducts, sortProducts } from "./functions.js";

let review1 = new Review("1", "John", "2024-11-01", "Great product!", 5, 4, 5, 5);
let review2 = new Review("2", "Alice", "2024-11-02", "Not bad, could be cheaper.", 4, 3, 4, 3);

let product1 = new Electronics("1", "Laptop", "High-performance laptop", 1200, "BrandA", 10, "2024-10-15", [review1], ["image1.jpg"], 2, 45);
let product2 = new Electronics("2", "Phone", "Smartphone with amazing camera", 800, "BrandB", 50, "2024-10-10", [review2], ["image2.jpg"], 1, 10);
let product3 = new Clothes("3", "T-shirt", "Comfortable cotton T-shirt with logo", 20, "BrandC", 100, "2024-11-01", [review1, review2], ["image3.jpg"], "Cotton", "Red");

// Test getterSetter
console.log("Testing getterSetter method for Electronics:");
console.log(product1.getterSetter("price")); // expected  1200
product1.getterSetter("price", 1300);
console.log(product1.getterSetter("price")); // expected  1300

console.log("\nTesting getterSetter method for Clothes:");
console.log(product3.getterSetter("material")); // expected  "Cotton"
product3.getterSetter("material", "Silk");
console.log(product3.getterSetter("material")); // expected  "Silk"


// Test searchProducts
let products = [product1, product2, product3];

console.log("\nTesting searchProducts:");
let searchResult = searchProducts(products, "laptop");
console.log(searchResult); // expected [product1]

searchResult = searchProducts(products, "with");
console.log(searchResult); // expected [product2, product3]


// Test sortProducts
console.log("\nTesting sortProducts by price:");
let sortedByPrice = sortProducts(products, "price");
console.log(sortedByPrice.map(p => p.price)); // expected [20, 800, 1200]

console.log("\nTesting sortProducts by ID:");
let sortedByID = sortProducts(products, "ID");
console.log(sortedByID.map(p => p.ID)); // expected [1, 2, 3]

console.log("\nTesting sortProducts by name:");
let sortedByName = sortProducts(products, "name");
console.log(sortedByName.map(p => p.name)); // expected ["Laptop", "Phone", "T-shirt"]


// Test getPriceForQuantity(5)
console.log("\nTesting getPriceForQuantity:");
for (let product of products) {
    console.log("price: " +product.getPrice() + "price for 5 things " + product.getPriceForQuantity(5));
}

// Test getFullInformation
console.log("\nTesting getFullInformation:");
for (let product of products) {
    console.log(product.getFullInformation());
}