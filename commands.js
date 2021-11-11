const dateCommand = require('./date/dateCommand');
const stringUtils = require('./utils/stringUtils');
const Discord = require('discord.js');
const validCommands = {};

validCommands['!ping'] = (obj) => {
  //to-do: respond with actual delay, see: obj.msg.timestamp
  const msg = obj.msg;
  msg.reply('pong!');
};

validCommands['!date'] = (obj) => {
  const msg = obj.msg;
  const dateMsg = dateCommand.processDate(msg);
  msg.reply(dateMsg)
  .then(sentMsg => {
      const timeout = 15000; //15 seconds
      setTimeout(() => {
        msg.delete().catch(x => {console.error(`Tried to delete the sender's prompt after someone else already did`)});
        sentMsg.delete().catch(x => {console.error(`Tried to delete my response after someone else already did`)});
      }, timeout);
  })
  .catch((error) => {
    console.error(error);
    msg.channel.send("Something went wrong... Please contact my creator?");
  });
};

validCommands['!help'] = (obj) => {
  const msg = obj.msg;
  const responseEmbed = new Discord.MessageEmbed();
  responseEmbed.addField('!help', 'Responds with this message');
  responseEmbed.addField('!ping', 'Responds with "pong!"');
  responseEmbed.addField('!date', 'Responds with the given date and/or time in [Dynamic Timestamp](https://www.reddit.com/r/discordapp/comments/ofsm4e/dynamic_timestamps/) format',true);
  responseEmbed.setColor('#0099ff');
  responseEmbed.setFooter('', 'https://media.discordapp.net/attachments/894776608186069012/908165768141746266/Clock.png');
  msg.channel.send({content: "Commands I can respond to:", embeds: [responseEmbed]})
  .then(sentMsg => {
    msg.delete();
  });
};

module.exports = validCommands;