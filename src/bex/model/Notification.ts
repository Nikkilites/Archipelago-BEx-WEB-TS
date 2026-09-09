export class Notification {
  name: string;
  id: string;
  useCopyButton: boolean;
  usefulness: string;

  public constructor(name: string, id: string, useCopyButton: boolean, usefulness: string)
  {
    this.name = name;
    this.id = id;
    this.useCopyButton = useCopyButton;
    this.usefulness = usefulness;
  }
}