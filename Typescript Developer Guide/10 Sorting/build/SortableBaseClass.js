"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortableBaseClass = void 0;
class SortableBaseClass {
    constructor(sorter) {
        this.sorter = sorter;
    }
    sortList() {
        this.sorter.sort(this);
    }
}
exports.SortableBaseClass = SortableBaseClass;
