import type { ComponentProps } from "react";

export const FloatToggle = (buttonProps: ComponentProps<"button">) => {
  return (
    <button
      {...buttonProps}
      className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-slate-800 text-white shadow-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
    >
      T
    </button>
  );
};
