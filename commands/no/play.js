const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, AudioPlayerStatus} = require("@discordjs/voice")
const yts = require( 'yt-search' );

const map = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play music in voice chats!')
        .addStringOption(query => query
            .setName('query')
            .setDescription('Video to search for')
            ),
    async execute(interaction) {    

        const channel = interaction.member.voice.channel

        const query = interaction.options._hoistedOptions[0].value

        // queue.set(interaction.member.voice.channel.guild.id, {
        //     queue: ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://www.youtube.com/watch?v=4RTHOB7e46o", "c"],
        //     connection: "connection or smtn idk",
        //     currentsong: {title: "Rick Astley - Never Gonna Give You Up (Official Music Video)", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", status: "playing"},
        //     player: "not even sure if i need this",
        //     thechannel: interaction.channel.id
        // })

        await interaction.deferReply({
            ephemeral: true
        })

        if(!channel) return interaction.editReply("You need to be in a voice channel!")

        if(typeof map.get(channel.guild.id) === 'undefined') {

            console.log("queue no exists")

            const results = await yts({query: query, type: "video"})
            const result = results.videos[0]

            map.set(channel.guild.id, {
                thechannel: interaction.channel.id,
                queue: [result],
                
            })
            console.log("queue init")

            const gq = map.get(channel.guild.id)

            // console.log(gq)
            
            const getNextSong = function() {
                const array = gq.queue[0].slice(1,0)
                map.set(channel.guild.id.queue, array)
                return createAudioResource(ytdl(gq.currentsong.url))
            }
            
            map.set(channel.guild.id.resource, createAudioPlayer(ytdl(gq.queue[0].url)))

            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            const resource = createAudioResource(ytdl(gq.queue[0].url))

            const player = createAudioPlayer();

            connection.subscribe(player)

            

            player.play(resource)
            
            player.on('error', error => {
                console.error('Error:', error.message, 'with track');
            });

            player.on('error', error => {
                console.error('Error:', error.message, 'with track');
            });

            player.on(AudioPlayerStatus.Idle, () => {
                if(gq.queue.length() < 2) {
                    map.delete(interaction.guildId)
                    return
                }
                player.play(getNextSong());
            });

            await interaction.editReply(`Playing "${gq.queue[0].title}"`)
            
        } else if(!map.get(channel.guild.id).queue) {
            console.log("queue exists")
            const results = await yts({query: query, type: "video"})
            const result = results.videos[0]
            const video = map.get(channel.guild.id).queue.push(result)
            map.set(channel.guild.id.queue, video)
            await interaction.editReply(`Added "${result.title}" to the queue!`)
            
        } else {
            await interaction.editReply("Something went wrong!")
        }

        // if(ytdl.validateURL(query) === true) {
        //     console.log(query)
        // } else {
        //     const results = await yts({query: query, type: video})
        //     const video = results.videos[0]
        //     console.log(video)
        //     console.log(video.title)
        // }

        // if(!channel) return interaction.reply("You need to be in a voice chat!")

        // if(!queue.get(channel.guild.id)) {
        //     queue.set(channel.guild.id, {
        //         queue: [query]
        //     })

        //     interaction.reply("god i hope this fucking works");
        // } else {
        //     var array = queue.get(channel.guild.id).queue.push(query)
        //     queue.set(channel.guild.id, {
        //         queue: array
        //     })
        // }

        

        

        // var connection = joinVoiceChannel({
        //     channelId: channel.id,
        //     guildId: channel.guild.id,
        //     adapterCreator: channel.guild.voiceAdapterCreator,
        // });

        // let resource = createAudioResource(song, {
        //     inlineVolume : true
        // })

        // resource.volume.setVolume(0.9)

        // const player = createAudioPlayer();

        // connection.subscribe(player)

        // player.play(resource)



    },
    map
}