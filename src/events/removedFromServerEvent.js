import 'dotenv/config';
import { Events, Client, REST, Routes } from 'discord.js';

export const event = {
    once: Client.once,
    name: Events.GuildDelete,
    async execute(guild) {

        const rest = new REST().setToken(process.env.CLIENT_TOKEN);
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guild.id), { body: [] })
            .then(() => console.log('Successfully deleted all guild commands.'))
            .catch(console.error);
    }
}