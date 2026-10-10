import type { Item } from "archipelago.js";
import { getItemType } from "../HelperFunctions";

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
    return getItemType(this.scoutedItem!)
  }
}