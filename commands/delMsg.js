const util = require("./../util");

module.exports = {
  commands: ["cc", "clearchannel", "deleteMessages", "delMsg"],
  expectedArgs: "?<amount>",
  permissionError: `You need MODERATOR permissions to run this command`,
  minArgs: 0,
  maxArgs: 2,
  callback: (message, arguments, text) => {
    message.channel.messages.fetch().then((results) => {
      let split = message.content.split(" ");
      if (split.length > 1 && util.isNumber(split[1])) {
        message.delete();
        setTimeout(() => message.channel.bulkDelete(split[1], true), 750);
        // message.channel.bulkDelete(split[1], true);
      } else if (split.length == 1) {
        message.channel
          .send(
            "THIS COMMAND IS NOT FULLY FUNCTIONAL WAIT TILL IM NOT LAZY AND FINISH THIS"
          )
          .then((message) => {
            addReactions(message, confirmReaction);
          });
      } else {
        message.channel.send("Wrong command usage: please check help page!");
      }
    });
  },
  permissions: "ADMINISTRATOR",
  requiredRoles: [],
};
