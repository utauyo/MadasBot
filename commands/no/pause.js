const { SlashCommandBuilder } = require('@discordjs/builders');
const queue = require("./play.js").queue
// const { MessageEmbed } = require('discord.js')
// const epic = require('../epic')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause whatever is currently playing.')
        .addStringOption(term => term.setName('nickname').setRequired(true).setDescription('what nickname to set'))
        ,
    async execute(interaction) {

        const channel = interaction.member.voice.channel

        console.log(queue.get(channel.guild.id))
    
            await interaction.reply({
                content: "Paused!",
                ephemeral: false
            });
    }
}