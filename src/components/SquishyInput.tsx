import { motion } from "motion/react";
import { fast } from "../lib/fx/transitions";

export const SquishyInput = (props: React.ComponentProps<typeof motion.input>) => (
	<motion.input
        transition={fast}
        whileFocus={{ scale: 1.05 }}
		whileTap={{ scale: 0.99 }}
        {...props}
	/>
)