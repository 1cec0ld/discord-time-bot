import HelpCommand from './help/HelpCommand.js';
import PingCommand from './ping/PingCommand.js';
import DateCommand from './date/DateCommand.js';

export default class CommandProvider {
  static commands = {};


  constructor() {
  }

  static init(slashCommandRegistry) {
    new HelpCommand();
    new PingCommand();
    new DateCommand();

    slashCommandRegistry.registerAllSlashCommands(this.commands);
  }

  static registerCommand(
    commandLabel,
    commandUsage = 'N/A',
    commandFunction = () => {
      throw new Error('Command has no Function given');
    },
  ) {
    this.commands[commandLabel.toLowerCase()] = {
      execute: commandFunction,
      help: commandUsage,
    };
  }

  static getCommandLabels() {
    return Object.keys(this.commands);
  }

  static getCommand(commandLabel) {
    const input = commandLabel.toLowerCase();
    if (!this.commands.hasOwnProperty(input)) return null;
    return this.commands[input];
  }
}
