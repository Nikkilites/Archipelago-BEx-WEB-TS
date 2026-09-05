import { useState, type ReactNode } from "react"

import { Title } from '../components/Title'
import { useSession } from "../context/SessionContext"
import { Button } from "./Buttons"
import type { Location } from "../bex/model/Location"

type IslandProps = {
  children: ReactNode
}

export function Island({ children }: IslandProps) {
    const { regions, checkedLocIds, sendLocation } = useSession()

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
                {region!.locations.filter(loc => !loc.getIsInList(checkedLocIds)).map(loc => (
                    <div key={loc.id} className="flex flex-row items-center gap-2">

                        <input type="checkbox" id={loc.id.toString()} value={loc.id} onChange={(e) => onCheckboxChange(loc, e.target.checked)} className="appearance-none w-4 h-4 relative border rounded-sm hover:ring hover:cursor-pointer legacy:ring-zinc-600 legacy:checked:bg-zinc-400 legacy:border-zinc-600 viking:checked:bg-viking-red-200 viking:checked:border-viking-red-300 viking:ring-viking-red-300 viking:checked:ring-viking-red-300 viking:checked:border-2 viking:border-viking-beige-500 viking:bg-viking-beige-300 "/>
                        <Button variant = "small" disabled={!loc.getIsInList(selectedLocs)} className="text-sm" onClick={() => sendLocation(loc)}>Send</Button>


                        <div className="flex flex-col">
                            <p className="font-normal">{loc.name}</p>
                            <p className="text-sm mb-0.5 legacy:text-zinc-500 viking:text-viking-green-100">{loc.objective}</p>
                        </div>
                    </div>
                ))}
                {region!.locations.filter(loc => loc.getIsInList(checkedLocIds)).map(loc => (
                    <div key={loc.id} className="flex flex-row items-center gap-2">
                        <div className="flex flex-col legacy:opacity-70 italic viking:opacity-80">
                            <p className="font-normal">{loc.name}</p>
                            <p className="text-sm mb-0.5 legacy:text-zinc-500 viking:text-viking-green-100">{loc.objective}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/*

.location-checked {
    opacity: 0.5;  optional 
    font-style: italic;
}


.location-hint {
    font-size: 1em;
    color: gray;
}



    <div className="location-list">

        {if (!location.IsChecked)}
            <input type="checkbox" {bind="LocationChecked[location]"} />

            <button className="button button-small" {onclick="() => SendCheck(location)" disabled="@(!LocationChecked[location])"}>
                Send
            </button>

        <div className="text ({location.IsChecked ? 'location-checked' : '')}">
            <div className="location-with-hint">
                <div className="location-name">@location.Name</div>

                {
                    var hint = hints.Where(h => h.FindingPlayer == CurrentSession.ConnectionHandler.GetThisSlotId()).FirstOrDefault(h => h.LocationId == location.Id);
                }

                {if (hint != null && !location.IsChecked)}
                {
                    <span className="location-dot"
                    title="@location.ScoutedInfo.ItemName for @location.ScoutedInfo.Player.Name"
                    style="background-color:@CurrentSession.HintHandler.GetHintColor(hint.ItemFlags)">
                    </span>
                }
            </div>
            <div className="location-hint">@location.Hint</div>
        </div>

    </div>

  */