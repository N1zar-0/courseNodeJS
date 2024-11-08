"use strict";

import AbstractProduct from "./AbstractProduct.js";

function Electronics(ID,
                     name,
                     description,
                     price,
                     brand,
                     quantity,
                     date,
                     reviews,
                     images,
                     warranty,
                     power) {
    AbstractProduct.call(this, ID, name, description, price, brand, quantity, date, reviews, images);
    this.warranty = warranty;
    this.power = power;
}

Electronics.prototype = Object.create(AbstractProduct.prototype);

Object.assign(Electronics.prototype, {

    getWarranty(){
        return this.warranty;
    },
    getPower(){
        return this.power;
    },

    setWarranty(warranty){
        this.warranty = warranty;
    },
    setPower(power){
        this.power = power;
    }

})

export default Electronics;