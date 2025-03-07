const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { loadEvents } = require('./handlers/eventHandler');
const { loadCommands } = require('./handlers/commandHandler');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.commands = new Collection();
client.commandArray = [];

(async () => {
    try {
        await loadEvents(client);
        await loadCommands(client);
        await client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
        console.error(error);
    }
})();