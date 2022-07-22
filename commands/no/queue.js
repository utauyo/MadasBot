const { SlashCommandBuilder } = require('@discordjs/builders');
const map = require("./play.js").map

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('List all songs in the queue!')
        ,
    async execute(interaction) {
        
        if(!map || map === undefined) return interaction.reply("The queue is empty!") 

        if(!map.get(interaction.guildId) || map.get(interaction.guildId) === undefined) return interaction.reply("The queue is empty!")
        
            await interaction.reply({
                content: toString(map.get(interaction.guildId).queue),
                ephemeral: false
            });
    }
}