import type { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

import { useSession } from "../context/SessionContext"

type NavProps = {
  children: ReactNode,
  onPageChange: (page:string) => void
}

export function SideNav({ children, onPageChange }: NavProps) {
  const { playerOptions, regions, runesAquired, checkedLocIds } = useSession()

  const treasurousRegions = regions.filter(region => region.getIsOpen(runesAquired, playerOptions.RunesRequired) && !region.getTreasureFound(checkedLocIds) && !region.getIsFinished(checkedLocIds))
  const treasurelessRegions = regions.filter(region => region.getIsOpen(runesAquired, playerOptions.RunesRequired) && region.getTreasureFound(checkedLocIds) && !region.getIsFinished(checkedLocIds))
  const raidedRegions = regions.filter(region => region.getIsOpen(runesAquired, playerOptions.RunesRequired) && region.getIsFinished(checkedLocIds))


  return (
    <div className='w-64 flex-none h-full legacy:border legacy:bg-legacy-blue-100 legacy:rounded-lg legacy:border-legacy-blue-200 nordic:bg-nordic-red-500 nordic:border-4 nordic:border-nordic-red-400 viking:bg-viking-green-600'>
      <div className="p-3 h-full viking:p-2 viking:border-viking-green-700">
        <div className="flex flex-col h-full gap-1 viking:p-3 viking:border viking:rounded-lg viking:border-viking-green-100">

          <NavItem page="Home" onPageChange={onPageChange} active={children === "Home"} finished={false}>Home</NavItem>
          <NavItem page="TextClient" onPageChange={onPageChange} active={children === "TextClient"} finished={false}>Text Client</NavItem>

          {(playerOptions.HintShopCost != 0) && <NavItem page="TrashExchange" onPageChange={onPageChange} active={children === "TrashExchange"} finished={false}>Trash Exchange</NavItem>}

          {treasurousRegions.length !== 0 &&
            <div>
              <p className="text-sm legacy:text-zinc-500 viking:text-viking-green-100">Treasurous Islands</p>
              <div className="border-t legacy:border-t-zinc-500 viking:border-t-viking-green-100"></div>

              {treasurousRegions.map(region => (
                <NavItem page={region.islandName} onPageChange={onPageChange} key={region.islandName} active={children === region.islandName} finished={region.getIsFinished(checkedLocIds)}>{region.islandName}</NavItem>
              ))}
            </div>
          }

          {treasurelessRegions.length !== 0 &&
            <div>
              <p className="text-sm legacy:text-zinc-500 viking:text-viking-green-100">Treasureless Islands</p>
              <div className="border-t legacy:border-t-zinc-500 viking:border-t-viking-green-100"></div>

              {treasurelessRegions.map(region => (
                <NavItem page={region.islandName} onPageChange={onPageChange} key={region.name} active={children === region.name} finished={region.getIsFinished(checkedLocIds)}>{region.islandName}</NavItem>
              ))}
            </div>
          }

          {raidedRegions.length !== 0 &&
            <div>
              <p className="text-sm legacy:text-zinc-500 viking:text-viking-green-100">Raided Islands</p>
              <div className="border-t legacy:border-t-zinc-500 viking:border-t-viking-green-100"></div>

              {raidedRegions.map(region => (
                <NavItem page={region.islandName} onPageChange={onPageChange} key={region.name} active={children === region.name} finished={region.getIsFinished(checkedLocIds)}>{region.islandName}</NavItem>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

//@CurrentSession.RegionHandler.AvailableRegions.OrderBy(r => r.LocationsLeft <= 0) for above^^

type NavItemProps = {
  children: ReactNode,
  active: boolean,
  finished: boolean,
  page: string,
  onPageChange: (page:string) => void
}

function NavItem(props: NavItemProps) {
  return (
    <div onClick={() => props.onPageChange(props.page)} className={twMerge(
      "viking:px-2 nordic:font-norse nordic:text-xl legacy:text-sm legacy:rounded-lg hover:cursor-pointer legacy:hover:bg-legacy-blue-200  viking:text-viking-beige-200 py-1 viking:border viking:border-viking-green-600",
      (props.active ? "legacy:px-5 font-semibold viking:bg-viking-orange-o viking:border viking:border-viking-orange-200" : "viking:hover:bg-viking-orange-300 legacy:px-2"), 
      (props.finished ? "line-through decoration-2" : ""), 
    )}>{props.children}
    </div>
  )
}