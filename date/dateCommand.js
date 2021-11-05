const chrono = require('chrono-node');
const stringUtils = require('../utils/stringUtils');

const FLAGS = ['-R', '-D', '-T', '-F']; //to-do: add lowercase flags in an understandable way

const processDate = (msg) => {
  const words = msg.content.split(' ');
  if (msg.content.split(' ').length == 1) {
    return (stringUtils.mls`Usage:
                \`!date (your date/time here)\`
                \`!date (your date/time here) (-R, -D, -T, or -F)\``);
    
  }
  //to-do: better flag detection (library?)
  let flag = 'F';
  words.map((word) => {
    if (FLAGS.includes(word.toUpperCase())) {
      flag = word.replace('-', '').toUpperCase();
    }
  });
  const filtered = words
      .filter((word) => !FLAGS.includes(word.toUpperCase()))
      .filter((word) => word.toLowerCase() != '!date')
      .join(' ');
  const unix = utcParse(filtered);
  if (unix == null) return (`That was not a valid time or day, as far as I could tell.`);
  const out = `<t:${unix}:${flag}>`;
  return (stringUtils.mls`${out}
                          ||\`${out}\`||`);
};
function utcParse(inputString) {
  const step1 = chrono.parseDate(inputString);
  if (step1 == null) return null;
  return Math.floor(step1.getTime() / 1000);
}

module.exports = {processDate: processDate}
