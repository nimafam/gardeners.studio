import type { HTMLAttributes } from "react";

export function Divider({ className = "", ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={`m-0 border-0 border-t border-black/20 ${className}`} {...props} />;
}
