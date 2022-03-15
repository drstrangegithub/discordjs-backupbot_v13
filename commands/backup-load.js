const config = require('../config.json')
const backup = require("discord-backup");

module.exports = {
  name: "backup-load",
  description: "load backup",
  permissions: ["ADMINISTRATOR"],

  run: async (client, message, args) => {

    const backupID = args.join(' ');

    backup.fetch(backupID).then(async () => {

      message.channel.send({ content: ':warning: All the server channels, roles, emojis and settings will be cleared. type `-cancel` to cancel and `-confirm` to confirm.' });

      // const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['-confirm', 'cancel'].includes(m.content), {
      //     time: 60000,
      //     max: 1
      // });
      // collector.on('collect', (m) => {
      // const confirm = m.content === '-confirm';
      // collector.stop();
      // if (confirm) {
const msg_filter = (m) => m.author.id === message.author.id;
const collected = await message.channel.awaitMessages({ filter: msg_filter, max: 1 });

if (!collected.first() || collected.first().content === '-cancel') return message.channel.send(':x: Cancelled!');
      if (collected.first().content !== '-confirm') return message.channel.send('Invalid option!');
      backup.load(backupID, message.guild).then(() => {

        return message.author.send({ content: 'Backup loaded successfully!' });

      }).catch((err) => {

        if (err === 'No backup found')
          return message.channel.send({ content: ':x: No backup found for ID ' + backupID + '!' });
        else
          return message.author.send({ content: ':x: An error occurred: ' } + (typeof err === 'string') ? err : JSON.stringify(err));

      });

      // } else {
      //     return message.channel.send({ content: ':x: Cancelled.'});
      // }
      // })

      // collector.on('end', (collected, reason) => {
      // if (reason === 'time')
      // return message.channel.send({ content: ':x: Command timed out! Please retry.' });
      // })

    }).catch(() => {
      return message.channel.send({ content: ':x: No backup found for ID ' + backupID + '!' });
    });

  }
}
