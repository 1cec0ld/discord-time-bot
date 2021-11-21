import Command from '../Command.js';
class PingCommand extends Command {
  constructor() {
    super('ping', 'Ping the bot', (client, trigger, content) => {
      trigger
        .reply({
          content: 'Pong!',
          ephemeral: true,
          allowedMentions: {repliedUser: false},
        })
        .catch((anyError) => {
          trigger.channel.send('Something broke. Please contact my creator.');
          console.error(anyError);
        });
    });
  }
}

export default PingCommand;
