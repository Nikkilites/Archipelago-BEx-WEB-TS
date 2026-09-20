import { useState } from "react"

import { Title } from './Title'
import { useSession } from "../context/SessionContext"
import type { Location } from "../bex/model/Location"
import { LocationBox } from "./LocationBox"

export function Locations() {
    const { regions, checkedLocIds, playerOptions, runesAquired } = useSession()

    const [selectedLocs, setSelectedLocs] = useState<number[]>([]);

    function onCheckboxChange(loc: Location, checked: boolean) {
        checked ? setSelectedLocs(locIds => [...locIds, loc.id]) : setSelectedLocs(locIds => locIds.filter(id => id !== loc.id))
    }

    const locations = regions.filter(region => region.getIsOpen(runesAquired, playerOptions.RunesRequired) && !region.getIsFinished(checkedLocIds)).flatMap(reg => reg.locations).filter(loc => !loc.getIsInList(checkedLocIds))

    return ( 
        <div className="flex flex-col">

            <Title>Unplundered Locations</Title>

            <div className="font-bold text-l legacy:font-normal viking:text-viking-orange-300 opacity-80">
                {locations.length == 0 && <h5>You have nothing left to plunder!</h5>}
            </div>

            <div className="flex flex-col mt-3 gap-2">
                {locations
                    .sort((a, b) => Number(b.name.startsWith("Slay")) - Number(a.name.startsWith("Slay")))
                    .sort((a, b) => a.objective.localeCompare(b.objective))
                    .map(loc => (
                        <LocationBox key={loc.id} loc={loc} disabled={!loc.getIsInList(selectedLocs)} onCheckboxChange={onCheckboxChange}></LocationBox>
                    ))
                }
            </div>
        </div>
    )
}
