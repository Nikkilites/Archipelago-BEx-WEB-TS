import { Location } from "./Location";

export class Region {
    name: string;
    islandName: string;
    runeName: string;
    treasureName: string;
    locations: Location[];

  public constructor(name: string, treasureName: string, locations: Location[])
  {
    this.name = name;
    this.islandName = name + " Island";
    this.runeName = name + " Rune";
    this.treasureName = treasureName;
    this.locations = locations;
  }

  public getRuneCount(runesReceived: string[]) {
    return runesReceived.filter(rune => rune == this.runeName).length
  }

  public getIsOpen(runesReceived: string[], runesReq: number) {
    return (this.getRuneCount(runesReceived) >= runesReq || this.name === "Starting")
  }

  public getIsFinished(checkedLocationIds: number[]) {
    return this.locations.filter(loc => loc.getIsChecked(checkedLocationIds)).length == this.locations.length
  }

  public getTreasureFound(checkedLocationIds: number[]) {
    return this.locations.filter(loc => !loc.getIsChecked(checkedLocationIds) && loc.name.charAt(0) === 'S').length == 0
  }
}