export class Notification {
  name: string;
  id: string;
  useCopyButton: boolean;
  dotSymbol: string;
  dotColor: string;
  notifStyle: string;

  public constructor(name: string, dotColor: string = "default", dotSymbol: string = "check", useCopyButton: boolean = false, notifStyle: string = "default")
  {
    this.name = name;
    this.id = crypto.randomUUID();
    this.useCopyButton = useCopyButton;
    this.dotColor = dotColor;
    this.dotSymbol = dotSymbol;
    this.notifStyle = notifStyle;
  }
}