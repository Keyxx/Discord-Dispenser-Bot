
import 'dotenv/config';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';

import fs from 'node:fs';

//Set Intent bits, this shows what the bot is allowed to do. More info about these bits on discord.js page:
//https://discordjs.guide/popular-topics/intents.html

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessageReactions

	]
});

// Set list of all commands in commands folder
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = (await import(`./commands/${file}`)).default;
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at /commands/${file} is missing a required "data" or "execute" property.`);
	}
}

// Set list of event listeners. E.g when message created or when client connected
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles){

	const { event } = await import(`./events/${file}`);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}else if (event.on) {
		client.on(event.name, (...args) => event.execute(...args));
	}else {
		console.log("Event handler encountered a problem");
	}
}

// Bot logs into server
client.login(process.env.CLIENT_TOKEN).catch((e) => console.log(e));
