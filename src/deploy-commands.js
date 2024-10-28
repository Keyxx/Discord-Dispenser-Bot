import  { REST, Routes }  from 'discord.js';
import 'dotenv/config';

import fs from 'node:fs';


const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
        const command = (await import(`./commands/${file}`)).default;
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ./commands is missing a required "data" or "execute" property.`);
		}
	}


const rest = new REST().setToken(process.env.CLIENT_TOKEN);

async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.SERVER_ID),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
};
