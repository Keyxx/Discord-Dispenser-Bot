import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('inspire')
		.setDescription('Gives you a great inspirational image :)'),
	async execute(interaction) {
        //http://api.adviceslip.com/advice
        const headers = new Headers({
            "Content-Type": "text/plain",
          });
          
          var requestOptions = {
            method: 'GET',
            headers: headers,
          };
          
          try{
            const text = await fetch("https://inspirobot.me/api?generate=true", requestOptions)
            .then(response => response.text());
            await interaction.reply(text);
          } catch (error){
            console.log('error', error)
          }	
	},
};