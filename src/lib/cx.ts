
type MaybeCssClass = string | false | null | undefined;

export function cx(...classes: MaybeCssClass[]) {
    return classes.filter(c => typeof c === 'string').join(" ")
}