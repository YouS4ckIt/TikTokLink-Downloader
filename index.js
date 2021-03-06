require("dotenv").config();
const Discord = require("discord.js");
const path = require("path");
const fs = require("fs");
const TikTokScraper = require("tiktok-scraper");
const config = require("./config.json");
const util = require("./util");
const serverjoin = require("./serverjoin");
const client = new Discord.Client();
const confirmReaction = ["✅", "❌"];

module.exports = { client };
const addReactions = (message, reactions) => {
  message.react(reactions[0]);
  reactions.shift();
  if (reactions.length > 0) {
    setTimeout(() => addReactions(message, reactions), 750);
  }
};

client.on("ready", () => {
  var dir = __dirname + "/temp/";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  console.log(`Logged in as ${client.user.tag}!`);
  serverjoin(client);
  const baseFile = "command-base.js";
  const commandBase = require(`./commands/${baseFile}`);

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file));
        commandBase(client, option);
      }
    }
  };
  readCommands("commands");
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
    if (getFilesizeInMB(String(scrapperMsg[2])) > 8) {
      msg.reply(
        "Sorry the Video you asked for is bigger than 8MB, I do not support compression yet!"
      );
      return;
    } else {
      msg.delete();
      const buffer = fs.readFileSync(String(scrapperMsg[2]));
      const attachment = new Discord.MessageAttachment(buffer, "YourVideo.mp4");
      msg.reply(attachment);
    }
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
