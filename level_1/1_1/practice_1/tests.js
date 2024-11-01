"use strict";

import Product from "./Product.js";
import Review from "./Review.js";
import {searchProducts, sortProducts} from "./functions.js";


function testSortProducts(products) {
    let sortRules = ["price", "ID", "name"];

    for (let i of sortRules) {
        products = sortProducts(products, i);

        console.log(`\nsort by ${i}:`);
        for (let product of products) {
            console.log(`Name: ${product.name}, ID: ${product.ID}, price: ${product.price}`);
        }
    }
}

function testSearchProducts(products) {
    let result = searchProducts(products, "T-shirt");
    console.log((result.length === 1 && result[0].name === "T-shirt") ? 'Test 1 pass': 'Test 1 failed');

    result = searchProducts(products, "Football");
    console.log(result.length === 2 ? 'Test 2 pass': 'Test 2 failed');

    result = searchProducts(products, "durable");
    console.log(result.length === 2 ? 'Test 3 pass': 'Test 3 failed');

    result = searchProducts(products, "Basketball");
    console.log(result.length === 0 ? 'Test 4 pass': 'Test 4 failed');

    result = searchProducts(products, "footb");
    console.log(result.length === 2 ? 'Test 5 pass': 'Test 5 failed');

    result = searchProducts(products, "warm");
    console.log((result.length === 1 && result[0].name === "Hoodie") ? 'Test 6 pass': 'Test 6 failed');
}


function testMethodsForSize(product) {
    console.log(product.getSizes());

    product.addSize("XXL");
    console.log("\nadd new size XXL: ");
    console.log(product.getSizes());

    product.deleteSize("L");
    console.log("\ndelete size L: ");
    console.log(product.getSizes());

    product.addSize("XXL");
    console.log("\ntry to add the same size XXL: ");
    console.log(product.getSizes());

    product.deleteSize("L");
    console.log("\ntry to delete size, which does not exist: ");
    console.log(product.getSizes());
}

function testMethodsForReview(product) {
    console.log("\nAll reviews: ");
    for (let review of Object.values(product.reviews)) {
        console.log(`Author: ${review.author}, ID: ${review.ID}`);
    }

    console.log("\nreview by ID 1");
    let review = product.getReviewByID("1");
    console.log(review);

    review = product.getReviewByID("0");
    console.log("\nreview by ID 0");
    console.log(review);
    console.log("Products rating: " + product.getAverageRating());

    console.log("\n add new review by ID 99");
    product.addReview(new Review("99", "Obama", new Date(), "test", 2, 2, 2, 2));
    console.log("Products rating: " + product.getAverageRating());


    console.log("\nAll reviews: ");
    for (let review of Object.values(product.reviews)) {
        console.log(`Author: ${review.author}, ID: ${review.ID}`);
    }


    console.log("\n delete review by ID 99");
    product.deleteReview("99");

    console.log("\nAll reviews: ");
    for (let review of Object.values(product.reviews)) {
        console.log(`Author: ${review.author}, ID: ${review.ID}`);
    }
}

let product1 = new Product(
    "1",
    "T-shirt",
    "Basic cotton T-shirt",
    19.99,
    "H&M",
    ["S", "M", "L", "XL"],
    "M",
    100,
    new Date("2024-10-03 12:00:00"),
    [
        new Review("1", "Alice", new Date("2021-10-28 09:30:00"), "Great quality!", 5, 4, 4, 5),
        new Review("2", "Bob", new Date("2022-11-29 10:15:00"), "Comfortable, but a bit large", 4, 3, 4, 5),
        new Review("3", "Barak", new Date("2024-01-29 10:15:00"), "Very bad", 1, 1, 2, 1)
    ],
    ["image1.jpg", "image2.jpg"]
);

let product2 = new Product(
    "2",
    "Jeans",
    "Slim-fit jeans",
    99.99,
    "BrandB",
    ["M", "L", "XL", "XXL"],
    "L",
    50,
    new Date("2024-09-15 08:00:00"),
    [
        new Review("4", "Charlie", new Date("2024-09-16 14:00:00"), "Perfect fit and style.", 5, 5, 5, 4),
        new Review("5", "Dave", new Date("2024-09-18 16:45:00"), "Good quality, but pricey.", 4, 3, 4, 4)
    ],
    ["jeans1.jpg", "jeans2.jpg"]
);

let product3 = new Product(
    "3",
    "Sneakers",
    "Comfortable running shoes",
    79.99,
    "Nike",
    ["XS", "S", "M", "L"],
    "S",
    200,
    new Date("2024-08-10 10:30:00"),
    [
        new Review("6", "Eve", new Date("2024-08-11 11:00:00"), "Best running shoes ever!", 5, 5, 5, 5),
        new Review("7", "Frank", new Date("2024-08-12 13:15:00"), "Very comfortable, great design.", 2, 4, 3, 5)
    ],
    ["sneakers1.jpg", "sneakers2.jpg"]
);


testMethodsForSize(product3);
testMethodsForReview(product1)

let arr = [product1, product2, product3];
testSortProducts(arr);

arr = [new Product("1", "T-shirt", "Comfortable cotton t-shirt", 19.99, "Brand A", ["S", "M"], "M", 100, new Date(), [], []),
    new Product("2", "Football", "Durable soccer ball", 29.99, "Brand B", ["S", "M", "L"], "L", 50, new Date(), [], []),
    new Product("3", "Tennis Racket", "Lightweight and durable", 49.99, "Brand C", ["M", "L", "XL"], "L", 30, new Date(), [], []),
    new Product("4", "Hoodie", "Warm hoodie for winter", 39.99, "Brand D", ["M", "L"], "M", 20, new Date(), [], []),
    new Product("5", "Football Socks", "High-quality football socks", 9.99, "Brand E", ["S", "M", "L"], "S", 150, new Date(), [], [])
]
testSearchProducts(arr);