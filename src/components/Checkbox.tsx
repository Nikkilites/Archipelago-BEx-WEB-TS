import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type CheckboxProps = {
} & ComponentProps<"input">

export function Checkbox({className, ...props }: CheckboxProps) {
  return (
    <input 
        {...props} 
        type="checkbox"
        className={twMerge(
            "appearance-none min-w-4 w-4 min-h-4 max-h-4 relative border rounded-sm hover:border-2 hover:cursor-pointer legacy:rounded-2xl legacy:checked:bg-zinc-400 legacy:border-zinc-600 viking:checked:bg-viking-red-200 viking:checked:border-viking-red-300 viking:checked:border-2 viking:checked:hover:border-3 viking:border-viking-beige-500 viking:bg-viking-beige-300 ",
            className 
        )}
    />
  )
}
