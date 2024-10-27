import { Events, Client} from 'discord.js';
export const event ={
    on: Client.on,
    name: Events.MessageCreate,
    async execute(message){

        try {
            console.log("Unimplemented");
        } catch (error) {
            console.error(error);
            if (message.replied || message.deferred) {
                await message.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
};