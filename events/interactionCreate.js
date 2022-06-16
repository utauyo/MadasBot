// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(interaction) {
        if(!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

    
        if(!command) return;
    
        try {
            await command.execute(interaction, interaction.client);
        } catch(err){
            if(err) console.log(err);
            await interaction.reply({
                content: "Something went wrong!",
                ephemeral: true
                });
        }
    }
}