const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, generateDependencyReport } = require("@discordjs/voice")
const ytdl = require("ytdl-core")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song from youtube!')
        .addStringOption(term => term.setName('link').setRequired(true).setDescription('YouTube Video link')),
    async execute(interaction) {
        
        const song = ytdl(interaction.options._hoistedOptions[0].value)

        const channel = interaction.member.voice.channel

        var connection = await joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        let resource = createAudioResource(song, {
            inlineVolume : true
        })

        resource.volume.setVolume(0.9)

        const player = createAudioPlayer();

        connection.subscribe(player)

        player.play(resource)

        interaction.reply({
            content: "god i hope this fucking works",
        });


    }
}