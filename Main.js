require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const TikTokScraper = require("tiktok-scraper");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
let video = "video";
let scrapperMsg;
let options = {
  _: ["video"],
  d: true,
  download: true,
  asyncDownload: 5,
  a: 5,
  "async-download": 5,
  filepath: "C:\\Users\\YouSuckIt\\Desktop\\DiscordBot",
};

client.on("message", async (msg) => {
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

client.login(process.env.BOTTOKEN);
const startScraper = async (link) => {
  try {
    const scraper = await TikTokScraper[video](link, options);
    if (scraper.message) {
      console.log(scraper.message);
      scrapperMsg = scraper.message.split(" ");
    }
  } catch (error) {
    console.error(error.message);
    console.error(error);
  }
};
