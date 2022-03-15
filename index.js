const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Yo boi!!'));

app.listen(port, () =>
	console.log(`Your app is listening to http://localhost:${port}`)
);

const discord = require('discord.js')
const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection
client.slashCommands = new Collection();
client.config = require("./config.json");

require("./handler")(client);

client.login(process.env.token);