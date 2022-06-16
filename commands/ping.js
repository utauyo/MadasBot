const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),
    async execute(interaction, client) {
        interaction.reply({
            content: `Pong! (Heartbeat: ${client.ws.ping})`,
            emphemeral: true
        });

    }
}