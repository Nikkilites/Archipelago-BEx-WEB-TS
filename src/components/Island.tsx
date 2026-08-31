import { type ReactNode } from "react"

import { Title } from '../components/Title'
import { useSession } from "../context/SessionContext"
import { Button } from "./Buttons"

type IslandProps = {
  children: ReactNode
}

export function Island({ children }: IslandProps) {
    const { regions } = useSession()

//    const [selectedLocs, setSelectedLocs] = useState([])

    const region = regions.find(reg => reg.islandName == children)

    return ( 
        <div className="flex flex-col">

            <Title>{children}</Title>

            {region?.getIsFinished 
                ? <h5 className="font-bold text-l mt-1 mb-3">This island has been fully raided!</h5> 
                : (region?.getTreasureFound && <h5>You have found the treasure on this island!</h5>)
            }


            <div className="flex flex-col gap-2">
                {region!.locations.map(loc => (
                    <div key={loc.id} className="flex flex-row items-center gap-2">
                        <input type="checkbox" className="w-4 h-4"/>


                        <Button variant = "small" className="text-sm">Send</Button>
                        <div className="flex flex-col">
                            <p className="font-medium">{loc.name}</p>
                            <p className="text-sm mb-0.5 legacy:text-zinc-800 viking:text-viking-green-100">{loc.objective}</p>
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