import { Events, Client, REST, Routes } from 'discord.js';
import 'dotenv/config';

import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const event = {
    on: Client.on,
    name: Events.GuildCreate,

    async execute(guild) {
        const path = await import("node:path");
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const commands = [];

        const commandFiles = fs.readdirSync(process.env.COMMANDS_PATH).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = (await import(path.join(process.env.COMMANDS_PATH, file))).default;
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
            } else {
                console.log(`[WARNING] The command at ${command} is missing a required "data" or "execute" property.`);
            }
        }


        const rest = new REST().setToken(process.env.CLIENT_TOKEN);


        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
            const data = await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, guild.id),
                { body: commands },
            );
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }

    }
}