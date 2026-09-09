import { useState } from "react"

import { Title } from './Title'
import { useSession } from "../context/SessionContext"
import { Button } from "./Buttons"
import type { Location } from "../bex/model/Location"
import { Checkbox } from "./Checkbox"

export function Locations() {
    const { regions, checkedLocIds, sendLocation, playerOptions, runesAquired } = useSession()

    const [selectedLocs, setSelectedLocs] = useState<number[]>([]);

    function onCheckboxChange(loc: Location, checked: boolean) {
        checked ? setSelectedLocs(locIds => [...locIds, loc.id]) : setSelectedLocs(locIds => locIds.filter(id => id !== loc.id))
    }

    const locations = regions.filter(region => region.getIsOpen(runesAquired, playerOptions.RunesRequired) && !region.getIsFinished(checkedLocIds)).flatMap(reg => reg.locations).filter(loc => !loc.getIsInList(checkedLocIds))

    return ( 
        <div className="flex flex-col">

            <Title>Unplundered Locations</Title>

            <div className="flex flex-col mt-3 gap-2">
                {locations
                    .sort((a, b) => Number(b.name.startsWith("Slay")) - Number(a.name.startsWith("Slay")))
                    .sort((a, b) => a.objective.localeCompare(b.objective))
                    .map(loc => (
                        <div key={loc.id} className="flex flex-row items-center gap-2">

                            <Checkbox id={loc.id.toString()} value={loc.id} onChange={(e) => onCheckboxChange(loc, e.target.checked)}></Checkbox>
                            <Button variant = "small" disabled={!loc.getIsInList(selectedLocs)} className="text-sm" onClick={() => sendLocation(loc)}>Send</Button>

                            <div className="flex flex-col">
                                <p className="font-normal">{loc.name}</p>
                                <p className="text-sm mb-0.5 legacy:text-zinc-500 viking:text-viking-green-100">{loc.objective}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
