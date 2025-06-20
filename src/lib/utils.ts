export function sortByLengthDesc(a: string, b: string) {
    return b.length - a.length;
}

export function unique(values: string[]): string[] {
    return Array.from(new Set(values))
}
