const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('testing commands')
        .addStringOption(term => term.setName('term').setRequired(true).setDescription('term to search for'))
        ,
    async execute(interaction) {
        console.log(interaction.options._hoistedOptions[0].value);
        interaction.reply({
            content: `ok`,
            emphemeral: true
        });

    }
}