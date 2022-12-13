const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause whatever is currently playing.')
        ,
    async execute(interaction) {

        const connection = getVoiceConnection(interaction.guildId)

        if(!connection) return interaction.reply({content: "The bot is not currently playing anything!"})

        if(interaction.member.voice.channel != getVoiceConnection(interaction.guild.id).joinConfig.channelId) return interaction.reply("You need to be in the same voice channel as the bot!")

        connection._state.subscription.player.pause()
        
        await interaction.reply({
            content: "Paused!",
            ephemeral: false
        });
    }
}