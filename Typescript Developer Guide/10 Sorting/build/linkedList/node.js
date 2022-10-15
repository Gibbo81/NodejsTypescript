"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
class Node {
    constructor(value, index) {
        this.nextNode = null;
        this.value = value;
        this.index = index;
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
    compare(leftIndex, rightIndex, firstComparisongValue) {
        if (firstComparisongValue !== null)
            return this.searchForsecondComparisonValue(leftIndex, rightIndex, firstComparisongValue);
        if (this.nextNode === null)
            throw new Error('compare indexes not found inside the chain');
        if (this.isThisNodeTheSecondOne(leftIndex))
            return this.nextNode.compare(leftIndex, rightIndex, this.value);
        return this.nextNode.compare(leftIndex, rightIndex, null);
    }
    isThisNodeTheSecondOne(leftIndex) {
        return this.index === leftIndex;
    }
    searchForsecondComparisonValue(leftIndex, rightIndex, firstComparisongValue) {
        if (this.isThisNodeTheSecondToCompare(rightIndex))
            return this.compareValue(firstComparisongValue, this.value);
        if (this.nextNode !== null)
            return this.nextNode.compare(leftIndex, rightIndex, firstComparisongValue);
        throw new Error('compare index not found inside the chain');
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
    getAllChain(allElements) {
        allElements.push(this.value);
        if (this.nextNode !== null)
            allElements = this.nextNode.getAllChain(allElements);
        return allElements;
    }
}
exports.Node = Node;
