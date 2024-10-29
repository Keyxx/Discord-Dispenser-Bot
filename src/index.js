
import 'dotenv/config';
import { Client, Collection, GatewayIntentBits } from 'discord.js';

import fs from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const path = await import("node:path");
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Set Intent bits, this shows what the bot is allowed to do on the server. More info about these bits on discord.js page:
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
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {


	const command = (await import(path.join(commandsPath,file))).default;

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[ERROR] The command at ${comnand} is missing a required "data" or "execute" property.`);
	}
}

// Set list of event listeners. E.g when message created or when client connected
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles){
	
	const { event } = await import(path.join(eventsPath,file));

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}else if (event.on) {
		client.on(event.name, (...args) => event.execute(...args));
	}else {
		console.log(`[ERROR] Event handler encountered a problem with event ${event}`);
	}
}

// Bot logs into server
client.login(process.env.CLIENT_TOKEN).catch((e) => console.log(e));
