module.exports = {
  commands: "ban",
  expectedArgs: "<Name> <Reason>",
  permissionError: "You need ADMINISTRATOR permission to run this command",
  minArgs: 2,
  maxArgs: null,
  callback: (message, arguments, text) => {
    const { member, mentions } = message;
    const splitedMsg = message.content.split(" ").slice(2).join(" ");
    const target = mentions.users.first();
    const tag = `<@${member.id}>`;
    if (target) {
      const targetMember = message.guild.members.cache.get(target.id);
      targetMember.ban({ days: 0, reason: splitedMsg });
      message.channel.send(`${tag} the user: ${target} has been banned`);
    } else {
      message.channel.send(`${tag} Please tag someone to ban.`);
    }
  },
  permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
  requiredRoles: [],
};
