const client = require("../index");
const Discord = require("discord.js")
const MessageActionRow = require('discord.js')
client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    !message.guild //||
    // !message.content.toLowerCase().startsWith(client.config.prefix)
  )
    return;

  const [cmd, ...args] = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(" ");

  const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

  if (command) {
    if (!message.content.toLowerCase().startsWith(client.config.prefix)) return;
    const PermissionsFlags = [
      'ADMINISTRATOR',
      'CREATE_INSTANT_INVITE',
      'KICK_MEMBERS',
      'BAN_MEMBERS',
      'MANAGE_CHANNELS',
      'MANAGE_GUILD',
      'ADD_REACTIONS',
      'VIEW_AUDIT_LOG',
      'PRIORITY_SPEAKER',
      'STREAM',
      'VIEW_CHANNEL',
      'SEND_MESSAGES',
      'SEND_TTS_MESSAGES',
      'MANAGE_MESSAGES',
      'EMBED_LINKS',
      'ATTACH_FILES',
      'READ_MESSAGE_HISTORY',
      'MENTION_EVERYONE',
      'USE_EXTERNAL_EMOJIS',
      'VIEW_GUILD_INSIGHTS',
      'CONNECT',
      'SPEAK',
      'MUTE_MEMBERS',
      'DEAFEN_MEMBERS',
      'MOVE_MEMBERS',
      'USE_VAD',
      'CHANGE_NICKNAME',
      'MANAGE_SERVER',
      'MANAGE_NICKNAMES',
      'MANAGE_ROLES',
      'MANAGE_WEBHOOKS',
      'MANAGE_EMOJIS'
    ];

    if (command.permissions && command.permissions.length) {
      let invalidPermissionsFlags = [];
      for (const permission of command.permissions) {
        if (!PermissionsFlags.includes(permission)) {
          return console.log(`Invalid Permissions : ${permission}`);
        }

        if (!message.member.permissions.has(permission)) {
          invalidPermissionsFlags.push(permission);
        }
      }

      if (invalidPermissionsFlags.length) {
        const noPermissionEmbed = new Discord.MessageEmbed()
          .setColor('RED')
          .setTitle('INVALID PERMISSION!!')
          .setDescription("You don't have that permission to use the command!!")
          .addField('Permission Required', `\`${invalidPermissionsFlags}\``)
          .setFooter(client.user.username, client.user.displayAvatarURL())
          .setTimestamp();

        return message.channel.send({ embeds: [noPermissionEmbed] });
      }
    }
  command.run(client, message,args)
  }
})
