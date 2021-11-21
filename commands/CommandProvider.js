import HelpCommand from './help/helpCommand.js';
import PingCommand from './ping/pingCommand.js';
import DateCommand from './date/dateCommand.js';

export default class CommandProvider {
    static commands = {};

    constructor(){
    }

    static init(slashCommandRegistry) {
        new HelpCommand();
        new PingCommand();
        new DateCommand();

        slashCommandRegistry.registerAllSlashCommands(this.commands);
    }

    static registerCommand(command_label, command_usage="N/A", 
                    command_function = () => {throw new Error("Command has no Function given")}) {
        this.commands[command_label.toLowerCase()] = {execute: command_function, 
                                        help: command_usage};
    }

    static getCommandLabels() {
        return Object.keys(this.commands);
    }

    static getCommand(command_label) {
        const input = command_label.toLowerCase();
        if(!(this.commands.hasOwnProperty(input)))return null;
        return this.commands[input];
    }

    static get commands() {
        return this.commands;
    }
}

