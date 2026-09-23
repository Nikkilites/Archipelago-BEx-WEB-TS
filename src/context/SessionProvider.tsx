import { useRef, useState, type ReactNode } from "react";
import type { Item, Hint, JSONRecord } from "archipelago.js";

import { useToast } from "./ToastContext";
import { SessionContext } from "./SessionContext";
import { ArchipelagoService } from "../archipelago/ArchipelagoService";

import { Region } from "../bex/model/Region";
import { Location } from "../bex/model/Location";
import { PlayerOptions } from "../bex/model/PlayerOptions";
import { RegionData } from "../bex/data/RegionData";
import { Notification } from "../bex/model/Notification";
import type { PlayerLogin } from "../archipelago/PlayerLogin";


type SessionProviderProps = {
    children: ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
    const { openToast, setToasts } = useToast()

    const [activePage, setActivePage] = useState("Home")
    
    const [isActive, setActive] = useState<boolean>(false)
    const [playerName, setPlayerName] = useState<string>("name")
    const [playerOptions, setPlayerOptions] = useState<PlayerOptions>(new PlayerOptions(0,0,0))
    const [runesAquired, setRunesAquired] = useState<string[]>([])

    const [trashDataStorageKey, setTrashDataStorageKey] = useState<string>("")
    const [trashAquired, setTrashAquired] = useState<number>(0)
    const [trashSpent, setTrashSpent] = useState<number>(0)
    const [trashCost, setTrashCost] = useState<number>(0)

    const [regions, setRegions] = useState<Region[]>([])
    const [checkedLocIds, setCheckedLocIds] = useState<number[]>([])
    const [textClient, setTextClient] = useState<string[]>([])
    const [hints, setHints] = useState<Hint[]>([])
    
    let apService = useRef(new ArchipelagoService()).current;

    //Create all controller functions here
    async function connectAndProcess(login: PlayerLogin) {
        console.log("Try connect with Server: " + login.server + " | Name: " + login.name + " | Password: " + login.pass)

        try {
            let value = await apService.connect(onDisconnected, onReceiveItems, onReceiveHint, onHintsInitialized, onReceiveMessage, login)

            console.log("Connected to the Archipelago server!")

            setCheckedLocIds(apService.getCheckedLocationIds())

            setPlayerName(login.name)

            const tmpTrashDataStorageKey = "BEx_slot:" + apService.client.players.self.slot + "_" + login.name + ":trash_used"
            setTrashDataStorageKey(tmpTrashDataStorageKey)
            setTrashSpent(Number(await apService.getServerDataStorage(tmpTrashDataStorageKey)))

            await SetupSlot(value)

            setActive(true)

            return true;

        } catch (error) {
            console.log(error)
            console.error
            return false;
        }
    }

    async function SetupSlot(slotData: JSONRecord) {
        console.log("Setup Slot")
        let treasuresToGoal = ("treasures_to_goal" in slotData ? slotData["treasures_to_goal"] : slotData["beaten_to_goal"]) as number
        let hintShopCost = "hint_shop_cost" in slotData ? slotData["hint_shop_cost"] as number : 20
        let runesReq = "runes_required" in slotData ? slotData["runes_required"] as number : 1

        setPlayerOptions(new PlayerOptions(treasuresToGoal, runesReq, hintShopCost))
        const allRegions = await createRegions(slotData["hint_data"] as JSONRecord) as Region[]

        setRegions(allRegions)

        const trashInWorld = allRegions.flatMap(reg => reg.locations).length - ((allRegions.length -1) * runesReq); 
        const tmpTrashCost = Math.round(trashInWorld * (hintShopCost/100))

        setTrashCost((tmpTrashCost <= 1) ? 1 : tmpTrashCost)
    }

    async function createRegions(objectives: JSONRecord) {
        let allLocationIds = apService.getAllLocationIds()
        let allLocations: Location[] = []

        try {
            let scoutedItems = await apService.scoutLocations(allLocationIds)

            //Create Locations
            console.log("Create Locations")
            for (const id of allLocationIds) {
                allLocations = allLocations.concat(new Location(
                    apService.getLocationName(id), 
                    id, 
                    objectives[id.toString()] as string,
                    scoutedItems.find(value => value.locationId === id)
                ))
            }
            
            //Create Regions
            console.log("Create Regions")
            let allRegions: Region[] = []

            for (const [name,treasure] of Object.entries(RegionData)) {
                const regionLocs = allLocations.filter(loc => loc.regionName == name)

                if (regionLocs.length == 0) continue

                allRegions = allRegions.concat(new Region(name, treasure, regionLocs))
            }

            return allRegions

        } catch (error) {
            console.log(error)
            console.error
        }
    }

    function disconnect() {
        console.log("Logging player out")
        apService.disconnect()
    }

    function resetData() {
        console.log("Resetting client data")
        setActivePage("Home")
        setActive(false)
        setPlayerName("name")
        setPlayerOptions(new PlayerOptions(0,0,0))
        setRunesAquired([])
        setTrashAquired(0)
        setRegions([])
        setCheckedLocIds([])
        setTextClient([])
        setToasts([])
    }

    function onReceiveItems(items: Item[]) {
        for (let item of items) {
            console.log("Give item: " + item.name);

            if (item.name.endsWith("Rune") && !item.name.startsWith("Broken")) {
                setRunesAquired(curr => [...curr, item.name])
                isActive && openToast(new Notification("You have received a " + item.name, "default", "!"), 10000)
            }
            else {
                setTrashAquired(curr => curr + 1)
            }
        }
    }

    function onReceiveHint(hint: Hint) {
        console.log("Hint received: " + hint.item.receiver.alias + "'s " + hint.item.name + " is at " + hint.item.locationName + " in " + hint.item.sender.alias + "'s world")
        if (hint.item.receiver == apService.client.players.self) {
            openToast(new Notification("Your " + hint.item.name + " is at " + hint.item.locationName + " in " + hint.item.sender.alias + "'s world", "default", "!", true), 10000)
        }
        else {
            openToast(new Notification(hint.item.receiver.alias + "'s " + hint.item.name + " is at your " + hint.item.locationName, "default", "!"), 10000)
        }
        setHints(curr => [...curr, hint])
    }

    function onHintsInitialized(hints: Hint[]) {
        console.log("Initializing Hints")
        setHints(hints)
        for (let hint of hints) {
            console.log(hint.item.receiver.alias + "'s " + hint.item.name + " is at " + hint.item.locationName + " in " + hint.item.sender.alias + "'s world")
        }
    }

    function onDisconnected() {
        console.log("Archipelago Disconnected")
        resetData()
    }

    function onReceiveMessage(msg: string) {
        console.log("Message received: " + msg)
        setTextClient(curr => [...curr, msg])
    }

    function sendMessage(msg: string) {
        console.log("Message Sent: " + msg)
        apService.sendMessage(msg)
    }

    function sendLocation(loc: Location) {
        console.log("Location Sent: " + loc.name)
        apService.sendLocation(loc.id)
        setCheckedLocIds(curr => [...curr, loc.id])
        openToast(new Notification(("You sent a " + loc.getScoutedItemString()), loc.getScoutedItemType(), "check", true))

        // Check if treasure was also found
        let reg = regions.find(reg => reg.name == loc.regionName)!
        if (reg.getTreasureFoundNow(checkedLocIds, loc)) {
            openToast(new Notification("Congratulations! You have found the " + reg.treasureName + "!", "highlighted", "check", false, "highlighted"), 12000)
        }
    }

    function sendGoal() {
        console.log("Goal Sent!")
        apService.sendGoal()
        openToast(new Notification("Congratulations! You have goaled!", "highlighted", "check", false, "highlighted"))
    }
    
    function sendHint() {        
        const trashAvailable = trashAquired - trashSpent

        if (trashAvailable < trashCost) {
            openToast(new Notification("You do not have enough trash to pay for this hint!", "warning", "!", false))
            console.log("Player didn't have enough available trash to hint")
        }
        else {
            const locIdsWithHint = hints.filter(hint => hint.item.sender.name == playerName).flatMap(hint => hint.item.locationId)
            const availableLocations = regions.flatMap(reg => reg.locations).filter(loc => !loc.getIsInList(checkedLocIds) && !loc.getIsInList(locIdsWithHint))
            if (availableLocations.length <= 0) {
                openToast(new Notification("You have no unhinted locations to hint!", "warning", "!", false))
                console.log("Player had no unhinted locations to hint")
            }
            else {
                const rndLocation = availableLocations[Math.floor(Math.random() * availableLocations.length)];

                console.log("Player sent location hint for location with id: " + rndLocation.id + " to server");
                apService.sendLocationHint(rndLocation.id)

                console.log("Updating Trash Spent")
                setTrashSpent(trashSpent + trashCost)
                apService.updateServerDataStorage(trashDataStorageKey, (trashSpent + trashCost).toString())

                openToast(new Notification("Hint was purchased!", "default", "check", false))
            }
        }
    }

    return (
        <SessionContext value={{ 
                textClient: textClient, 
                apService: apService, 
                checkedLocIds: checkedLocIds,
                playerName: playerName, 
                isActive: isActive, 
                regions: regions, 
                playerOptions: playerOptions, 
                runesAquired: runesAquired,
                trashAquired: trashAquired,
                trashSpent: trashSpent,
                trashCost:trashCost,
                activePage: activePage,
                hints: hints,
                sendHint: sendHint,
                setActivePage: setActivePage,
                connectAndProcess: connectAndProcess, 
                disconnect: disconnect,
                sendMessage: sendMessage, 
                sendLocation: sendLocation,
                sendGoal: sendGoal,
            }}>
            {children}
        </SessionContext>
    )
}