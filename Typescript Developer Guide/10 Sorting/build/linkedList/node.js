"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
class Node {
    constructor(value, index) {
        this.value = value;
        this.index = index;
        this.nextNode = null;
    }
    setNext(value) {
        if (this.nextNode === null)
            this.nextNode = new Node(value, this.index + 1);
        else
            this.nextNode.setNext(value);
    }
    print() {
        console.log('Node: ', this.value);
        if (this.nextNode !== null)
            this.nextNode.print();
    }
    length(starting) {
        return this.nextNode === null
            ? starting
            : this.nextNode.length(starting + 1);
    }
    compare(leftIndex, rightIndex, firstvalue) {
        if (firstvalue !== null) {
            if (this.isThisNodeTheSecondToCompare(rightIndex))
                return this.compareValue(firstvalue, this.value);
            else if (this.nextNode !== null)
                return this.nextNode.compare(leftIndex, rightIndex, firstvalue);
            else
                throw new Error('compare index not found inside the chain');
        }
        else if (this.nextNode === null)
            throw new Error('compare index not found inside the chain');
        else if (this.index === leftIndex)
            return this.nextNode.compare(leftIndex, rightIndex, this.value);
        else
            return this.nextNode.compare(leftIndex, rightIndex, null);
    }
    isThisNodeTheSecondToCompare(rightIndex) {
        return this.index === rightIndex;
    }
    compareValue(left, right) {
        if (left > right)
            return 1;
        if (left < right)
            return -1;
        return 0;
    }
}
exports.Node = Node;
