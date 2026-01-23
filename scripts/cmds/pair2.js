const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
  return base.data.mahmud;
};

const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "pair2",
    version: "1.7",
    author: "MahMUD",
    category: "love",
    guide: "{prefix}pair"
  },

  onStart: async function ({ event, threadsData, message, usersData, api }) {
    const obfuscatedAuthor = String.fromCharCode(77, 97, 104, 77, 85, 68); 
    if (module.exports.config.author !== obfuscatedAuthor) {
      return api.sendMessage("You are not authorized to change the author name.\n", event.threadID, event.messageID);
    }

    const uidI = event.senderID;
    const name1 = await usersData.getName(uidI);
    const threadData = await threadsData.get(event.threadID);

    const senderInfo = threadData.members.find(mem => mem.userID == uidI);
    const gender1 = senderInfo?.gender;

    if (!gender1 || (gender1 !== "MALE" && gender1 !== "FEMALE")) {
      return message.reply("Couldn't determine your gender.");
    }

    const oppositeGender = gender1 === "MALE" ? "FEMALE" : "MALE";
    const candidates = threadData.members.filter(
      member => member.gender === oppositeGender && member.inGroup && member.userID !== uidI
    );

    if (candidates.length === 0) {
      return message.reply(`No ${oppositeGender.toLowerCase()} members found.`);
    }

    const matched = candidates[Math.floor(Math.random() * candidates.length)];
    const uid2 = matched.userID;
    const name2 = await usersData.getName(uid2);

    const lovePercent = Math.floor(Math.random() * 36) + 65;

    const base = await baseApiUrl();
    const apiUrl1 = `${base}/api/pfp?mahmud=${uidI}`;
    const apiUrl2 = `${base}/api/pfp?mahmud=${uid2}`;

    const minimalMessage = `Matched: ${name1} & ${name2}\nLove: ${lovePercent}%`;

    return message.reply({
      body: minimalMessage,
      attachment: [
        await getStreamFromURL(apiUrl1),
        await getStreamFromURL(apiUrl2)
      ]
    });
  }
};
