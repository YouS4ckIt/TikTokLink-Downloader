const commando = require("discord.js-commando");

module.exports = class PlayMusic extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "playaudio",
      group: "misc",
      memberName: "playaudio",
      description: "joining channel",
    });
  }
  async run(message, args) {
    message.member.voiceChannel.join();
  }
};
