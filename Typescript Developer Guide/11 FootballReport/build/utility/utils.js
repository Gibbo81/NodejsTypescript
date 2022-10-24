"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateStringToDate2 = exports.dateStringToDate = void 0;
function dateStringToDate(s) {
    const parts = s.split('/').map((x) => parseInt(x));
    return new Date(parts[2], parts[1] - 1, parts[0]);
}
exports.dateStringToDate = dateStringToDate;
const dateStringToDate2 = (s) => {
    const parts = s.split('/').map((x) => parseInt(x));
    return new Date(parts[2], parts[1] - 1, parts[0]);
};
exports.dateStringToDate2 = dateStringToDate2;
