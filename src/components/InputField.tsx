import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type InputProps = {
} & ComponentProps<"input">

export function InputField({className, ...props }: InputProps) {
  return (
    <input 
    {...props}
      className={twMerge(
      "mb-1 rounded-lg px-4 py-2 outline-1 focus-visible:outline-none focus-visible:ring-2 legacy:bg-white legacy:outline-zinc-200 legacy:focus-visible:ring-legacy-blue-350 viking:bg-viking-beige-200 viking:outline-viking-beige-400 viking:focus-visible:ring-viking-red-200 viking:text-viking-green-100",
      className 
    )}
    />
  )
}
