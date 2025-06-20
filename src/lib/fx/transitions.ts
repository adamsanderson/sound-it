import type { Transition } from "motion/react";

export const bouncy: Transition = {
    type: "spring",
    stiffness: 290,
    damping: 10,
}

export const fast: Transition = {
    duration: 0.3
}