let { client } = require("./../index.js");
module.exports = {
  commands: "botstatus",
  expectedArgs: "",
  permissionError: "You need ADMINISTRATOR permission to run this command",
  minArgs: 1,
  maxArgs: null,
  callback: (message, arguments, text) => {
    const content = message.content.replace("!status ", "");
    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    });
  },
  permissions: ["ADMINISTRATOR"],
  requiredRoles: [],
};
