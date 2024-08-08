"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = regularLevenshteinDistance;
const normalize_1 = __importDefault(require("./normalize"));
function regularLevenshteinDistance(props) {
    const firstString = (0, normalize_1.default)(props.firstString);
    const secondString = (0, normalize_1.default)(props.secondString);
    const arr = [];
    for (let i = 0; i <= secondString.length; i++) {
        arr[i] = [i];
        for (let j = 1; j <= firstString.length; j++) {
            arr[i][j] = i === 0 ? j : Math.min(arr[i - 1][j] + 1, arr[i][j - 1] + 1, arr[i - 1][j - 1] + (firstString[j - 1] === secondString[i - 1] ? 0 : 1));
        }
    }
    return arr[secondString.length][firstString.length];
}
;
