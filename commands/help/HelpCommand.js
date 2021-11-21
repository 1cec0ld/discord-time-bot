import Command from '../Command.js';
import {MessageEmbed} from 'discord.js';
import CommandProvider from '../CommandProvider.js';
class HelpCommand extends Command {
  constructor() {
    super('help', 'Responds with this message', (client, trigger, content) =>
      this.execute(trigger),
    );
  }

  execute(trigger) {
    const embed = new MessageEmbed();
    embed.setColor('#0099ff');
    embed.setFooter('Powered by Discord Time Bot');
    CommandProvider.getCommandLabels().forEach((commandLabel) => {
      embed.addField(
        '/' + commandLabel + ' or !' + commandLabel,
        CommandProvider.getCommand(commandLabel)['help'],
      );
    });
    trigger
      .reply({
        allowedMentions: {repliedUser: false},
        content: 'Commands I can respond to:',
        embeds: [embed],
        ephemeral: true,
      })
      .then((sentMsg) => {
        // done by Interaction, no need to clean up
        if ('isCommand' in trigger) return;
        trigger.delete().catch((anyError) => {
          console.error(
            `Tried to delete sender's prompt after someone else already did`,
          );
        });
        setTimeout(() => {
          sentMsg.delete().catch((anyError) => {
            console.error(
              `Tried to delete my response after someone else already did`,
            );
          });
        }, 15000);
      })
      .catch((anyError) => {
        trigger.channel.send('Something broke. Please contact my creator.');
        console.error(anyError);
      });
  }
}

export default HelpCommand;
