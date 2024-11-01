import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Posts a picture of a cat'),
	async execute(interaction) {
        const headers = new Headers({
            "Content-Type": "application/json",
            "x-api-key": process.env.DOG_API_KEY
          });
          
          var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
          };
          
          try{
            const json = await fetch("https://api.thecatapi.com/v1/images/search", requestOptions)
            .then(response => response.json());
            await interaction.reply(json[0].url);
          } catch (error){
            console.log('error', error)
          }	
	},
};