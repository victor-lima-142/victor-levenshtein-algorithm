"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const NO_VALUE = `No value found to key or is not string`;
class Levenshtein {
    constructor(props) {
        this.list = [];
        this.keys = "";
        this.maxRangeSimilary = 3;
        this.searchStr = "";
        this.ignoreMaxRange = false;
        const { list, keys, maxRangeSimilary, searchStr, ignoreMaxRange } = props;
        this.list = list;
        this.keys = keys;
        this.maxRangeSimilary = maxRangeSimilary !== null && maxRangeSimilary !== void 0 ? maxRangeSimilary : 3;
        this.searchStr = searchStr !== null && searchStr !== void 0 ? searchStr : "";
        this.ignoreMaxRange = Boolean(ignoreMaxRange);
    }
    searchByList(key) {
        if (!key)
            throw new Error("Key to search is empty");
        const searchStr = this.searchStr;
        const ignoreMaxRange = Boolean(this === null || this === void 0 ? void 0 : this.ignoreMaxRange);
        const aux = [];
        for (let j = 0; j < this.list.length; j++) {
            const obj = this.list[j];
            if (!obj || !obj[key] || typeof obj[key] != "string")
                throw new Error(NO_VALUE);
            const compareResult = (0, utils_1.optimizedLevenshteinAlgorithm)({ firstString: searchStr, secondString: obj[key] });
            if (compareResult >= 0) {
                if (ignoreMaxRange) {
                    aux.push({ object: obj, compareResult });
                }
                else {
                    if (compareResult <= this.maxRangeSimilary)
                        aux.push({ object: obj, compareResult });
                }
            }
        }
        return aux;
    }
    run() {
        var _a, _b;
        if (!((_a = this.searchStr) === null || _a === void 0 ? void 0 : _a.length))
            throw new Error("String to search is empty");
        let aux = [];
        const populateAux = (result) => {
            const tempAux = [...aux, ...result]; // avoid memory conflict
            aux = tempAux;
        };
        if (this.keys instanceof Array) {
            if (!((_b = this.keys) === null || _b === void 0 ? void 0 : _b.length))
                throw new Error("Key to search is empty");
            for (let i = 0; i < this.keys.length; i++) {
                const key = this.keys[i];
                const result = this.searchByList(key);
                populateAux(result);
            }
        }
        else {
            if (this.keys.toString().length <= 0)
                throw new Error("key is empty");
            const result = this.searchByList(this.keys);
            populateAux(result);
        }
        return aux;
    }
    getResult(props) {
        var _a, _b, _c, _d, _e;
        const start = performance.now();
        if (!!props) {
            this.list = (_a = props === null || props === void 0 ? void 0 : props.list) !== null && _a !== void 0 ? _a : this.list;
            this.keys = (_b = props === null || props === void 0 ? void 0 : props.keys) !== null && _b !== void 0 ? _b : this.keys;
            this.maxRangeSimilary = (_c = props.maxRangeSimilary) !== null && _c !== void 0 ? _c : this.maxRangeSimilary;
            this.searchStr = (_d = props.searchStr) !== null && _d !== void 0 ? _d : this.searchStr;
            this.ignoreMaxRange = (_e = props.ignoreMaxRange) !== null && _e !== void 0 ? _e : this.ignoreMaxRange;
        }
        const runResult = this.run();
        const end = performance.now();
        const newSame = new Levenshtein({ list: runResult.map(e => e.object), keys: this.keys, searchStr: this.searchStr, maxRangeSimilary: this.maxRangeSimilary });
        const finalResult = new FinalResult(runResult, this.keys, [start, end], newSame);
        return finalResult;
    }
}
const NO_HAS_RESULTS = "You don't have results";
class FinalResult {
    constructor(resultList, keys, performance, levenshteinInstance) {
        this.resultList = [];
        this._keys = [];
        this._performance = [0, 0];
        this._levenshteinInstance = Object();
        this.resultList = resultList;
        this._keys = keys;
        this._performance = performance;
        this._levenshteinInstance = levenshteinInstance;
    }
    get performance() {
        const diff = this._performance[1] - this._performance[0];
        return `${diff.toFixed(4)} milliseconds`;
    }
    get length() { return this.resultList.length; }
    ;
    get keys() { return this._keys; }
    ;
    get list() { return this.resultList; }
    ;
    get ascList() { return this.resultList.sort((a, b) => a.compareResult - b.compareResult); }
    ;
    get listObject() { return this.list.map(e => e.object); }
    ;
    get result() { return this.ascList.map(e => e.object); }
    ;
    toString() { return this.result.toString(); }
    get listResults() { return this.list.map(e => e.compareResult); }
    ;
    get ascListResults() { return this.ascList.map(e => e.compareResult); }
    ;
    get uniqueResults() { return Array.from(new Set(this.ascListResults)); }
    get minResult() {
        if (!this.uniqueResults.length) {
            throw new Error(NO_HAS_RESULTS);
        }
        return Math.min(...this.uniqueResults);
    }
    get maxResult() {
        if (!this.uniqueResults.length) {
            throw new Error(NO_HAS_RESULTS);
        }
        return Math.max(...this.uniqueResults);
    }
    getResult(props) {
        return this._levenshteinInstance.getResult(props);
    }
}
exports.default = Levenshtein;
