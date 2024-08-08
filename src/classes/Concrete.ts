import LevenshteinAlgorithmAbstract from "./Abstract";

class LevenshteinAlgorithmConcrete<T extends any, K extends any> extends LevenshteinAlgorithmAbstract<T,K> {
    constructor(arrayToCompare: K[], maxSimilarityConst?: number) {
        super(arrayToCompare, maxSimilarityConst);
    }
}

export default LevenshteinAlgorithmConcrete;