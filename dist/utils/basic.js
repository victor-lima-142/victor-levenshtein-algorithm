"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = levenshteinDistance;
const index_1 = require("./index");
function levenshteinDistance(props) {
    const { optimized = true } = props;
    const firstString = (0, index_1.normalizeString)(props.firstString);
    const secondString = (0, index_1.normalizeString)(props.secondString);
    if (!firstString.length || !secondString.length)
        return -1;
    const result = optimized ? (0, index_1.optimizedLevenshteinAlgorithm)(props) : (0, index_1.regularLevenshteinAlgorithm)(props);
    return result;
}
