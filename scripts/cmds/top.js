const axios = require("axios");

module.exports = {
  config: {
    name: "top",
    version: "1.7",
    author: "MahMUD",
    role: 0,
    category: "economy",
    guide: {
      en: "{pn} bal | {pn} exp"
    }
  },

  onStart: async function ({ api, args, message, usersData }) {
     const obfuscatedAuthor = String.fromCharCode(77, 97, 104, 77, 85, 68); 
     if (module.exports.config.author !== obfuscatedAuthor) {
     return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
     }
    try {
      const type = args[0]?.toLowerCase() || "bal";
      const allUsers = await usersData.getAll();

      if (!allUsers || allUsers.length === 0) return;

      if (type === "exp") {
        const topExp = allUsers
          .filter(u => (u.exp || 0) > 0)
          .sort((a, b) => b.exp - a.exp)
          .slice(0, 10);

        const topList = topExp.map((user, index) => {
          return `${index + 1}. ${user.name || "Unknown"}: ${formatShortNumber(user.exp)} EXP`;
        });

        return message.reply(`Top 10 EXP Users:\n\n${topList.join("\n")}`);
      }

      const topMoney = allUsers
        .filter(u => (u.money || 0) > 0)
        .sort((a, b) => b.money - a.money)
        .slice(0, 10);

      const topList = topMoney.map((user, index) => {
        return `${index + 1}. ${user.name || "Unknown"}: $${formatShortNumber(user.money)}`;
      });

      return message.reply(`Top 10 Richest Users:\n\n${topList.join("\n")}`);
    } catch (e) {}
  }
};

function formatShortNumber(num) {
  if (!num) return "0";
  const units = ["", "K", "M", "B", "T"];
  let unit = 0;
  let value = typeof num !== "number" ? parseInt(num) || 0 : num;
  while (value >= 1000 && unit < units.length - 1) {
    value /= 1000;
    unit++;
  }
  return Number(value.toFixed(1)).toString().replace(/\.0$/, "") + units[unit];
}
