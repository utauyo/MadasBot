const { SlashCommandBuilder, SlashCommandSubcommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const ud = require('urban-dictionary');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Urban Dictionary')
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
        const theWordsIdk = interaction.options._hoistedOptions[0].value;
        const embedColour = "#1fa2f3"

        if(interaction.options.getSubcommand() === 'define') {

            //Find the definition for theWordsIdk using ud
            ud.define(theWordsIdk, (error, results) => {
                if(error) console.log(error)
                const finalResult = results.sort((a, b) => b.thumbs_up - a.thumbs_up)[0];

                // const writtenOn = finalResult.written_on.match(/^[^T]*/)[0].split(' ')
                // console.log(writtenOn)

                const embed = new MessageEmbed() 
                .setTitle(`${finalResult.word}`)
                .setURL(`${finalResult.permalink}`)
                .setDescription(`${finalResult.definition}`)
                .addField('Example', `${finalResult.example}`, false)
                .addField('👍', `${finalResult.thumbs_up}`, true)
                .addField('👎', `${finalResult.thumbs_down}`, true)
                .setColor(embedColour)
                // .setFooter({ text: `by ${finalResult.author} written on ${finalResult.written_on}` });
                .setFooter({ text: `by ${finalResult.author}` });

                interaction.reply({
                    embeds: [embed],
                    ephemeral: false
                });

            });

        } else if(interaction.options.getSubcommand() === 'wotd') {
            console.log(`wotd`)
            interaction.reply({
                content: `yep`,
                // embeds: [embed],
                ephemeral: false
            });
        }
    }
}