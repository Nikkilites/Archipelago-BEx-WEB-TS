import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = {
  variant?: "small" | "big" | "login"
} & ComponentProps<"button">

export function Button({ variant = "small", className, ...props }: ButtonProps) {
  return (
    <button {...props} className={twMerge(
      "disabled:cursor-not-allowed hover:cursor-pointer rounded-lg disabled:bg-zinc-300 bg-legacy-blue-300 border-legacy-blue-400 border hover:bg-legacy-blue-250 hover:border-legacy-blue-300 viking:disabled:bg-viking-beige-300 viking:disabled:border-viking-beige-400 viking:font-bold viking:text-viking-beige-200 viking:bg-viking-red-300 viking:border-viking-red-400 viking:hover:bg-viking-red-200 viking:hover:border-viking-red-300",
      getVariantStyles(variant),
      className 
    )}>{props.children}</button>
  )
}

function getVariantStyles(variant: string) {
  switch (variant) {
    case "small":
      return "active:scale-95 px-3 py-1 "
    case "big":
      return "active:scale-97 rounded-lg px-4 py-2 "
    case "login":
      return "active:scale-97 rounded-lg px-4 py-2 disabled:bg-legacy-blue-200 viking:text-viking-beige-200 viking:bg-viking-orange-200 viking:border-viking-orange-300 viking:hover:bg-viking-orange-o viking:hover:border-viking-orange-200 viking:disabled:bg-viking-beige-400 viking:disabled:border-viking-beige-500"
    default:
      throw new Error("Invalid variant: " + variant)
  }
}
