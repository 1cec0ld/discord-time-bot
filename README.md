# DateTime Reader, the bot to translate English into Discord Time.

## What is it?

Discord released a feature for [Dynamic Timestamps](https://www.reddit.com/r/discordapp/comments/ofsm4e/dynamic_timestamps/) but it requires some technical formatting, and looking up a unix timestamp.
This bot cuts out the middleman with a single command: !date

## How does it work?

Once the bot is on the server, in the channel you're looking at, say `!date (date and/or time)` 
The bot will figure out what time you're asking for, then show you 2 things: The dynamic timestamp (it should show up in your local time zone) and then a small snippet of the formatting, which you can copy and paste anywhere into discord, to show that exact same response.

## For example?
- !date today
- !date next week
- !date tomorrow
- !date march 27th
- !date 5pm PST sunday
- !date me __just kidding__

It also supports a few of the ending codes, to show Relative, Time-Only, or other output styles: R, D, T, F

- !date 5pm PST -R
- !date march 27th -D
- !date midnight -T
- !date now -F *this is the default, you don't need the -F*

## How do I get it to my server?

The invite URL for the bot is [here, for now](https://discord.com/api/oauth2/authorize?client_id=906016769783779470&permissions=10240&scope=bot).

It should only ask for permission to read and send messages.

## What's next?

- Smarter understanding of the Flags. R,D,T,F are the only ones the bot knows, but others exist
- Better help message
- Clean up after itself (delete the message & response after a short delay)
- Figure out timezones

## Questions? Comments? Issues? Suggestions?

I set up a [Discord server](https://discord.gg/aWCXeJC9) specifically for it, contact me there, or leave an Issue on github!
**Known issue:** as of November 5, 2021 the bot will use EST as the default time zone, since the host computer is there. If you use a specific time, such as 12pm or 1500 or 1:00 then please specify the time zone you are in, or the one you want to use.



# If you wish to run it on your own host:

Link to article on SitePoint, used for initial setup: [https://www.sitepoint.com/discord-bot-node-js/](https://www.sitepoint.com/discord-bot-node-js/)

## Requirements

- [Node.js and npm](http://nodejs.org/)
- [Discord](https://discordapp.com/) account, with a bot account already created and token obtained for it.

## Installation Steps

1. Clone repo
2. Add the Discord token in a `.env` file next to index.js: `TOKEN=YourBotTokenHere-NoQuotationMarksNeeded`
3. Navigate to the folder in a command line, and run `npm install`
3. Navigate to the folder and run `node index.js` in a command line
4. Interact with your Discord bot!

## License

SitePoint's code archives and code examples are licensed under the MIT license.
