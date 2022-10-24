"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvFileReader = void 0;
const fs_1 = __importDefault(require("fs"));
class CsvFileReader {
    constructor(path) {
        this.path = path;
    }
    Read() {
        return fs_1.default.readFileSync(this.path, { encoding: 'utf-8' })
            .split('\n')
            .map((row) => { return row.split(','); });
    }
}
exports.CsvFileReader = CsvFileReader;
