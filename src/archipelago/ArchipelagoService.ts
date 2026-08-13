import { Client } from "archipelago.js";

// Login to the server. Replace `archipelago.gg:XXXXX` and `Phar` with the address/url and slot name for your room.
// If no game is provided, client will connect in "TextOnly" mode, which is fine for this example.
export function connect() {
    // Create a new instance of the Client class.
    const client = new Client();

    // Set up an event listener for whenever a message arrives and print the plain-text content to the console.
    client.messages.on("message", (content) => {
        console.log(content);
    });

    client.login("archipelago.gg:40831", "Nikki")
        .then(() => console.log("Connected to the Archipelago server!"))
        .catch(console.error);
}
