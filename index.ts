import DiscordJS, { ClientPresence, Intents } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new DiscordJS.Client({
    intents : [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

client.on('ŗeady', () => {
    console.log('Ready!');

    const guildId = `${process.env.TESTING_SERVER_ID}`
    const guild = client.guilds.cache.get(guildId);

    let commands
    
    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

commands?.create({
    name: 'ping',
    description: 'Replies with pong!'
})

// commands?.create({
//     name: 'add',
//     description: 'Adds two numbers together',
//     options: [
//         {
//             name: 'a',
//             description: 'First number',
//             type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
//             required: true
//         },
//         {
//             name: 'b',
//             description: 'First number',
//             type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
//             required: true
//         }
//     ]
// });


});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) { 
        return;
    }

    const { commandName, options } = interaction;

    if(commandName === 'ping') {
        interaction.reply({
            content: 'pong',
            ephemeral: true,
        });
    }

})

client.login(process.env.TOKEN);