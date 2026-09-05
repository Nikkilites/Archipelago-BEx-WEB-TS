import { Client, Item } from "archipelago.js";

export class ArchipelagoService {
    client = new Client();

    async connect(onDisconnected: () => void, onReceiveItems: (items: Item[]) => void, onReceiveMessage: (msg: string) => void, server: string, name: string, pass: string) {

        this.client.messages.on("message", (content) => {
            onReceiveMessage(content);
        });

        this.client.items.on("itemsReceived", (content) => {
            onReceiveItems(content);
        });

        this.client.socket.on("disconnected", () => {
            onDisconnected()
            this.client.messages.off
            this.client.items.off
        })

        const promise = await this.client.login(server, name, "Backlog Expedition", {slotData: true, password: pass})

        return promise
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

    public scoutLocations(locIds: number[]) {
        return this.client.scout(locIds,0)
    }
}
