const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Bots stats'),
    async execute(interaction) {
        interaction.reply({
            content: `temp`,
            emphemeral: true
        });

    }
}