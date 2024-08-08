import { normalizeString, optimizedLevenshteinAlgorithm, regularLevenshteinAlgorithm } from "./index";
import { BasicAlgorithmConfig } from "../@types/utils";

export default function levenshteinDistance(props: BasicAlgorithmConfig): number {
    const { optimized = true } = props;
    const firstString = normalizeString(props.firstString);
    const secondString = normalizeString(props.secondString);
    if (!firstString.length || !secondString.length) return -1;

    const result = optimized ? optimizedLevenshteinAlgorithm(props) : regularLevenshteinAlgorithm(props);
    return result;
}