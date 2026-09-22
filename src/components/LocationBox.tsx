import { Button } from "./Buttons"
import { Checkbox } from "./Checkbox"
import type { Location } from "../bex/model/Location"
import { useSession } from "../context/SessionContext"
import { twMerge } from "tailwind-merge"
import { useState } from "react"

type LocationBoxProps = {
  loc: Location
  disabled: boolean
  onCheckboxChange(loc: Location, checked: boolean): void
}

export function LocationBox({ loc, disabled, onCheckboxChange }: LocationBoxProps) {

  const { sendLocation, hints, playerName } = useSession()

  const [showHint, setShowHint] = useState(false)

  const relevantHint = hints.find(hint => hint.item.locationId == loc.id && hint.item.sender.name == playerName)

  return (
    <div className="flex flex-row items-center gap-2">

        <Checkbox id={loc.id.toString()} value={loc.id} onChange={(e) => onCheckboxChange(loc, e.target.checked)}></Checkbox>
        <Button variant = "small" disabled={disabled} className="text-sm" onClick={() => sendLocation(loc)}>Send</Button>

        <div className="flex flex-col">
          <div className="inline-flex items-center gap-2">
            <p className="font-normal">{loc.name}</p>
            {relevantHint !== undefined &&
                <button type="button" onClick={() => setShowHint(curr => !curr)} className={twMerge(
                    "min-w-5 h-5 text-xs legacy:mb-0.5 border rounded-2xl legacy:border-zinc-800 legacy:text-zinc-700 viking:border-viking-green-700 hover:cursor-pointer",
                    showHint ? "px-2" : "",
                    getVariantStyles(
                      relevantHint.item.progression ? "progression" : (
                        relevantHint.item.useful ? "useful" : (
                          relevantHint.item.trap ? "trap" : "filler"
                    )))
                )}>{showHint ? loc.getScoutedItemString() : ""}
                </button>}
          </div>
          <p className="text-sm mb-0.5 legacy:text-zinc-500 viking:text-viking-green-100">{loc.objective}</p>
        </div>
    </div>
  )
}

function getVariantStyles(variant: string) {
  switch (variant) {
    case "progression":
      return "bg-archi-prog "
    case "useful":
      return "bg-archi-useful "
    case "filler":
      return "bg-archi-trash "
    case "trap":
      return "bg-archi-trap "
    default:
      return "viking:bg-viking-beige-300 legacy:bg-legacy-blue-200 "
  }
}