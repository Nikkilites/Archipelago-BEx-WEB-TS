export class PlayerOptions {
  TreasuresToGoal: number;
  RunesRequired: number;
  HintShopCost: number;

  public constructor(TreasuresToGoal: number, RunesRequired: number, HintShopCost: number)
  {
    this.TreasuresToGoal = TreasuresToGoal;
    this.RunesRequired = RunesRequired;
    this.HintShopCost = HintShopCost;
  }
}