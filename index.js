const Discord = require('discord.js');
const config = require("./discord.config.json")
const schedule = require("node-schedule")

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.options.presence = {
    activity: {
      type: "PLAYING",
    }
  }
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

// clean up text channel.
client.on('message', async msg => {
  const {
    content,
    member,
    channel
  } = msg
  if (content !== '/cleanup') return
  if (member.hasPermission("MANAGE_CHANNELS") && channel.isText) {
    const messages = await channel.messages.fetch({limit:100})
    channel.bulkDelete(messages).catch(e => {
      channel.send(e.message)
    })
  }
});

// alert at every noon.
client.on('message', async msg => {
  const {
    content
  } = msg
  const cmdPrefix = '/setalert:'
  if (!content.startsWith(cmdPrefix)) return


});

const job = schedule.scheduleJob(
  {hour: 21, minute: 20}, 
  async () => {
    const channel = await client.channels.fetch("668397474179973145")

    channel.join().then(connection => {
      const broadcast = client.voice.createBroadcast();
      const disp = connection.play(broadcast)
      const dispatcher = broadcast.play('./test.mp3');
      dispatcher.on("finish", () => {
        console.log("end")
        broadcast.end()
        connection.disconnect()
        disp.destroy()
      })
    })
  }
);


client.login(config.TOKEN);
