import { useSession } from '../context/SessionContext'
import { Title } from './Title'

export function Journal() {
    const { regions, playerOptions, runesAquired, checkedLocIds } = useSession()

    const openLocs = regions.filter(region => region.getIsOpen(runesAquired, playerOptions.RunesRequired)).flatMap(reg => reg.locations)

    const trackedObjectives = openLocs.flatMap(loc => loc.objective)

    return ( 
        <div className="flex flex-col gap-4">
            <div>
                <Title>Logmundr's Journal</Title>

                <div className="flex flex-wrap gap-2.5 items-center pt-4">
                    {regions.filter(r => r.getTreasureFound(checkedLocIds)).map(region => (
                        <GameProgressBox key={region.name} title={region.treasureName} subtitle={region.islandName}></GameProgressBox>
                    ))}
                </div>
            </div>
            <div>
                <Title>Runes</Title>
                <div className="flex flex-wrap gap-2.5 items-center pt-4">
                    {regions.filter(r => r.name != "Starting").map(region => (
                        <GameProgressBox key={region.name} title={region.runeName} subtitle={region.getRuneCount(runesAquired) + "/" + playerOptions.RunesRequired}></GameProgressBox>
                    ))}
                </div>
            </div>
        </div>
    )
}

type gameProgressProps = {
  title: string
  subtitle: string
}

function GameProgressBox({ title, subtitle }: gameProgressProps) {
  return (
    <div className="flex flex-col items-center text-center w-32 gap-0.5">
        <div className="legacy:font-medium viking:font-semibold text-sm">{title}</div>
        <div className="font-light legacy:text-zinc-500 viking:text-viking-green-100 text-xs">{subtitle}</div>
    </div>
  )
}

type Objective = { name: string; count: number, removed: boolean; showFull: boolean }


/* 
    *Might wanna move the recent locations bit to the logmundr journal
            
    <Title>Recent Locations Sent</Title>

    {if (CurrentSessionEntry?.RecentLocationsSent.Count == 0)}
    {
        <h5>You have yet to send any locations this session.</h5>
    }
    else
    {
        <div className="recent-list">
            {foreach (var notification in CurrentSessionEntry.RecentLocationsSent.TakeLast(5).Reverse())}
            {
                <div className="recent-item">
                    <div className="recent-message">@notification.Message</div>
                    <span className="recent-dot"
                    style="background-color:{@notification.DotColor}">
                    </span>
                </div>
            }
        </div>
    }
*/