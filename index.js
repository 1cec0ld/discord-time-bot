require('dotenv').config();
const commands = require('./commands');
const {Client, Intents} = require('discord.js');
const bot = new Client({
  intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES],
});
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('messageCreate', (msg) => {
  if (msg.author.bot) return;
  const words = msg.content.split(' ');
  if (words[0].toLowerCase() in commands) {
    commands[words[0].toLowerCase()]({bot: bot, msg: msg});
  }
});
