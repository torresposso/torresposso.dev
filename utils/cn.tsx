import { ClassValue, clsx } from "https://esm.sh/clsx@2.1.0";
import { twMerge } from "https://esm.sh/tailwind-merge@2.2.2";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
