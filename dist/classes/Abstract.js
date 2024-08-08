"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class LevenshteinAlgorithmAbstract {
    constructor(arrayToCompare, maxSimilarityConst) {
        this.arrayToCompare = [];
        this.maxSimilarityConst = 2;
        this.arrayToCompare = arrayToCompare;
        this.maxSimilarityConst = maxSimilarityConst !== null && maxSimilarityConst !== void 0 ? maxSimilarityConst : 2;
    }
    getSimilarity(props) {
        var _a;
        const { str, field } = props;
        let arrResult = [];
        const stringToCompare = (0, utils_1.normalizeString)(str);
        for (let index = 0; index < this.arrayToCompare.length; index++) {
            const element = this.arrayToCompare[index];
            if (Boolean(element[field])) {
                const secondInfoField = (0, utils_1.normalizeString)(String(element[field]));
                if (secondInfoField == stringToCompare) {
                    arrResult = [];
                    arrResult.push({ ...element, levenshteinResult: 0 });
                    break;
                }
                else {
                    const levenshteinResult = this.calculateLevenshteinDistance(stringToCompare, (_a = secondInfoField) !== null && _a !== void 0 ? _a : "");
                    if (levenshteinResult <= this.maxSimilarityConst && levenshteinResult >= 0) {
                        arrResult.push({ ...element, levenshteinResult });
                    }
                }
            }
        }
        if ((arrResult === null || arrResult === void 0 ? void 0 : arrResult.length) == 1)
            return arrResult;
        if (!!arrResult.length)
            return arrResult.sort((a, b) => a.levenshteinResult - b.levenshteinResult);
        return [];
    }
    calculateLevenshteinDistance(s, t) {
        if (!s.length || !t.length)
            return -1;
        const arr = [];
        for (let i = 0; i <= t.length; i++) {
            arr[i] = [i];
            for (let j = 1; j <= s.length; j++) {
                arr[i][j] = i === 0 ? j : Math.min(arr[i - 1][j] + 1, arr[i][j - 1] + 1, arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1));
            }
        }
        return arr[t.length][s.length];
    }
    ;
}
exports.default = LevenshteinAlgorithmAbstract;
