const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sysinfo')
        .setDescription('Info about the system the bot is running on'),
    async execute(interaction, client) {
        interaction.reply({
            content: `Pong! (Heartbeat: ${client.ws.ping})`,
            emphemeral: true
        });

    }
}