#!/usr/bin/node
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

    client.user.setActivity('funnies', { type: 'STREAMING', link: 'https://www.twitch.tv/madasish' });
});

client.login(process.env.TOKEN);