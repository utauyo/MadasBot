const { SlashCommandBuilder } = require('@discordjs/builders');
const os = require("os");
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sysinfo')
        .setDescription('Information about the system the bot is running on'),
    async execute(interaction) {

        const embed = new MessageEmbed() 
            .setTitle(`System info`)
            .setDescription(`Info about the system the bot is running on.`)
            .addField('CPU:', `${os.cpus()[0].model}`, false)
            .addField('CPU frequency:', `${os.cpus()[0].speed / 1000} GHz`, true)
            .addField('CPU cores:', `${os.cpus().length}`, true)
            .addField('RAM usage:', `${Math.round(os.totalmem() / 1000000) - Math.round(os.freemem() / 1000000)} / ${Math.round(os.totalmem() / 1000000)} gb`, false)
            .setColor(process.env.EMBED_COLOUR)

        interaction.reply({
            embeds: [embed]
        })

    }
}