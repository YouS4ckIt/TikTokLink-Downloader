let { client } = require("./../index.js");
module.exports = {
  commands: ["servers", "members", "info"],
  expectedArgs: "",
  permissionError: "You need ADMINISTRATOR permission to run this command",
  minArgs: 0,
  maxArgs: 0,
  callback: (message, arguments, text) => {
    // const { guild } = message;
    // message.channel.send(
    //   `${guild.name} has a total of ${guild.memberCount} members`
    // );
    const { guild, author } = message;
    //console.log(guild);
    console.log(message.guild.iconURL());
    client.guilds.cache.forEach((guild) => {
      //console.log(guild);
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      );
    });
  },
  permissions: ["ADMINISTRATOR"],
  requiredRoles: [],
};
