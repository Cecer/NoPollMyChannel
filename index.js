const BOT_TOKEN = "BOT_TOKEN_HERE";

const {Client, GatewayIntentBits, GatewayDispatchEvents, Message} = require("discord.js");

class CustomClient extends Client {
    
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds, 
                GatewayIntentBits.GuildMessages, 
                GatewayIntentBits.MessageContent
            ]
        });

        // Process the raw message creation event on the web socket.
        this.ws.on(GatewayDispatchEvents.MessageCreate, data => {
            if (data.poll) { // If it has a truthy poll field, it's a poll.
                console.log(`Deleting poll ${data.id} by ${data.author.id} in ${data.channel_id}`);
                new Message(this, data).delete();
            }
        });
    }
}


new CustomClient().login(BOT_TOKEN);
