import { useSession } from '../context/SessionContext'
import { Button } from './Buttons'
import { Title } from './Title'

export function Home() {
    const { regions, playerOptions, runesAquired, checkedLocIds, sendGoal } = useSession()
    const treasuresFound = regions.filter(r => r.getTreasureFound(checkedLocIds)).length

    return ( 
        <div className="flex flex-col gap-4">
            <div>
                <Title>Treasure</Title>
                <div className='inline-flex gap-4'>
                    <h5 className="font-bold text-l legacy:font-normal viking:text-viking-orange-300 opacity-80">Treasures found: {treasuresFound}/{playerOptions.TreasuresToGoal}</h5>
                    {treasuresFound >= playerOptions.TreasuresToGoal && <Button variant = "small" disabled={false} className="text-sm px-2 py-0.5" onClick={sendGoal}>Send Goal!</Button>}
                </div>

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
        <div className="legacy:font-medium viking:font-semibold text-sm">{title}</div>
        <div className="font-light legacy:text-zinc-500 viking:text-viking-green-100 text-xs">{subtitle}</div>
    </div>
  )
}
