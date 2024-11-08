"use strict";

import AbstractProduct from "./AbstractProduct.js";

function Clothes(ID,
                 name,
                 description,
                 price,
                 brand,
                 quantity,
                 date,
                 reviews,
                 images,
                 material,
                 color) {
    AbstractProduct.call(this, ID, name, description, price, brand, quantity, date, reviews, images);
    this.material = material;
    this.color = color;
}

Clothes.prototype = Object.create(AbstractProduct.prototype);

Object.assign(Clothes.prototype, {
    getMaterial() {
        return this.material;
    },
    getColor() {
        return this.color;
    },

    setMaterial(material) {
        this.material = material;
    },
    setColor(color) {
        this.color = color;
    }

})

export default Clothes;