"use strict";

function AbstractProduct(
    ID,
    name,
    description,
    price,
    brand,
    quantity,
    date,
    reviews,
    images
) {
    this.ID = ID;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.quantity = quantity;
    this.date = date;
    this.reviews = reviews;
    this.images = images;
}

Object.assign(AbstractProduct.prototype, {

    getID() {
        return this.ID;
    },
    getName() {
        return this.name;
    },
    getDescription() {
        return this.description;
    },
    getPrice() {
        return this.price;
    },
    getBrand() {
        return this.brand;
    },
    getQuantity() {
        return this.quantity;
    },
    getDate() {
        return this.date;
    },
    getReviews() {
        return this.reviews;
    },
    getImages() {
        return this.images;
    },

    setID(value) {
        this.ID = value;
    },
    setName(name) {
        this.name = name;
    },
    setDescription(description) {
        this.description = description;
    },
    setPrice(price) {
        this.price = price;
    },
    setBrand(brand) {
        this.brand = brand;
    },
    setQuantity(quantity) {
        this.quantity = quantity;
    },
    setDate(date) {
        this.date = date;
    },
    setReviews(reviews) {
        this.reviews = reviews;
    },
    setImages(images) {
        this.images = images;
    },


    getReviewByID(ID) {
        for (let review of this.reviews) {
            if (review.ID === ID) {
                return review;
            }
        }

        return null;
    },

    getImage(index = 0) {
        return this.images[index];
    },

    addReview(review) {
        this.reviews.push(review);
    },

    deleteReview(ID) {
        let review = this.getReviewByID(ID);
        if (review !== null) {
            let index = this.reviews.indexOf(review);
            this.reviews.splice(index, 1);
        }
    },

    getAverageRating() {
        let res = 0;

        for (let review of this.reviews) {
            for (let rating of Object.values(review.rating)) {
                res += rating;
            }
        }

        return res / (4 * this.reviews.length);
    },

    getFullInformation() {
        let res = "";

        for (let key in this) {
            if (typeof this[key] !== 'function') {
                res += key + " - " + this[key] + "\n";
            }
        }

        return res;
    },

    getPriceForQuantity(count) {
        return `$${this.price * count}`;
    },

    getterSetter(propertyName, value = undefined){

        if (!(propertyName in this) || typeof this[propertyName] === 'function'){
            console.log(`Property ${propertyName} does not exist`);
            return;
        }

        if (value === undefined ) {
            return this[propertyName];
        }

        this[propertyName] = value;
    }
})

export default AbstractProduct;