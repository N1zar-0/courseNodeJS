"use strict";

function Product(ID,
                 name,
                 description,
                 price,
                 brand,
                 sizes,
                 activeSize,
                 quantity,
                 date,
                 reviews,
                 images) {
    this.ID = ID;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = sizes;
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = date;
    this.reviews = reviews;
    this.images = images;

    this.getID = () => this.ID;
    this.getName = () => this.name;
    this.getDescription = () => this.description;
    this.getPrice = () => this.price;
    this.getBrand = () => this.brand;
    this.getSizes = () => this.sizes;
    this.getActiveSize = () => this.activeSize;
    this.getQuantity = () => this.quantity;
    this.getDate = () => this.date;
    this.getReviews = () => this.reviews;
    this.getImages = () => this.images;

    this.setID = (ID) => this.ID = ID;
    this.setName = (name) => this.name = name;
    this.setDescription = (description) => this.description = description;
    this.setPrice = (price) => this.price = price;
    this.setBrand = (brand) => this.brand = brand;
    this.setSizes = (sizes) => this.sizes = sizes;
    this.setActiveSize = (activeSize) => this.activeSize = activeSize;
    this.setQuantity = (quantity) => this.quantity = quantity;
    this.setDate = (date) => this.date = date;
    this.setReviews = (reviews) => this.reviews = reviews;
    this.setImages = (images) => this.images = images;


    this.getReviewByID = function (ID) {
        for (let review of this.reviews) {
            if (review.ID === ID) {
                return review;
            }
        }

        return null;
    }

    this.getImage = function (index = 0) {
        return this.images[index];
    }

    this.addSize = function (size) {
        if (!this.sizes.includes(size)) {
            this.sizes.push(size);
        }
    }

    this.deleteSize = function (size) {
        if (this.sizes.includes(size)) {
            let index = this.sizes.indexOf(size);
            this.sizes.splice(index, 1);
        }
    }

    this.addReview = function (review) {
        this.reviews.push(review);
    }

    this.deleteReview = function (ID) {
        let review = this.getReviewByID(ID);
        if (review !== null) {
            let index = this.reviews.indexOf(review);
            this.reviews.splice(index, 1);
        }
    }

    this.getAverageRating = function () {
        let res = 0;

        for (let review of this.reviews) {
            for (let rating of Object.values(review.rating)) {
                res += rating;
            }
        }

        return res / (4 * reviews.length);
    }
}

module.exports = Product;