import { Events, Client } from 'discord.js';
export const event = {
    once: Client.once,
    name: Events.ClientReady,
    async execute(readyClient){
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    }
}