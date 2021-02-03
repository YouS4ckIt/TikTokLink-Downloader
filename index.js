require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

const fs = require("fs");
const TikTokScraper = require("tiktok-scraper");
const config = require("./config.json");
const command = require("./command");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  command(client, ["ping", "test"], (message) => {
    message.channel.send("TEEE");
  });
  command(client, "servers", (message) => {
    client.guilds.cache.forEach((guild) => {
      console.log(guild);
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      );
    });
  });
  command(client, ["cc", "clearchannnel", "delMsg"], (message) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.channel.messages.fetch().then((results) => {
        //message.channel.bulkDelete(results);
        message.channel.send(
          "Are you sure you want to delete everything in this channel ?"
        );
        //console.log(results);
      });
    }
  });
  command(client, "status", (message) => {
    const content = message.content.replace("!status ", "");
    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    });
  });
});

let scrapperMsg;
let options = {
  _: ["video"],
  d: true,
  download: true,
  asyncDownload: 5,
  a: 5,
  "async-download": 5,
  filepath: __dirname + "/temp/",
};

client.on("message", async (msg) => {
  // basic functionality, action on a message in channel.
  if (msg.content.includes("https://vm.tiktok.com/")) {
    var expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
    let message = msg.content.match(expression);
    await startScraper(message);
    msg.delete();
    const buffer = fs.readFileSync(String(scrapperMsg[2]));
    const attachment = new Discord.MessageAttachment(buffer, "YourVideo.mp4");
    msg.reply(attachment);
  }
});

client.login(process.env.BOTTOKEN); // Add your DiscordBot Tokken here @@@@@
const startScraper = async (link) => {
  try {
    const scraper = await TikTokScraper["video"](link, options);
    if (scraper.message) {
      console.log(scraper.message);
      scrapperMsg = scraper.message.split(" ");
    }
  } catch (error) {
    console.error(error.message);
    console.error(error);
  }
};
