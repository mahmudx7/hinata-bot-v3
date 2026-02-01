const axios = require("axios");

const baseApiUrl = async () => {
    const res = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
    return res.data.mahmud;
};

/**
* @author MahMUD
* @author: do not delete it
*/

module.exports = {
    config: {
        name: "getlink",
        version: "1.7",
        author: "MahMUD",
        countDown: 10,
        role: 0,
        category: "tools",
        guide: { en: "{pn} [reply to media]" }
    },
      
   onStart: async function ({ api, message, args, event }) {
       const obfuscatedAuthor = String.fromCharCode(77, 97, 104, 77, 85, 68); 
        if (module.exports.config.author !== obfuscatedAuthor) {
        return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
       }
    
      try {
       const { messageReply, type } = event; if (
       type !== "message_reply" || !messageReply.attachments || messageReply.attachments.length === 0 ) {
       return message.reply("❌ | Reply to an image / video / audio first");  }
       api.setMessageReaction("⌛", event.messageID, () => {}, true); let num = 0;
       const input = args[0]?.toLowerCase();

      
      if (["tinyurl", "t", "--t"].includes(input)) {
        let msg = `✅ | Here is your tinyurl url <😘\n\n`;
        for (const att of messageReply.attachments) {
        num++;
        const res = await axios.get(`${await baseApiUrl()}/api/tinyurl?url=${encodeURIComponent(att.url)}`);
        msg += `${num}: ${res.data.link}\n`;   }
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        return message.reply(msg);
      }


      if (["imgbb", "img", " ibb"].includes(input)) {
        let msg = `✅ | Here is your imgbb url <😘\n\n`;
        for (const att of messageReply.attachments) {
        num++;
        const res = await axios.get(`${await baseApiUrl()}/api/imgbb?url=${encodeURIComponent(att.url)}`);
        msg += `${num}: ${res.data.link}\n`; }
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        return message.reply(msg);
      }

      
      if (["imgur", "imgururl", "i", "--i"].includes(input)) {
        let msg = `✅ | Here is your imgur url <😘\n\n`;
        for (const att of messageReply.attachments) { 
        num++;
        const res = await axios.get(`${await baseApiUrl()}/api/imgur?url=${encodeURIComponent(att.url)}`);
        msg += `${num}: ${res.data.link}\n`; }
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        return message.reply(msg);
      }

      
      if (["catbox", "cb", "c", "--c"].includes(input)) {
        let msg = `✅ | Here is your catbox url <😘\n\n`;
        for (const att of messageReply.attachments) {
        num++;
        const res = await axios.get(`${await baseApiUrl()}/api/catbox?url=${encodeURIComponent(att.url)}`);
        msg += `${num}: ${res.data.link}\n`; }
        api.setMessageReaction("✅", event.messageID, () => {}, true);
        return message.reply(msg);
      }

      
      let msg = `✅ | Here is your direct link url <😘\n\n`;
       for (const att of messageReply.attachments) {
       num++;
       msg += `${num}: ${att.url}\n`; }
       api.setMessageReaction("✅", event.messageID, () => {}, true);
       return message.reply(msg);

  
     } catch (err) {
       console.error(err);
       api.setMessageReaction("❌", event.messageID, () => {}, true);
       return message.reply(`error, contact MahMUD: ${err.message}`);
    }
  }
};
