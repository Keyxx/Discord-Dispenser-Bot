import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Posts a random meme from reddit'),
	async execute(interaction) {

        const headers = new Headers({
            "Accept": "application/json"
          });
        var requestOptions = {
            method: 'GET',
            headers: headers,
          };
          
          try{
            const json = await fetch("https://meme-api.com/gimme", requestOptions)
            .then(response => response.json());
            await interaction.reply(json.url);
          } catch (error){
            console.log('error', error)
          }
	}
};