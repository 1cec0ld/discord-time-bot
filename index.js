import { Client, Intents } from 'discord.js';
const bot = new Client({
  intents: [Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES],
});
import dotenv from 'dotenv';
dotenv.config();
const TOKEN = process.env.TOKEN;

import CommandProvider from './commands/CommandProvider.js';
import SlashCommandRegistry from './commands/SlashCommandRegistry.js';

bot.login(TOKEN);

initialize();

function initialize() {

  bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
    CommandProvider.init(new SlashCommandRegistry(bot));
  });

  bot.on('messageCreate', (msg) => {
    if (msg.author.bot) return;
    if(!msg.content.startsWith('!')) return; //to-do add prefix to env file, reference process.env.PREFIX
    const words = msg.content.substring(1).split(' ');
    const command = CommandProvider.getCommand(words[0]);
    if (!command) return;
    command.execute(bot, msg, msg.content);
  });

  bot.on('interactionCreate', (interaction) => {
    if(!interaction.isCommand()) return;
    const command = CommandProvider.getCommand(interaction.commandName);
    if (!command) return;
    command.execute(bot, interaction, interaction.commandName + " " + interaction.options.getString('parameters'));
  });
}