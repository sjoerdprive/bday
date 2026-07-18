import { classnames } from "@/helpers";
import { type MotionProps, motion } from "motion/react";
import type { ComponentProps } from "react";

const Root = ({
  children,
  className,
  ...divProps
}: ComponentProps<"div"> & MotionProps) => {
  return (
    <motion.div className={classnames("w-dvw h-dvh overflow-y-auto", className)} {...divProps}>
      {children}
    </motion.div>
  );
};

const Header = ({ children }: ComponentProps<"header">) => {
  return <header className="w-dvw h-16 bg-slate-800">{children}</header>;
};

const Center = ({ children, className, ...mainProps }: ComponentProps<"main">) => {
  return (
    <main className={classnames("grid place-items-center w-full h-full", className)} {...mainProps}>
      {children}
    </main>
  );
};

export const Page = Object.assign(Root, {
  Header,
  Center,
});
