module.exports = (client) => {
  //#TODO Change to dynamic value for channel.
  const channelID = "812294312817721365";
  const join_iconURL = "https://i.imgur.com/atwMw8V.png";
  const leave_iconURL = "https://i.imgur.com/tI73oz7.png";
  const embedMsg = (join, member) => {
    const avatarURL =
      "https://cdn.discordapp.com/avatars/" +
      member.id +
      "/" +
      member.user.avatar +
      ".jpeg";
    var curTime = new Date();
    const embed = {
      description: join
        ? `<@${member.id}> has joined the server`
        : `<@${member.id}> has left the server`,
      url: "https://discordapp.com",
      color: 51711,
      timestamp: curTime,
      footer: {
        icon_url: avatarURL,
        text: join ? "Joined at : " : "Left at :",
      },
      thumbnail: {
        url: avatarURL,
      },
      author: {
        name: join ? "Server: Join Notification" : "Server: Leave Notification",
        url: "https://google.com",
        icon_url: join ? join_iconURL : leave_iconURL,
      },
      fields: [],
    };
    return embed;
  };
  client.on("guildMemberRemove", function (member) {
    const channel = member.guild.channels.cache.get(channelID);
    let embed = embedMsg(false, member);
    channel.send({ embed });
  });
  client.on("guildMemberAdd", function (member) {
    const channel = member.guild.channels.cache.get(channelID);
    let embed = embedMsg(true, member);
    channel.send({ embed });
  });
};
