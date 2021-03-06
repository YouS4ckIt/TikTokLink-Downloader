let { client } = require("./../index.js");
module.exports = {
  commands: ["botturnOff", "turnOffBot"],
  expectedArgs: "",
  permissionError: "You need ADMINISTRATOR permission to run this command",
  minArgs: 0,
  maxArgs: 0,
  callback: (message, arguments, text) => {
    console.log("The Bot was manually shut down");
    process.exit();
  },
  permissions: ["ADMINISTRATOR"],
  requiredRoles: [],
};
