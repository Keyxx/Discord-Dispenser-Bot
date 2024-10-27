import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('advice')
		.setDescription('Gives you life advice'),
	async execute(interaction) {
        //http://api.adviceslip.com/advice
        const headers = new Headers({
            "Content-Type": "application/json",
          });
          
          var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
          };
          
          try{
            const json = await fetch("http://api.adviceslip.com/advice", requestOptions)
            .then(response => response.json());
            await interaction.reply(json.slip.advice);
          } catch (error){
            console.log('error', error)
          }	
	},
};