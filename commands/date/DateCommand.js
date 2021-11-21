import Command from '../Command.js';
import {mls} from '../../utils/stringUtils.js';
import * as chrono from 'chrono-node';

class DateCommand extends Command {
  static FLAGS = ['-R', '-D', '-T', '-F'];

  constructor() {
    super(
      'date',
      'Responds with the given date and/or time in [Dynamic Timestamp](https://www.reddit.com/r/discordapp/comments/ofsm4e/dynamic_timestamps/) format',
      (client, trigger, content) => this.printDate(trigger, content),
    );
  }

  printDate(trigger, message) {
    trigger
      .reply({
        ephemeral: true,
        allowedMentions: {repliedUser: false},
        content: processDate(message),
      })
      .then((sentMsg) => {
        // done by Interaction, no need to clean up
        if ('isCommand' in trigger) return;
        setTimeout(() => {
          trigger.delete().catch((anyError) => {
            console.error(
              `Tried to delete sender's prompt after someone else already did`,
            );
          });
          sentMsg.delete().catch((anyError) => {
            console.error(
              `Tried to delete my response after someone else already did`,
            );
          });
        }, 15000);
      })
      .catch((anyError) => {
        console.error(anyError);
        trigger.channel.send('Something broke. Please contact my creator.');
      });
  }
}

function processDate(message) {
  const words = message.split(' ');
  if (words.length == 1) {
    return mls`Usage:
                \`!date (your date/time here)\`
                \`/date (your date/time here)\`
                or
                \`!date [flag] (your date/time here)\`
                \`/date [flag] (your date/time here)\`
                Valid flags are: -R, -d, -D, -t, -T, -f, or -F
                It is highly recommended to specify a time zone!`;
  }
  // to-do: better flag detection (library?)
  let flag = 'F';
  words.map((word) => {
    if (DateCommand.FLAGS.includes(word.toUpperCase())) {
      flag = word.replace('-', '');
    }
  });
  if (flag == 'r') flag = 'R'; // the only one not supporting lowercase
  const dateContent = words
    .splice(1)
    .filter((word) => !DateCommand.FLAGS.includes(word.toUpperCase()))
    .join(' ');
  return processDateString(dateContent, flag);
}

function processDateString(dateContent, flag) {
  const unix = utcParse(dateContent);
  if (unix == null) {
    return mls`I didn't recognize
                ${dateContent}
                as a time and/or date`;
  }
  const out = `<t:${unix}:${flag}>`;
  return mls`${out}
                            ||\`${out}\`||`;
}

function utcParse(inputString) {
  const step1 = chrono.parseDate(inputString);
  if (step1 == null) return null;
  return Math.floor(step1.getTime() / 1000);
}
export default DateCommand;
