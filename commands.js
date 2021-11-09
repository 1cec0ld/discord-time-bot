const dateCommand = require('./date/dateCommand');
const stringUtils = require('./utils/stringUtils');
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
      msg.delete();
      sentMsg.delete();
    }, timeout);
  })
  .catch((error) => {
    console.error(error);
    msg.channel.send("Something went wrong... Please contact my creator?");
  });
};

validCommands['!help'] = (obj) => {
  const msg = obj.msg;
  msg.reply(stringUtils.mls`!help - Displays this message
                            !ping - Confirms that I'm online
                            !date - Parse the given date into dynamic string format`);
};

module.exports = validCommands;