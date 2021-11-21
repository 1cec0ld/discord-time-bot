import Command from '../Command.js';
import { MessageEmbed } from 'discord.js';
import CommandProvider from '../CommandProvider.js';
class HelpCommand extends Command {

    constructor() {
        super("help", "Responds with this message", (client, message) => this.execute(message));
    }

    execute(message) {
        var embed = new MessageEmbed();
        embed.setColor('#0099ff');
        embed.setFooter("Powered by Discord Time Bot");
        CommandProvider.getCommandLabels().forEach(commandLabel => {
            embed.addField('/'+commandLabel+' or !'+commandLabel, CommandProvider.getCommand(commandLabel)["help"]);
        });
        message.reply({allowedMentions: {repliedUser: false}, content: "Commands I can respond to:", 
                        embeds: [embed], ephemeral: true})
        .then(sentMsg => {
            message.delete();
            const timeout = 15000; //15 seconds
            setTimeout(() => {
                sentMsg.delete().catch(anyError => {
                    console.error(`Tried to delete my response after someone else already did`)});
            }, 15000);
        })
        .catch(anyError => {
            message.channel.send("Something broke. Please contact my creator.");
            console.error(anyError);
        });
    }
}

export default HelpCommand;