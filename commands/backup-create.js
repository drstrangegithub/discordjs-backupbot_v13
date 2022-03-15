const backup = require('discord-backup')
const config = require('../config.json')

module.exports = {
    name: "backup-create",
    description: "create backup",
    permissions: ["ADMINISTRATOR"],

    run: async (client, message, args) => {

        backup.create(message.guild).then((backupData) => {

        return message.channel.send('Backup created! Here is your ID: `'+backupData.id+'`! Use `'+config.prefix+'backup-load '+backupData.id+'` to load the backup on another server!');

    }).catch(() => {

        return message.channel.send(':x: An error occurred, please check if the bot is administrator!');

    });
    
}}
