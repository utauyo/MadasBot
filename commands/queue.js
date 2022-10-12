const { SlashCommandBuilder } = require('@discordjs/builders');
const map = require("./play.js").map

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('List all songs in the queue!')
        ,
    async execute(interaction) {

        if(map.get(interaction.guildId)) {

            var message = "Queue: ```"

            for(var i = 0; i < map.get(interaction.guildId).queue.length; i++) {
                message += i+1 + ". " + map.get(interaction.guildId).queue[i].title + "\n"
            }

            message += "```"

            await interaction.reply({
                content: message,
                ephemeral: false
            });
        } else {
            return interaction.reply("The queue is empty!")
        }
    }
}