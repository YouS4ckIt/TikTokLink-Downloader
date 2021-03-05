let { client } = require("./../index.js");
module.exports = {
  commands: "ping",
  expectedArgs: "",
  permissionError: "",
  minArgs: 0,
  maxArgs: 0,
  callback: (message, arguments, text) => {
    const reactionEmoji = message.guild.emojis.cache.find(
      (emoji) => emoji.name === "aaa"
    );
    if (reactionEmoji) {
      message.react(reactionEmoji);
    }

    message.channel.send("Pong!");
  },
  permissions: [],
  requiredRoles: [],
};
