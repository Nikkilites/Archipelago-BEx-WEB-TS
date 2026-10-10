import type { Item } from "archipelago.js"

export function getItemType(item: Item): string {
    if (item.progression) {
        return "progression" 
    }
    else if (item.useful) {
        return "useful" 
    }
    else if (item.trap) {
        return "trap" 
    }
    else if (item.filler) {
        return "filler" 
    }
    else {
        return "none" 
    }
}