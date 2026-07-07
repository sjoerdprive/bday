import { classnames } from "@/helpers";
import type { ComponentProps } from "react";

const Root = ({ children, className, ...divProps }: ComponentProps<"div">) => {
  return (
    <div className={classnames("w-dvw h-dvh", className)} {...divProps}>
      {children}
    </div>
  );
};

const Header = ({ children }: ComponentProps<"header">) => {
  return <header className="w-dvw h-16 bg-slate-800">{children}</header>;
};

const Center = ({ children }: ComponentProps<"main">) => {
  return (
    <main className="grid place-items-center w-full h-full">{children}</main>
  );
};

export const Page = Object.assign(Root, {
  Header,
  Center,
});
