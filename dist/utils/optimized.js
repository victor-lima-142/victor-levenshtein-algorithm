"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = optimizedLevenshteinDistance;
const normalize_1 = __importDefault(require("./normalize"));
function optimizedLevenshteinDistance(props) {
    const firstString = (0, normalize_1.default)(props.firstString);
    const secondString = (0, normalize_1.default)(props.secondString);
    const lenA = firstString.length;
    const lenB = secondString.length;
    if (lenA === 0)
        return lenB;
    if (lenB === 0)
        return lenA;
    if (lenA > lenB) {
        return optimizedLevenshteinDistance({ firstString: secondString, secondString: firstString }); // Ensure lenA <= lenB for optimized space usage
    }
    let prevRow = Array.from({ length: lenA + 1 }, (_, i) => i);
    let currRow = new Array(lenA + 1);
    for (let j = 1; j <= lenB; j++) {
        currRow[0] = j;
        for (let i = 1; i <= lenA; i++) {
            const cost = firstString[i - 1] === secondString[j - 1] ? 0 : 1;
            currRow[i] = Math.min(currRow[i - 1] + 1, // Insertion
            prevRow[i] + 1, // Deletion
            prevRow[i - 1] + cost // Substitution
            );
        }
        [prevRow, currRow] = [currRow, prevRow];
    }
    return prevRow[lenA];
}
