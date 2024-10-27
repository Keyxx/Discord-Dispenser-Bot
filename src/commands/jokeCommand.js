import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Generates a random joke'),
	async execute(interaction) {

        const headers = new Headers({
            "Accept": "application/json"
          });
        var requestOptions = {
            method: 'GET',
            headers: headers,
          };
          
          try{
            const json = await fetch("https://icanhazdadjoke.com/", requestOptions)
            .then(response => response.json());
            await interaction.reply(json.joke);
          } catch (error){
            console.log('error', error)
          }
	}
};