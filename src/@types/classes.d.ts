export type LevenshteinResult<A> = { compareResult: number, object: A };

export type LevenshteinProps<A> = { list: A[], keys: (keyof A)[] | (keyof A), maxRangeSimilary?: number, searchStr?: string, ignoreMaxRange?: boolean };

export type GetResult<A> = Omit<LevenshteinProps<A>, "list"> & { list?: A[] };

export type SearchByList<A> = Omit<GetResult<A>, "keys"> & { key: keyof A }