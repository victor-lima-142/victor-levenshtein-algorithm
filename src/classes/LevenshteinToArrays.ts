import { GetResult, LevenshteinProps, LevenshteinResult } from "../@types/classes";
import { optimizedLevenshteinAlgorithm } from "../utils";

const NO_VALUE = `No value found to key or is not string`;

class Levenshtein<K extends Object> {
    protected list: K[] = [];
    protected keys: (keyof K)[] | (keyof K) = "" as keyof K;
    protected maxRangeSimilary: number = 3;
    protected searchStr: string = "";
    protected ignoreMaxRange: boolean = false;

    constructor(props: LevenshteinProps<K>) {
        const { list, keys, maxRangeSimilary, searchStr, ignoreMaxRange } = props;
        this.list = list;
        this.keys = keys;
        this.maxRangeSimilary = maxRangeSimilary ?? 3;
        this.searchStr = searchStr ?? "";
        this.ignoreMaxRange = Boolean(ignoreMaxRange);
    }

    protected searchByList(key: keyof K) {
        if (!key) throw new Error("Key to search is empty")

        const searchStr = this.searchStr;
        const ignoreMaxRange: boolean = Boolean(this?.ignoreMaxRange);

        const aux: LevenshteinResult<K>[] = [];
        for (let j = 0; j < this.list.length; j++) {
            const obj = this.list[j];
            if (!obj || !obj[key] || typeof obj[key] != "string") throw new Error(NO_VALUE)
            const compareResult = optimizedLevenshteinAlgorithm({ firstString: searchStr, secondString: obj[key] })
            if (compareResult >= 0) {
                if (ignoreMaxRange) {
                    aux.push({ object: obj, compareResult });
                } else {
                    if (compareResult <= this.maxRangeSimilary) aux.push({ object: obj, compareResult });
                }
            }
        }
        return aux;
    }

    protected run(): LevenshteinResult<K>[] {
        if (!this.searchStr?.length) throw new Error("String to search is empty")

        let aux: LevenshteinResult<K>[] = [];
        const populateAux = (result: LevenshteinResult<K>[]) => {
            const tempAux = [...aux, ...result] // avoid memory conflict
            aux = tempAux
        }
        if (this.keys instanceof Array) {
            if (!this.keys?.length) throw new Error("Key to search is empty")
            for (let i = 0; i < this.keys.length; i++) {
                const key = this.keys[i];
                const result = this.searchByList(key);
                populateAux(result);
            }
        } else {
            if (this.keys.toString().length <= 0) throw new Error("key is empty");
            const result = this.searchByList(this.keys as keyof K);
            populateAux(result)
        }

        return aux;
    }

    public getResult(props?: GetResult<K>) {
        const start = performance.now();
        if (!!props) {
            this.list = props?.list ?? this.list;
            this.keys = props?.keys ?? this.keys;
            this.maxRangeSimilary = props.maxRangeSimilary ?? this.maxRangeSimilary;
            this.searchStr = props.searchStr ?? this.searchStr;
            this.ignoreMaxRange = props.ignoreMaxRange ?? this.ignoreMaxRange;
        }
        const runResult = this.run();
        const end = performance.now();

        const newSame = new Levenshtein<K>({ list: runResult.map(e => e.object), keys: this.keys, searchStr: this.searchStr, maxRangeSimilary: this.maxRangeSimilary });
        const finalResult = new FinalResult<K>(runResult, this.keys, [start, end], newSame);
        return finalResult;
    }
}



const NO_HAS_RESULTS = "You don't have results";

class FinalResult<K extends Object> {
    protected resultList: LevenshteinResult<K>[] = []
    protected _keys: (keyof K)[] | (keyof K) = [];
    protected _performance: [number, number] = [0, 0];
    protected _levenshteinInstance: Levenshtein<K> = Object() as Levenshtein<K>;

    constructor(resultList: LevenshteinResult<K>[], keys: (keyof K)[] | (keyof K), performance: [number, number], levenshteinInstance: Levenshtein<K>) {
        this.resultList = resultList;
        this._keys = keys;
        this._performance = performance;
        this._levenshteinInstance = levenshteinInstance;
    }

    public get performance(): string {
        const diff = this._performance[1] - this._performance[0];
        return `${diff.toFixed(4)} milliseconds`
    }

    public get length() { return this.resultList.length };

    public get keys() { return this._keys };

    public get list() { return this.resultList };

    public get ascList() { return this.resultList.sort((a, b) => a.compareResult - b.compareResult) };

    public get listObject() { return this.list.map(e => e.object) };

    public get result(): Array<K> { return this.ascList.map(e => e.object) };

    public toString(): string { return this.result.toString() }

    public get listResults() { return this.list.map(e => e.compareResult) };

    public get ascListResults() { return this.ascList.map(e => e.compareResult) };

    public get uniqueResults() { return Array.from(new Set(this.ascListResults)) }

    public get minResult() {
        if (!this.uniqueResults.length) {
            throw new Error(NO_HAS_RESULTS)
        }
        return Math.min(...this.uniqueResults)
    }

    public get maxResult() {
        if (!this.uniqueResults.length) {
            throw new Error(NO_HAS_RESULTS)
        }
        return Math.max(...this.uniqueResults)
    }

    public getResult(props?: GetResult<K>) {
        return this._levenshteinInstance.getResult(props);
    }
}

export default Levenshtein;