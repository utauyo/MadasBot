#!/usr/bin/node
require('dotenv').config();
const { Client, Intents } = require('discord.js');

const client = new Client({
    Intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

client.on('ready', () => {
    console.log('Ready!');

    client.user.setActivity('funnies', { type: 'STREAMING', link: 'https://www.twitch.tv/madasish' });
});

client.login(process.env.TOKEN);