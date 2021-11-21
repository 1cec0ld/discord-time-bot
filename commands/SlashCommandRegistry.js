import {SlashCommandBuilder} from '@discordjs/builders';
import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';

export default class SlashCommandRegistry {
  constructor(client) {
    this.client = client;
  }

  registerAllSlashCommands(commandsObject) {
    const commandsOutput = [];
    for (const commandLabel in commandsObject) {
      if (commandsObject[commandLabel].hasOwnProperty('name')) {
        commandsOutput.push(
          new SlashCommandBuilder()
            .setName(commandLabel)
            .setDescription(`The response to this won't be visible to others`)
            .addStringOption((option) =>
              option
                .setName('parameters')
                .setDescription('The parameters to the command'),
            ),
        );
      }
    }

    const rest = new REST({version: '9'}).setToken(process.env.TOKEN);

    (async () => {
      try {
        if (process.env.DEV == 'true') {
          await rest.put(
            Routes.applicationGuildCommands(
              this.client.user.id,
              process.env.GUILD_ID,
            ),
            {body: commandsOutput}
          );
        } else {
          await rest.put(Routes.applicationCommands(this.client.user.id), {
            body: commandsOutput
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }
}
