import { Client, Hint, Item, type JSONSerializable } from "archipelago.js";
import type { PlayerLogin } from "./PlayerLogin";

export class ArchipelagoService {
    client = new Client();

    async connect(onDisconnected: () => void, onReceiveItems: (items: Item[]) => void, onReceiveHint: (hint: Hint) => void, onHintsInitialized: (hint: Hint[]) => void, onReceiveMessage: (msg: string) => void, login: PlayerLogin) {

        //Create function for Cleanup of Listeners
        const cleanup = () => {
            this.client.messages.off("message", messageListener)
            this.client.items.off("itemsReceived", itemsListener)
            this.client.items.off("hintReceived", hintListener)
            this.client.items.off("hintsInitialized", hintInitListener)
            this.client.socket.off("disconnected", disconnectedListener)
        };

        //Create Listeners:
        const messageListener = (content: string) => {
            onReceiveMessage(content)
        };

        const itemsListener = (content: Item[]) => {
            onReceiveItems(content)
        };

        const hintListener = (content: Hint) => {
            onReceiveHint(content)
        };

        const hintInitListener = (content: Hint[]) => {
            onHintsInitialized(content)
        };

        const disconnectedListener = () => {
            onDisconnected()
            cleanup()
        };

        //Start Listeners:
        this.client.messages.on("message", messageListener)
        this.client.items.on("itemsReceived", itemsListener)
        this.client.items.on("hintReceived", hintListener)
        this.client.items.on("hintsInitialized", hintInitListener)

        //Login:
        try {
            const result = await this.client.login(login.server, login.name, "Backlog Expedition", {slotData: true, password: login.pass})
            this.client.socket.on("disconnected", disconnectedListener)
            return result
        } catch (error) {
            cleanup()
            throw error
        }
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

    public sendGoal() {
        this.client.goal()
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

    async getServerDataStorage(key: string) {
        return await this.client.storage.fetch(key)
    }

    public updateServerDataStorage(key: string, value: JSONSerializable) {
        console.log("Update Server Data Storage " + key + " to " + value)
        return this.client.storage.prepare(key, 0).replace(value).commit()
    }
}
