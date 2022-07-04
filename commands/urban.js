const { SlashCommandBuilder, SlashCommandSubcommandBuilder } = require('@discordjs/builders');
var {fromIsoToHuman} = require('@sineverba/date-convert');
const { MessageEmbed } = require('discord.js');
const ud = require('urban-dictionary');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Find definitions of words on urban dictionary.')
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
            .setName('define')
            .setDescription('Get the definition of a term.')
            .addStringOption(term => term
                .setName('term')
                .setRequired(true)
                .setDescription('Term to search for'))
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
            .setName('wotd')
            .setDescription('Words of the day.')
        )
        // .addStringOption(term => term.setName('term').setRequired(true).setDescription('term to search for'))
        ,
    async execute(interaction) {
        if(interaction.options.getSubcommand() === 'define') {
            const theWordsIdk = interaction.options._hoistedOptions[0].value;
            ud.define(theWordsIdk, (error, results) => {
                if(error) console.log(error)

                const finalResult = results.sort((a, b) => b.thumbs_up - a.thumbs_up)[0];

                const embed = new MessageEmbed() 
                .setTitle(`Definition of ${finalResult.word}`)
                .setURL(`${finalResult.permalink}`)
                .setDescription(`${finalResult.definition}`)
                .addField('Example', `${finalResult.example}`, false)
                .addField('👍', `${finalResult.thumbs_up}`, true)
                .addField('👎', `${finalResult.thumbs_down}`, true)
                .setColor(process.env.EMBED_COLOUR)
                .setFooter({ text: `by ${finalResult.author} on ${fromIsoToHuman(finalResult.written_on, "DD/MM/YYYY")}` });

                interaction.reply({
                    embeds: [embed],
                    ephemeral: false
                });

            });

        } else if(interaction.options.getSubcommand() === 'wotd') {
            /*
            at some point might wanna add something like pagination embed to this subcommand
            */
            ud.wordsOfTheDay((error, results) => {
                if(error) console.log(error)

                const finalResult = results[0];

                const embed = new MessageEmbed() 
                .setTitle(`Top word of the day: ${finalResult.word}`)
                .setURL(`${finalResult.permalink}`)
                .setDescription(`${finalResult.definition}`)
                .addField('Example', `${finalResult.example}`, false)
                .addField('👍', `${finalResult.thumbs_up}`, true)
                .addField('👎', `${finalResult.thumbs_down}`, true)
                .setColor(process.env.EMBED_COLOUR)
                .setFooter({ text: `by ${finalResult.author} on ${fromIsoToHuman(finalResult.written_on, "DD/MM/YYYY")}` });

                interaction.reply({
                    embeds: [embed],
                    ephemeral: false
                });

            });
        } else {
            interaction.reply("I am sorry how the hell?")
        }
    }
}