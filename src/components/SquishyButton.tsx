import { motion } from "motion/react";
import { bouncy } from "../lib/fx/transitions";

export const SquishyButton = (
	props: React.ComponentProps<typeof motion.button>,
) => (
	<motion.button
		transition={bouncy}
		whileFocus={{ scale: 1.05 }}
		whileHover={{ scale: 1.05 }}
		whileTap={{ scale: 0.85 }}
		{...props}
	/>
);
