import { SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';

export default {
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('Posts a picture of a dog'),
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
            const json = await fetch("https://api.thedogapi.com/v1/images/search?api_key=YOUR_API_KEY", requestOptions)
            .then(response => response.json());
            await interaction.reply(json[0].url);
            console.log(json[0].url);
          } catch (error){
            console.log('error', error)
          }	
	}
};