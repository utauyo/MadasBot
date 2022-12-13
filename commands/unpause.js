const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unpause')
        .setDescription('Resume playback!')
        ,
    async execute(interaction) {
        return

        const connection = getVoiceConnection(interaction.guildId)

        // if(!connection || interaction.client.queueMap.get(interaction.guildId)) return interaction.reply({content: "There is nothing to unpause!"})

        if(interaction.member.voice.channel != getVoiceConnection(interaction.guild.id).joinConfig.channelId) return interaction.reply("You need to be in the same voice channel as the bot!")

        connection._state.subscription.player.unpause()
        
        await interaction.reply({
            content: "Paused!",
            ephemeral: false
        });
    }
}