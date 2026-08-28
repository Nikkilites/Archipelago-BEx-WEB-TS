import { type ReactNode } from "react";

import { SessionContext } from "./SessionContext";

import { Region } from "../bex/model/Region";
import { Location } from "../bex/model/Location";
import { PlayerOptions } from "../bex/model/PlayerOptions";

type SessionProviderProps = {
    children: ReactNode
    something: string
}

export function SessionProvider({ children }: SessionProviderProps) {
    
    //Create all controller functions here


    //Dummy Data:
    const options = new PlayerOptions(5, 2, 50)

    const regions = [
        new Region("Starting", "Archipelago Map", 0, [
                new Location("Slay the Bear in Starting Island", 1, "Complete a chapter of The Silent Age", true), 
                new Location("Slay the Crab in Starting Island", 3, "Complete a chapter of The Silent Age", true)
            ]
        ),
        new Region("Board Game", "Golden Meeple", 2, [
                new Location("Slay the Bear in Starting Island", 1, "Complete a chapter of The Silent Age", true), 
                new Location("Slay the Crab in Starting Island", 3, "Complete a chapter of The Silent Age", false)
            ]
        ),
        new Region("Desert", "Desert Talisman", 2, [
                new Location("Slay the Elemental in Desert Island", 186, "Complete a chapter of The Silent Age", true), 
                new Location("Slay the Elemental in Desert Island", 182, "Complete a chapter of The Silent Age", true), 
                new Location("Opened the Sturdy Barrel in Desert Island", 187, "Get a Gold Medal in Cook, Serve, Delicious! 2!!", false)
            ]
        ),
        new Region("Puzzle", "Missing Piece", 2, [
                new Location("Slay the Elemental in Desert Island", 1386, "Complete a chapter of The Silent Age", true), 
                new Location("Slay the Elemental in Desert Island", 234, "Complete a chapter of The Silent Age", false), 
                new Location("Opened the Sturdy Barrel in Desert Island", 64, "Get a Gold Medal in Cook, Serve, Delicious! 2!!", false)
            ]
        ),
        new Region("Orchard", "Orchard Sicle", 1, [
                new Location("Slay the Wolf in Orchard Island", 10, "Play a session of DREDGE", false), 
                new Location("Slay the Bear in Orchard Island", 94, "Play a session of DREDGE", false),
                new Location("Slay the Goblin in Orchard Island", 15, "Play a session of DREDGE", false), 
                new Location("Slay the Eagle in Orchard Island", 5, "Play a session of DREDGE", false),
                new Location("Slay the Minotaur in Orchard Island", 80, "Play a session of DREDGE", false), 
                new Location("Slay the Lizardman in Orchard Island", 56, "Play a session of DREDGE", false),
                new Location("Slay the Centaur in Orchard Island", 21, "Play a session of DREDGE", false), 
                new Location("Opened the Sturdy Coffin in Orchard Island", 18, "Get a Gold Medal in Cook, Serve, Delicious! 2!!", false),
                new Location("Opened the Giant Crate in Orchard Island", 18, "Get a Gold Medal in Cook, Serve, Delicious! 2!!", false),
                new Location("Opened the Black Barrel in Orchard Island", 94, "Get a Gold Medal in Cook, Serve, Delicious! 2!!", false), 
                new Location("Opened the Heavy Sarcophagus in Orchard Island", 31, "Get a Gold Medal in Cook, Serve, Delicious! 2!!", false),
            ]
        )
    ]
    
    return (
        <SessionContext value={{ playerName: "Nikki", isActive: false, regions: regions, options: options}}>
            {children}
        </SessionContext>
    )
}