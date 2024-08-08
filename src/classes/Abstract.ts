import { normalizeString } from "../utils";

export type TLevenshteinResult<K extends any> = { levenshteinResult: number } & K;

export type GetSimilarityConfig<T extends any, K extends any> = {
    str: string, field: keyof K | keyof T
}

abstract class LevenshteinAlgorithmAbstract<T extends any, K extends any> {
    protected arrayToCompare: K[] = [];
    protected maxSimilarityConst: number = 2;

    constructor(arrayToCompare: K[], maxSimilarityConst?: number) {
        this.arrayToCompare = arrayToCompare;
        this.maxSimilarityConst = maxSimilarityConst ?? 2;
    }

    protected getSimilarity(props: GetSimilarityConfig<T, K>): Array<TLevenshteinResult<K>> {
        const { str, field } = props;

        let arrResult: TLevenshteinResult<K>[] = [];
        const stringToCompare = normalizeString(str);

        for (let index = 0; index < this.arrayToCompare.length; index++) {
            const element: any = this.arrayToCompare[index] as any;
            if (Boolean(element[field])) {
                const secondInfoField = normalizeString(String(element[field]));
                if (secondInfoField == stringToCompare) {
                    arrResult = [];
                    arrResult.push({ ...element, levenshteinResult: 0 });
                    break;
                } else {
                    const levenshteinResult = this.calculateLevenshteinDistance(stringToCompare, secondInfoField! ?? "");
                    if (levenshteinResult <= this.maxSimilarityConst && levenshteinResult >= 0) {
                        arrResult.push({ ...element, levenshteinResult });
                    }
                }
            }
        }
        if (arrResult?.length == 1) return arrResult;
        if (!!arrResult.length) return arrResult.sort((a, b) => a.levenshteinResult - b.levenshteinResult);
        return [];
    }

    protected calculateLevenshteinDistance(s: string, t: string) {
        if (!s.length || !t.length) return -1;
    
        const arr: any[] = [];
        for (let i: number = 0; i <= t.length; i++) {
            arr[i] = [i];
            for (let j: number = 1; j <= s.length; j++) {
                arr[i][j] = i === 0 ? j : Math.min(
                    arr[i - 1][j] + 1,
                    arr[i][j - 1] + 1,
                    arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
                );
            }
        }
    
        return arr[t.length][s.length];
    };
}

export default LevenshteinAlgorithmAbstract;