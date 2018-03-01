const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

const { prefix, token } = require('./config.json');

client.on('ready', () => {
    console.log('Yay! I\'ve successfully started with no errors');
    client.user.setActivity('heck off');
});

client.on('message', msg => {
    if(msg.content.startsWith(prefix + 'ping')) {
        msg.reply('I\'ve been ponged!').then(received => {
            received.edit(`Pong! ▪ I took: ${received.createdTimestamp - msg.createdTimestamp}ms`);
        });
    }

    if(msg.content.startsWith(prefix + 'kick')) {
        let userToKick = msg.mentions.members.first();
        let reason = msg.content.split(' ').slice(3).join(' ');
        let modLog = msg.guild.channels.find('name', 'mod-log');

        if(!msg.member.permissions.has('KICK_MEMBERS')) return msg.reply('Insufficient permissions!');
        // !msg.member.roles.has('387063307095375876')

        if(!userToKick || userToKick === null) return msg.reply('Invalid user!');

        if(userToKick.id === msg.author.id) return msg.reply('You cannot kick yourself!');

        if(!userToKick.kickable) return msg.reply('This user cannot be kicked!');

        if(userToKick.id === client.user.id) return msg.reply('I cannot kick myself!');

        userToKick.kick();
        msg.channel.send('Booted! 👢');
        modLog.send(`👢 | <@${msg.author.id}> kicked <@${userToKick.id}> for **${reason || "No reason? :("}**`);
    }

    if(msg.content.startsWith(prefix + 'help')) {
        msg.reply(`Typing \`${msg.content}\` currently does not show a list of available commands.\nInstead, you'll have to run: \`${msg.content + ' <commandName>'}\``);
    }

    /* if(msg.content.startsWith(prefix + 'say')) { 
        let toSay = msg.content.split(' ').slice(2).join(' ');

        msg.channel.send(toSay);
    } */
});

client.login(token);
