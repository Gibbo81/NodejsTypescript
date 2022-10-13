"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharactersCollection = void 0;
class CharactersCollection {
    constructor(data) {
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
