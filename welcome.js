module.exports = (client) => {
  client.on("guildMemberAdd", function (member) {
    console.log(`a user joins a guild: ${member.tag}`);
  });
};
