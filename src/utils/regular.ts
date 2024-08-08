import { BasicAlgorithmConfig } from "../@types/utils";
import normalizeString from "./normalize";

export default function regularLevenshteinDistance(props: BasicAlgorithmConfig): number {
    const firstString = normalizeString(props.firstString);
    const secondString = normalizeString(props.secondString);

    const arr: any[] = [];
    for (let i: number = 0; i <= secondString.length; i++) {
        arr[i] = [i];
        for (let j: number = 1; j <= firstString.length; j++) {
            arr[i][j] = i === 0 ? j : Math.min(
                arr[i - 1][j] + 1,
                arr[i][j - 1] + 1,
                arr[i - 1][j - 1] + (firstString[j - 1] === secondString[i - 1] ? 0 : 1)
            );
        }
    }

    return arr[secondString.length][firstString.length];
};