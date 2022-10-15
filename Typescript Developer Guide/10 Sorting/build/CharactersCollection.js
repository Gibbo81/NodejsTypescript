"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharactersCollection = void 0;
const SortableBaseClass_1 = require("./SortableBaseClass");
class CharactersCollection extends SortableBaseClass_1.SortableBaseClass {
    constructor(data, sorter) {
        super(sorter);
        this.data = data;
    }
    swamp(positionOne, positiontwo) {
        var characters = this.data.split('');
        [characters[positionOne], characters[positiontwo]] = [
            characters[positiontwo],
            characters[positionOne],
        ];
        this.data = characters.join('');
    }
    compare(leftIndex, rightIndex) {
        if (this.data[leftIndex].toLowerCase() > this.data[rightIndex].toLowerCase())
            return 1;
        if (this.data[leftIndex].toLowerCase() < this.data[rightIndex].toLowerCase())
            return -1;
        return 0;
    }
    get length() {
        return this.data.length;
    }
}
exports.CharactersCollection = CharactersCollection;
