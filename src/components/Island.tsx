import { useState, type ReactNode } from "react"

import { Title } from './Title'
import { LocationBox } from "./LocationBox"
import { useSession } from "../context/SessionContext"
import type { Location } from "../bex/model/Location"

type IslandProps = {
  children: ReactNode
}

export function Island({ children }: IslandProps) {
    const { regions, checkedLocIds } = useSession()

    const [selectedLocs, setSelectedLocs] = useState<number[]>([]);

    function onCheckboxChange(loc: Location, checked: boolean) {
        checked ? setSelectedLocs(locIds => [...locIds, loc.id]) : setSelectedLocs(locIds => locIds.filter(id => id !== loc.id))
    }

    const region = regions.find(reg => reg.islandName == children)

    return ( 
        <div className="flex flex-col">

            <Title>{children}</Title>

            <div className="font-bold text-l mb-3 legacy:font-normal viking:text-viking-orange-300 opacity-80">
                {region?.getIsFinished(checkedLocIds) 
                    ? <h5>This island has been fully raided!</h5> 
                    : (region?.getTreasureFound(checkedLocIds) && <h5>You have found the treasure on this island!</h5>)
                }
            </div>


            <div className="flex flex-col gap-2">
                {region!.locations
                    .filter(loc => !loc.getIsInList(checkedLocIds))
                    .sort((a, b) => Number(b.name.startsWith("Slay")) - Number(a.name.startsWith("Slay")))
                    .map(loc => (
                        <LocationBox key={loc.id} loc={loc} disabled={!loc.getIsInList(selectedLocs)} onCheckboxChange={onCheckboxChange}></LocationBox>
                    ))
                }
                {region!.locations
                    .filter(loc => loc.getIsInList(checkedLocIds))
                    .sort((a, b) => Number(b.name.startsWith("Slay")) - Number(a.name.startsWith("Slay")))
                    .map(loc => (
                        <div key={loc.id} className="flex flex-row items-center gap-2">
                            <div className="flex flex-col legacy:opacity-70 italic viking:opacity-80">
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
