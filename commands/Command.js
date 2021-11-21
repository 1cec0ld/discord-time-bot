import CommandProvider from './CommandProvider.js';
class Command {
  constructor(name, usage, execute) {
    CommandProvider.registerCommand(name, usage, execute);
  }
}

export default Command;
