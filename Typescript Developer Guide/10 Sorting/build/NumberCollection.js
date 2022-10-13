"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberCollection = void 0;
class NumberCollection {
    constructor(data) {
        this.data = data;
    }
    //getter --> to use this method as a property --> sortable.length
    get length() {
        return this.data.length;
    }
    compare(leftIndex, rightIndex) {
        if (this.data[leftIndex] > this.data[rightIndex])
            return 1;
        if (this.data[leftIndex] < this.data[rightIndex])
            return -1;
        return 0;
    }
    swamp(positionOne, positiontwo) {
        [this.data[positionOne], this.data[positiontwo]] = [
            this.data[positiontwo],
            this.data[positionOne],
        ];
    }
}
exports.NumberCollection = NumberCollection;
