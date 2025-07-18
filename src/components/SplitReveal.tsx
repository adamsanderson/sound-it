import { motion } from "motion/react";
import { splitIntoCharacters } from "../lib/fx/splitChars";
import { useMemo } from "react";
import { bouncy } from "../lib/fx/transitions";

import style from "./SplitReveal.module.css";
import type { Transition } from "motion";
import { cx } from "../lib/cx";
import { popDown, type RevealVariants } from "./SplitReveal.variants";

const defaultTransition: Transition = { ...bouncy };

type Props = React.ComponentProps<typeof motion.span> & {
	staggerChildren?: number;
    variants?: RevealVariants;
};

export const SplitReveal = ({
	children,
	staggerChildren = 0.1,
    className,
    variants = popDown,
	transition = defaultTransition,
	...wrapper
}: Props) => {
	const items = useMemo(() => {
        if (typeof children === 'string') {
            return splitIntoCharacters(children)
        } else if (Array.isArray(children)) {
            return children
        } else return []
    }, [children]);

	const parentTransition: Transition = {
		...transition,
		staggerChildren,
	};

	return (
		<motion.span
			{...wrapper}
			transition={parentTransition}
			initial="hidden"
			animate="visible"
			exit="hidden"
			className={cx(className, style.wrapper)}
		>
			{items.map((child, i) => (
				<motion.span
					key={`${child.toString()}${i}`}
					variants={variants}
					className={style.item}
				>
					{child}
				</motion.span>
			))}
		</motion.span>
	);
};
