const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows bot latency'),
    async execute(interaction) {
        // Check if it's a slash command or message command
        if (interaction.reply) {
            // This is a slash command interaction
            const start = Date.now();
            const response = await interaction.reply({ 
                content: 'Pinging...', 
                withResponse: true 
            });
            
            const wsLatency = interaction.client.ws.ping;
            const apiLatency = Date.now() - start;

            await interaction.editReply(
                `🏓 Pong!\n` +
                `WebSocket Latency: ${wsLatency}ms\n` +
                `API Latency: ${apiLatency}ms`
            );
        } else {
            // This is a message command
            const start = Date.now();
            const message = await interaction.channel.send('Pinging...');
            
            const wsLatency = interaction.client.ws.ping;
            const apiLatency = Date.now() - start;
            
            await message.edit(
                `🏓 Pong!\n` +
                `WebSocket Latency: ${wsLatency}ms\n` +
                `API Latency: ${apiLatency}ms`
            );
        }
    }
};
