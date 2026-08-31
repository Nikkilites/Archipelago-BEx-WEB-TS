import type { ReactNode } from "react"

import { Title } from '../components/Title'
import { useSession } from "../context/SessionContext"

type IslandProps = {
  children: ReactNode
}

export function Island({ children }: IslandProps) {
    const { checkedLocIds, regions } = useSession()

    const region = regions.find(reg => reg.islandName == children)

    return ( 
        <div className="regions-container">
            <Title>{children}</Title>
            <div className="flex flex-col gap-2">
                {region!.locations.map(loc => (
                    <div key={loc.id}>
                        <p className="location-name">{loc.name}</p>
                        <p>is checked: {loc.getIsChecked(checkedLocIds) ? "true" : "false"}</p>
                        <p className="location-hint">{loc.objective}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
/*

            {if (region.LocationsLeft <= 0)}
            {
                <h5>This island has been fully raided!</h5>
            }
            {else if (region.TreasureFound)}
            {
                <h5>You have found the treasure on this island!</h5>
            }

            {foreach (var location in region.Locations)}
                {if (!LocationChecked.ContainsKey(location))}
                    LocationChecked[location] = false;

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
            }
    </div>
  )
}
  */