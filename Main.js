require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
const { exec } = require("child_process");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  var pathToVideo;
  if (msg.content.includes("https://vm.tiktok.com/")) {
    var message = msg.content;
    exec("tiktok-scraper video " + message + " -d", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      msg.delete();
      var tempmsg = msg.channel.send("Processing....");
      var temp = `${stdout}`.split(" ");
      pathToVideo = temp[2].split(/\n/g)[0];
      console.log(pathToVideo + "...@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      const buffer = fs.readFileSync(String(pathToVideo));
      const attachment = new Discord.MessageAttachment(buffer, "tester.mp4");
      msg.reply(attachment);
    });
  }
});

client.login(process.env.BOTTOKEN);
