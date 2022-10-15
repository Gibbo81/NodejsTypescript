"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
const node_1 = require("./node");
class LinkedList {
    constructor() {
        this.head = null;
    }
    add(number) {
        if (this.head !== null)
            this.head.setNext(number);
        else
            this.head = new node_1.Node(number, 0);
    }
    print() {
        if (this.head !== null)
            this.head.print();
    }
    get length() {
        return this.head === null ? 0 : this.head.length(1);
    }
    compare(leftIndex, rightIndex) {
        if (this.head !== null)
            return this.head.compare(leftIndex, rightIndex, null);
        throw new Error('Empty Chain');
    }
    swamp(positionOne, positiontwo) {
        if (this.head === null)
            throw new Error('Empty Chain');
        var elements = this.head.getAllChain([]);
        [elements[positionOne], elements[positiontwo]] = [elements[positiontwo], elements[positionOne]];
        this.recreateTheChain(elements);
    }
    recreateTheChain(elements) {
        this.head = null;
        for (var x = 0; x < elements.length; x++)
            this.add(elements[x]);
    }
}
exports.LinkedList = LinkedList;
