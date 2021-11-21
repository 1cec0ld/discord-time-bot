import Command from '../Command.js';
class PingCommand extends Command {
    constructor() {
        super("ping", "Ping the bot", (client, message) => {
            message.reply({content: "Pong!", ephemeral: true, allowedMentions: {repliedUser: false}})
            .catch(anyError => {
                message.channel.send("Something broke. Please contact my creator.");
                console.error(anyError);
            });
        });
    }
}

export default PingCommand;