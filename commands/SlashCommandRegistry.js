import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';


export default class SlashCommandRegistry{
    
    constructor(client){
        this.client = client;
    }
    
    registerAllSlashCommands(commands_object) {
        const commands_output = [];
        for (let command_label in commands_object) {
            commands_output.push(
                    new SlashCommandBuilder().setName(command_label)
                    .setDescription("The response to this won't be visible to others")
                    .addStringOption(option => option.setName("parameters").setDescription("The parameters to the command"))
            );
        }
  
        const rest = new REST({ version: '9'}).setToken(process.env.TOKEN);

        (async () => {
            try {
                if(process.env.DEV == 'true'){
                    console.log(`Registering guild slash commands`);
                    const GUILD_ID = process.env.GUILD_ID;
                    await rest.put(Routes.applicationGuildCommands(this.client.user.id, process.env.GUILD_ID),
                    {body: commands_output});
                } else {
                    console.log(`Registering global slash commands`);
                    await rest.put(Routes.applicationCommands(this.client.user.id),
                    {body: commands_output});
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }
}