
import 'dotenv/config';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';

import fs from 'node:fs';

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

client.login(process.env.CLIENT_TOKEN).catch((e) => console.log(e));



// The message event handles all messages
/*client.on("messageCreate", m => {

	if(m.content === "!help"){
		m.reply("Hello! here are my commands: \n " +
		"!insultme - Generate a random insult \n " + 
		"!cat - get random picture of a cat \n" + 
		"!dog - get random picture of a dog \n" + 
		"!joke - get a random joke \n" +
		"!advice - get a random advice from the bot");
		console.log("bussin");
	}


	/*if(m.content.startsWith("!game")){
		var rest = m.content.split(" ");
		rest.splice(0, 1);
		var game = rest.join(" ");
		console.log(game);
		client.user.setPresence({ game: { name: game , type: 0 } } );
	}
	
	if (m.content === "!Shirobon goodnight"){
		
		m.mesg("Goodnight Everyone, I am off!");
		client.destroy();
	}
	
	if (m.content === "!insultme") {
		var pre = Math.floor((Math.random() * presentence.length - 1) +1);
		var first = Math.floor((Math.random() * firstins.length - 1 ) + 1);
		var second = Math.floor((Math.random() * secondins.length - 1 ) + 1);
		var third = Math.floor((Math.random() * thirdins.length - 1 ) + 1);
		

		m.reply(presentence[pre] + " " + firstins[first] + " " + secondins[second] + " " + thirdins[third]);
		
	}

	if(m.content === "!yesno"){
		var jsonstr = "";	
		request("https://yesno.wtf/api/", function(error, response, body) {
			jsonstr = JSON.parse(body);
			m.reply(jsonstr.image);
		});
	}	

	if(m.content === "!joke"){
			var sys = require('sys')
			var exec = require('child_process').exec;
			var child;
			// executes `pwd`
			child = exec("curl -H \"Accept: application/json\" https://icanhazdadjoke.com/", function (error, stdout, stderr) {
				var jsonstr = JSON.parse(stdout);
				m.mesg(jsonstr.joke);
				if (error !== null) {
					console.log('exec error: ' + error);
				}
			});
	}
	
	if(m.content === "!dog"){
		var jsonstr = "";	
		var dogg = Math.floor((Math.random() * dogs.length - 1) +1);
		request("https://api.thedogapi.com/v1/images/search", function(error, response, body) {
			try{
				jsonstr = JSON.parse(body);
				m.mesg(jsonstr[0].url);
				m.mesg(dogs[dogg]);
			}	
			catch(err){
				m.mesg("There was an error, please try again later");
			}
		});
	}

	if(m.content === "!cat"){
		var xmlstr = "";
		var catt = Math.floor((Math.random() * cats.length - 1) +1);
		request("http://thecatapi.com/api/images/get?format=xml", function(error, response, body) {
			const parseString = require('xml2js-parser').parseString;
			var string = body.substring(body.lastIndexOf('<url>') + 5, body.lastIndexOf('</url>'));
			m.mesg(string);
			m.mesg(cats[catt]);
		});
	}
	
	if(m.content === "!advice"){
		var jsonstr = "";	
		request("http://api.adviceslip.com/advice", function(error, response, body) {
			jsonstr = JSON.parse(body);
			m.mesg(jsonstr.slip.advice);
		});
	}
});*/

// This function is used by &init to handle connection errors
/*function error(e) {
	console.log(e.stack);
	process.exit(0);
}*/


// Login using the username and password specified above and catch any errors
