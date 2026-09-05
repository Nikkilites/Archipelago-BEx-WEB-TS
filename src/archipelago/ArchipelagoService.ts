import { Client, Item } from "archipelago.js";

export class ArchipelagoService {
    client = new Client();

    async connect(onDisconnected: () => void, onReceiveItems: (items: Item[]) => void, onReceiveMessage: (msg: string) => void, server: string, name: string, pass: string) {

        //Create Listeners:
        let messageListener = (content: string) => {
            onReceiveMessage(content);
        };
        let itemsListener = (content: Item[]) => {
            onReceiveItems(content);
        };
        let disconnectedListener = () => {
            onDisconnected();

            this.client.messages.off("message", messageListener);
            this.client.items.off("itemsReceived", itemsListener);
            this.client.socket.off("disconnected", disconnectedListener);
        };

        //Start Listeners:
        this.client.messages.on("message", messageListener);
        this.client.items.on("itemsReceived", itemsListener);
        this.client.socket.on("disconnected", disconnectedListener)

        //Login:
        return await this.client.login(server, name, "Backlog Expedition", {slotData: true, password: pass})
    }

    public disconnect() {
        this.client.socket.disconnect()
    }

    public sendLocation(locId: number) {
        this.client.check(locId)
    }

    public sendLocationHint(locId: number) {
        this.client.hint([locId])
    }

    public sendMessage(msg: string) {
        this.client.messages.say(msg)
    }

    public getLocationName(locId: number): string {
        return this.client.package.lookupLocationName("Backlog Expedition", locId)
    }

    public getAllLocationIds(): number[] {
        return this.client.room.allLocations
    }

    public getCheckedLocationIds(): number[] {
        return this.client.room.checkedLocations
    }

    async scoutLocations(locIds: number[]) {
        return await this.client.scout(locIds,0)
    }
}
