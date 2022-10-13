const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, AudioPlayerStatus} = require("@discordjs/voice")
const yts = require( 'yt-search' );
// const ch = require('chalk')

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
        
        // Check for if youre in a vc
        if(!channel) return interaction.editReply("You need to be in a voice channel!")

        // Check if a queue exists for the server youre in
        if(!map.get(channel.guild.id)) {

            console.log("Music queue doesnt exist")

            const results = await yts({query: query, type: "video"})
            const result = results.videos[0]

            map.set(channel.guild.id, {
                thechannel: interaction.channel.id,
                queue: [result],
            })

            console.log("Music queue init")

            const gqGet = map.get(channel.guild.id)

            // const gqSet = function(a,b) {map.set(channel.guild.id.${a}, b)}

            // console.log(gq)
            
            const getNextSong = function() {
                const array = gqGet.queue.slice(1,0)
                map.set(channel.guild.id.queue, array)
                return createAudioResource(ytdl(gqGet.currentsong.url))
            }
            
            map.set(channel.guild.id.resource, createAudioPlayer(ytdl(gqGet.queue[0].url)))

            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            const resource = createAudioResource(ytdl(gqGet.queue[0].url))

            const player = createAudioPlayer();

            connection.subscribe(player)

            player.play(resource)
            
            player.on('error', error => {
                console.error('Error:', error.message, 'with track');
            });

            player.on(AudioPlayerStatus.Idle, () => {
                console.log(`Idling in ${interaction.guildId}`)
                if(gqGet.queue.length < 2) {
                    map.delete(interaction.guildId)
                } else {
                    player.play(getNextSong());
                    console.log(`Playing next song "${gqGet.queue[0].title}" in ${interaction.guild}`)
                    interaction.channel.message.send(`Playing next song "${gqGet.queue[0].title}"!`)
                }
            });

            console.log(`Playing "${gqGet.queue[0].title}" in ${interaction.guild}`)

            await interaction.editReply(`Playing "${gqGet.queue[0].title}"`)
            
        } else if(map.get(channel.guild.id).queue) {
            console.log("queue exists")
            const results = await yts({query: query, type: "video"})
            const result = results.videos[0]
            const video = map.get(channel.guild.id).queue.push(result)
            map.set(channel.guild.id.queue, video)

            console.log(`Added "${result.title}" to the queue in ${interaction.guildId}`)

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