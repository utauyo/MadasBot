const { SlashCommandBuilder } = require('@discordjs/builders');
// const { MessageEmbed } = require('discord.js')
// const epic = require('../epic')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('testing commands')
        .addStringOption(term => term.setName('nickname').setRequired(true).setDescription('what nickname to set'))
        ,
    async execute(interaction) {

        // const embed = new MessageEmbed() 
        //     .setDescription(`Something went wrong!`)
        //     .setImage(`${epic.randomCrashGif}`)
        //     .setColor('#ff5c5c')
    
            await interaction.reply({
                content: "a",
                ephemeral: false
            });
    }
}