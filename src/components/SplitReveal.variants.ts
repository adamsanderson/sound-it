import type { Variant } from "motion";

type VariantKeys = "hidden" | "visible";
export type RevealVariants = Record<VariantKeys, Variant>;

export const popDown: RevealVariants = {
	hidden: { y: "-100%" },
	visible: { y: 0 },
};

export const popUp: RevealVariants = {
	hidden: { y: "100%" },
	visible: { y: 0 },
};