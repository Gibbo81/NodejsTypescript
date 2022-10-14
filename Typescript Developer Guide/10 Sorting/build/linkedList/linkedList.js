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
}
exports.LinkedList = LinkedList;
