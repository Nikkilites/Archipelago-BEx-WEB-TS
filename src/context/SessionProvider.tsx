import { useState, type ReactNode } from "react";
import type { Item, JSONRecord } from "archipelago.js";

import { SessionContext } from "./SessionContext";
import { ArchipelagoService } from "../archipelago/ArchipelagoService";

import { Region } from "../bex/model/Region";
import { Location } from "../bex/model/Location";
import { PlayerOptions } from "../bex/model/PlayerOptions";
import { RegionData } from "../bex/data/RegionData";

type SessionProviderProps = {
    children: ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
    const [isActive, setActive] = useState<boolean>(false)
    const [playerName, setPlayerName] = useState<string>("name")
    const [playerOptions, setPlayerOptions] = useState<PlayerOptions>(new PlayerOptions(0,0,0))
    const [runesAquired, setRunesAquired] = useState<string[]>([])
    const [trashAquired, setTrashAquired] = useState<number>(0)
    const [regions, setRegions] = useState<Region[]>([])
    const [checkedLocIds, setCheckedLocIds] = useState<number[]>([])
    const [textClient, setTextClient] = useState<string[]>([])
    
    const apService = new ArchipelagoService()
    let receivedItems: Item[] = []

    //Create all controller functions here
    async function connectAndProcess(server: string, name: string, pass: string) {
        console.log("Try connect with Server: " + server + " | Name: " + name + " | Password: " + pass)

        resetData()

        try {
            let value = await apService.connect(onDisconnected, onReceiveItems, onReceiveMessage, server, name, pass)

            console.log("Connected to the Archipelago server!")

            setCheckedLocIds(apService.getCheckedLocationIds())

            setPlayerName(name)
            SetupSlot(value)

            setActive(true)
            giveItems(receivedItems)

            return true;

        } catch (error) {
            console.log(error)
            console.error
            return false;
        }
    }

    function SetupSlot(slotData: JSONRecord) {
        let treasuresToGoal = ("treasures_to_goal" in slotData ? slotData["treasures_to_goal"] : slotData["beaten_to_goal"]) as number
        let hintShopCost = "hint_shop_cost" in slotData ? slotData["hint_shop_cost"] as number : 20

        setPlayerOptions(new PlayerOptions(treasuresToGoal, slotData["runes_required"] as number, hintShopCost))
        createRegions(slotData["hint_data"] as JSONRecord)
    }

    function createRegions(objectives: JSONRecord) {
        let allLocationIds = apService.getAllLocationIds()
        let allLocations: Location[] = []

        apService.scoutLocations(allLocationIds)
            .then((scoutedItems) => {

                //Create Locations
                for (const id of allLocationIds) {
                    allLocations = allLocations.concat(new Location(
                        apService.getLocationName(id), 
                        id, 
                        objectives[id.toString()] as string,
                        scoutedItems.find(value => value.locationId === id)
                    ))
                }
                
                //Create Regions
                let allRegions: Region[] = []

                for (const [name,treasure] of Object.entries(RegionData)) {
                    const regionLocs = allLocations.filter(loc => loc.regionName == name)

                    if (regionLocs.length == 0) continue

                    allRegions = allRegions.concat(new Region(name, treasure, regionLocs))
                }

                setRegions(allRegions)
            })
            .catch(console.error)
    }

    function disconnect() {
        console.log("Logging player out")
        apService.disconnect()
    }

    function resetData() {
        setActive(false)
        setPlayerName("name")
        setPlayerOptions(new PlayerOptions(0,0,0))
        setRunesAquired([])
        setTrashAquired(0)
        setRegions([])
        setCheckedLocIds([])
        setTextClient([])
    }

    function onReceiveItems(items: Item[]) {
        console.log("Item received: " + items)

        if (isActive) giveItems(items)
        else receivedItems = receivedItems.concat(items)
    }

    function onDisconnected() {
        console.log("Archipelago Disconnected")
        resetData()
    }

    function onReceiveMessage(msg: string) {
        console.log("Message received: " + msg)
        setTextClient(curr => [...curr, msg])
    }

    function giveItems(items: Item[]) {
        for (let item of items) {
            console.log("Give item: " + item.name);

            if (item.name.endsWith("Rune") && !item.name.startsWith("Broken")) {
                setRunesAquired(curr => [...curr, item.name])
            }
            else {
                setTrashAquired(curr => curr++)
            }
        }
    }

    function sendMessage(msg: string) {
        console.log("Message Sent: " + msg)
    }

    function sendLocation(loc: Location) {
        console.log("Location Sent: " + loc.name)
        apService.sendLocation(loc.id)
        setCheckedLocIds(curr => [...curr, loc.id])
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
                connectAndProcess: connectAndProcess, 
                disconnect: disconnect,
                sendMessage: sendMessage, 
                sendLocation: sendLocation,
            }}>
            {children}
        </SessionContext>
    )
}