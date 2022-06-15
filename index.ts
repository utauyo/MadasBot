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
});

client.login(process.env.TOKEN);