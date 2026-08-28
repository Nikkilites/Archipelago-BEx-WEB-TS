export class Location {
  name: string;
  id: number;
  objective: string;
  regionName: string;
  isChecked: boolean;

  public constructor(name: string, id: number, objective: string, isChecked: boolean = false)
  {
    this.name = name;
    this.id = id;
    this.objective = objective;
    this.regionName = name.split("in ", 1)[0];
    this.isChecked = isChecked;
  }
}