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
    this.regionName = name.split("in ")[1].split(" Island")[0];
    this.scoutedItem = scoutedItem;
  }

  public getIsChecked(checkedLocationIds: number[]) {
    return checkedLocationIds.includes(this.id)
  }
}