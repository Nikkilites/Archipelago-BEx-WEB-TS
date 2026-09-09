import type { Item } from "archipelago.js";

export class Location {
  name: string;
  id: number;
  objective: string;
  regionName: string;
  scoutedItem: Item | undefined;

  public constructor(name: string, id: number, objective: string, scoutedItem: Item | undefined)
  {
    this.name = name;
    this.id = id;
    this.objective = objective;
    this.regionName = name.split(" in ")[1].split(" Island")[0];
    this.scoutedItem = scoutedItem;
  }

  public getIsInList(locationIds: number[]) {
    return locationIds.includes(this.id)
  }

  public getScoutedItemString(): string {
    return this.scoutedItem?.name + " to " + this.scoutedItem?.receiver.alias
  }

  public getScoutedItemType(): string {
    if (this.scoutedItem?.progression) {
      return "progression" 
    }
    else if (this.scoutedItem?.useful) {
      return "useful" 
    }
    else if (this.scoutedItem?.trap) {
      return "trap" 
    }
    else if (this.scoutedItem?.filler) {
      return "filler" 
    }
    else {
      return "none" 
    }
  }
}