"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sort = void 0;
class Sort {
    sort(array) {
        for (var i = array.length - 1; i > 0; i--) {
            for (var x = 0; x <= i; x++) {
                if (array[x] > array[x + 1])
                    [array[x], array[x + 1]] = [array[x + 1], array[x]];
            }
        }
        return array;
    }
}
exports.Sort = Sort;
