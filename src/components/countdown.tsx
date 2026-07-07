import { getPercentageOfDay } from "@/helpers";
import { motion } from "motion/react";
import type { PropsWithChildren } from "react";

export const Countdown = ({ children }: PropsWithChildren) => {
  const dayPercentage = getPercentageOfDay();

  return (
    <motion.div
      initial={{
        "--cone-percentage": "0%",
        transform: "translateY(64px)",
        opacity: 0,
      }}
      animate={{
        "--cone-percentage": `${dayPercentage}%`,
        transform: "translateY(0px)",
        opacity: 1,
      }}
      transition={{
        type: "spring",
        damping: 30,
      }}
      className="relative w-60 h-auto aspect-square rounded-full bg-conic-[transparent_0%,transparent_var(--cone-percentage),var(--color-amber-500)_var(--cone-percentage)] group/countdown shadow-2xl"
    >
      <div className="absolute inset-2 flex items-center justify-center bg-amber-50 rounded-full">
        <div className="group-hover/countdown:scale-110 transition-transform cursor-default">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
