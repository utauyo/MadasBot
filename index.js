#!/usr/bin/node
require('dotenv').config();
const fs = require('fs');
const { Client, Intents, Collection} = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
    ],
});

// Load all commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = [];
const clientCommands = new Collection();

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    clientCommands.set(command.data.name, command);
}

// Ready event    
client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('funnies', { type: 'STREAMING', link: 'https://www.twitch.tv/madasish' });

    const CLIENT_ID = client.user.id;

    const rest = new REST(CLIENT_ID, {
        version : '9',
    }).setToken(process.env.TOKEN);

    (async () => {
        try {
            if(process.env.ENV === "production") {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                })
                console.log("Commands registere globally!");
            } else {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.TESTING_GUILD_ID), {
                    body: commands
                })
                console.log("Commands registere locally!");
            }
        } catch(err) {
            if(err) console.log(err);
        }
    })();

});

//interactionCreate event
client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;

    const command = clientCommands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch(err){
        if(err) console.log(err);

        await interaction.reply({
            content: "Something went wrong!",
             emphemeral: true
            });
    }
})

client.login(process.env.TOKEN);