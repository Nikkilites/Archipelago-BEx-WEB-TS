import type { Location } from "./Location";

export class Region {
    name: string;
    islandName: string;
    runeName: string;
    runeCount: number;
    treasureName: string;
    locations: Location[];

  public constructor(name: string, treasureName: string, runeCount: number, locations: Location[])
  {
    this.name = name;
    this.islandName = name + " Island";
    this.runeName = name + " Rune";
    this.runeCount = runeCount;
    this.treasureName = treasureName;
    this.locations = locations;
  }

  public getIsOpen(runesReq: number) {
    return (this.runeCount >= runesReq || this.name === "Starting")
  }

  public getIsFinished() {
    return this.locations.filter(loc => !loc.isChecked).length === 0
  }

  public getTreasureFound() {
    return this.locations.filter(loc => !loc.isChecked && loc.name.charAt(0) === 'S').length === 0
  }
}