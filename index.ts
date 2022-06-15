#!/usr/bin/env ts-node
import DiscordJS, { ClientPresence, Intents } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new DiscordJS.Client({
    intents : [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

client.on('ready', () => {
    console.log('Ready!');

    // 796269950024679425
    const guildId = ``
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


commands?.create({
    name: 'add',
    description: 'Adds two numbers together',
    options: [
        {
            name: 'a',
            description: 'First number',
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            required: true
        },
        {
            name: 'b',
            description: 'First number',
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            required: true
        }
    ]
});


});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if(commandName === 'add') {
        const a = options.getNumber('a')!;
        const b = options.getNumber('b')!;
        const sum = a + b;
        interaction.reply(`The sum of ${a} and ${b} is ${sum}`);
    }

    if(commandName === 'ping') {
        const ping = Math.round(client.ws.ping);
        interaction.reply({
            content: `Pong! (Heartbeat: ${ping}ms.)`,
            ephemeral: true,
        });
    }

})

client.login(process.env.TOKEN);