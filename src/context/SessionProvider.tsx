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
    const [trashAquired, setTrashAquired] = useState<number>(0)
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
        await createRegions(slotData["hint_data"] as JSONRecord)
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

            setRegions(allRegions)

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
                items.length <= 1 && openToast(new Notification("You have received a " + item.name, crypto.randomUUID(), false, "none"), 10000)
            }
            else {
                setTrashAquired(curr => curr++)
            }
        }
    }

    function onReceiveHint(hint: Hint) {
        console.log("Hint received: " + hint.item.receiver.alias + "'s " + hint.item.name + " is at " + hint.item.locationName + " in " + hint.item.sender.alias + "'s world")
        if (hint.item.receiver == apService.client.players.self) {
            openToast(new Notification("Your " + hint.item.name + " is at " + hint.item.locationName + " in " + hint.item.sender.alias + "'s world", crypto.randomUUID(), false, "none"), 10000)
        }
        else {
            openToast(new Notification(hint.item.receiver.alias + "'s " + hint.item.name + " is at your " + hint.item.locationName, crypto.randomUUID(), false, "none"), 10000)
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
        openToast(new Notification(("You sent a " + loc.getScoutedItemString()), crypto.randomUUID(), true, loc.getScoutedItemType()))
    }

    function sendGoal() {
        console.log("Goal Sent!")
        apService.sendGoal()
        openToast(new Notification(("You have goaled!"), crypto.randomUUID(), false, "none"))
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
                activePage: activePage,
                hints: hints,
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