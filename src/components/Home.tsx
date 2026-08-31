import { useSession } from '../context/SessionContext'
import { Title } from './Title'

export function Home() {
    const { regions, playerOptions, runesAquired, checkedLocIds } = useSession()
    const treasuresFound = regions.filter(r => r.getTreasureFound(checkedLocIds)).length

    return ( 
        <div className="flex flex-col gap-4">
            <div>
                <Title>Treasure</Title>
                <h5>Treasures found: {treasuresFound}/{playerOptions.TreasuresToGoal}</h5>

                <div className="flex flex-wrap gap-2.5 items-center pt-4">
                    {regions.filter(r => r.getTreasureFound(checkedLocIds)).map(region => (
                        <GridContent key={region.name} title={region.treasureName} subtitle={region.islandName}></GridContent>
                    ))}
                </div>
            </div>
            <div>
                <Title>Runes</Title>
                <div className="flex flex-wrap gap-2.5 items-center pt-4">
                    {regions.filter(r => r.name != "Starting").map(region => (
                        <GridContent key={region.name} title={region.runeName} subtitle={region.getRuneCount(runesAquired) + "/" + playerOptions.RunesRequired}></GridContent>
                    ))}
                </div>
            </div>
        </div>
    )
}

type contentProps = {
  title: string
  subtitle: string
}

function GridContent({ title, subtitle }: contentProps) {
  return (
    <div className="flex flex-col items-center text-center w-32 gap-0.5">
        <div className="font-bold text-sm">{title}</div>
        <div className="font-light legacy:text-zinc-500 viking:text-viking-green-100 text-xs">{subtitle}</div>
    </div>
  )
}


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