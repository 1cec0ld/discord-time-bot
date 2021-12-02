import CommandProvider from './CommandProvider.js';
export default class Command {
    constructor(name, usage, execute) {
        CommandProvider.registerCommand(name, usage, execute);
    }
}