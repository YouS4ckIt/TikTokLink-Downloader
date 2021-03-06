module.exports = {
  commands: "kick",
  expectedArgs: "<Name> <Reason>",
  permissionError: "You need ADMINISTRATOR permission to run this command",
  minArgs: 1,
  maxArgs: null,
  callback: (message, arguments, text) => {
    const { member, mentions } = message;
    const splitedMsg = message.content.split(" ").slice(2).join(" ");
    const target = mentions.users.first();
    const tag = `<@${member.id}>`;
    if (target) {
      const targetMember = message.guild.members.cache.get(target.id);
      targetMember
        .kick(splitedMsg)
        .then(() => {
          message.channel.send(`${tag} the user: ${target} has been kicked`);
        })
        .catch((error) => {
          message.channel.send(
            `${tag} the bot doesn't have enough permissions to perform this operation.`
          );
          console.error(error);
        });
    } else {
      message.channel.send(`${tag} Please tag someone to kick.`);
    }
  },
  permissions: ["ADMINISTRATOR", "KICK_MEMBERS"],
  requiredRoles: [],
};
