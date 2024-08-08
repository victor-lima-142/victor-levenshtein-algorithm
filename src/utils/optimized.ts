import { BasicAlgorithmConfig } from "../@types/utils";
import normalizeString from "./normalize";

export default function optimizedLevenshteinDistance(props: BasicAlgorithmConfig): number {
    const firstString = normalizeString(props.firstString);
    const secondString = normalizeString(props.secondString);
    const lenA = firstString.length;
    const lenB = secondString.length;

    if (lenA === 0) return lenB;
    if (lenB === 0) return lenA;

    if (lenA > lenB) {
        return optimizedLevenshteinDistance({ firstString: secondString, secondString: firstString }); // Ensure lenA <= lenB for optimized space usage
    }

    let prevRow: number[] = Array.from({ length: lenA + 1 }, (_, i) => i);
    let currRow: number[] = new Array(lenA + 1);

    for (let j = 1; j <= lenB; j++) {
        currRow[0] = j;

        for (let i = 1; i <= lenA; i++) {
            const cost = firstString[i - 1] === secondString[j - 1] ? 0 : 1;
            currRow[i] = Math.min(
                currRow[i - 1] + 1,      // Insertion
                prevRow[i] + 1,          // Deletion
                prevRow[i - 1] + cost    // Substitution
            );
        }
        [prevRow, currRow] = [currRow, prevRow];
    }
    return prevRow[lenA];
}