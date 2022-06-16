const { SlashCommandBuilder } = require('@discordjs/builders');
const picture = require('../pfp.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('testing commands'),
    async execute(interaction) {
        interaction.reply({
            content: `test ${picture}`,
            emphemeral: true
        });

    }
}