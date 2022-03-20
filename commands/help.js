const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const prefix = require('./../config.json').prefix

module.exports = {
    name: "help",
    description: "help cmmd",
    permissions: ["ADMINISTRATOR"],

    run: async (client, message, args) => {

      const embed = new MessageEmbed()
      .setTitle('**__Backup Bot Help Command__**')
      .setDescription(`***Here are all the commands available in this bot!!*** 
      -> ${prefix}backup-create => Creates backup of the server..
      -> ${prefix}backup-info <id> => Displays the info on the provided id.. 
      -> ${prefix}backup-load <id> => Loads backup of the given server..
      -> ${prefix}help => Loads the help command`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter('Help Command')
      .setColor('RANDOM')

      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setLabel('Invite Me')
          .setStyle('LINK')
          .setURL('https://discord.com/'), //Inv link here
        
      new MessageButton()
      .setLabel('Support Server')
      .setStyle('LINK')
      .setURL('https://discord.com/') //Support Server Link
    )

      message.channel.send({ embeds: [embed], components: [row] })


    }}
