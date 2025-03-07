module.exports = {
    name: 'messageCreate',
    async execute(message) {
        const prefix = '!'; // You can change this to your preferred prefix

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = message.client.commands.get(commandName);

        if (!command) return;

        try {
            if (commandName === 'ping') {
                const initialMessage = await message.reply('Pinging...');
                const wsLatency = message.client.ws.ping;
                const apiLatency = initialMessage.createdTimestamp - message.createdTimestamp;
                
                await initialMessage.edit(
                    `🏓 Pong!\n` +
                    `WebSocket Latency: ${wsLatency}ms\n` +
                    `API Latency: ${apiLatency}ms`
                );
            } else {
                // Handle other commands here
                const fakeInteraction = {
                    client: message.client,
                    guild: message.guild,
                    channel: message.channel,
                    member: message.member,
                    user: message.author,
                    reply: async (content) => message.reply(content),
                    createdTimestamp: message.createdTimestamp
                };

                await command.execute(fakeInteraction);
            }
        } catch (error) {
            console.error(error);
            await message.reply('There was an error while executing this command!');
        }
    },
};
