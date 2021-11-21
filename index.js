import { Client, Intents } from 'discord.js';
const bot = new Client({
  intents: [Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES],
});
import dotenv from 'dotenv';
dotenv.config();
const TOKEN = process.env.TOKEN;

import CommandProvider from './commands/CommandProvider.js';

bot.login(TOKEN);

initialize();

function initialize() {
  
  CommandProvider.init();

  bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });

  bot.on('messageCreate', (msg) => {
    if (msg.author.bot) return;
    if(!msg.content.startsWith('!')) return; //to-do add prefix to env file, reference process.env.PREFIX
    const words = msg.content.substring(1).split(' ');
    const command = CommandProvider.getCommand(words[0]);
    if (!command) return;
    command.execute(bot, msg);
  });

  bot.on('interactionCreate', (interaction) => {
    if(!interaction.isCommand()) return;
    const command = CommandProvider.getCommand(interaction.commandName);
    if (!command) return;
    //command.execute(bot, interaction);
    interaction.channel.send(JSON.stringif(interaction));
  });
}