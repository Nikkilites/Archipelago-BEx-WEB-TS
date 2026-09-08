type ThemeSwitchProps = {
  onThemeChange: (theme:string) => void
}

//             <button onClick={() => onThemeChange("nordic")} className="rounded-2xl w-4 h-4 hover:cursor-pointer bg-nordic-brown-700 nordic:border-3 nordic:border-nordic-parchment-100"></button>

export function ThemeSwitch({ onThemeChange }: ThemeSwitchProps) {
  return (
    <div className="inline-flex gap-2 items-center">
        <div className="rounded-2xl p-1 inline-flex gap-0.5 items-center justify-center viking:bg-viking-beige-300" role="group">
            <button onClick={() => onThemeChange("legacy")} className="rounded-2xl w-4 h-4 hover:cursor-pointer bg-legacy-blue-400 legacy:border-3 legacy:border-zinc-100"></button>
            <button onClick={() => onThemeChange("viking")} className="rounded-2xl w-4 h-4 hover:cursor-pointer bg-viking-green-600 viking:border-3 viking:border-viking-beige-300"></button>
        </div>
        Theme
    </div>
  )
}