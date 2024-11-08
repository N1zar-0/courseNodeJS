"use strict";

function Review(ID,
                author,
                date,
                comment,
                serviceRating,
                priceRating,
                valueRating,
                qualityRating) {
    this.ID = ID;
    this.author = author;
    this.date = date;
    this.comment = comment;
    this.rating = {
        service: serviceRating,
        price: priceRating,
        value: valueRating,
        quality: qualityRating
    };
}

export default Review;