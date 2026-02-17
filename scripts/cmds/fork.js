module.exports = {
        config: {
                name: "fork",
                version: "1.7",
                author: "MahMUD",
                countDown: 5,
                role: 0,
                description: {
                        bn: "বোটের গিটহাব লিঙ্ক এবং টিউটোরিয়াল ভিডিও পান",
                        en: "Get the GitHub fork link and tutorial video",
                        vi: "Lấy liên kết fork GitHub và video hướng dẫn"
                },
                category: "github",
                guide: {
                        bn: '   {pn}: গিটহাব লিঙ্ক পেতে',
                        en: '   {pn}: Get the fork link',
                        vi: '   {pn}: Lấy liên kết fork'
                }
        },

        onStart: async function ({ api, message, event }) {
                const authorName = String.fromCharCode(77, 97, 104, 77, 85, 68); 
                if (this.config.author !== authorName) {
                        return api.sendMessage("You are not authorized to change the author name.", event.threadID, event.messageID);
                }

                const githubLink = "https://github.com/mahmudx7/hinata-Bot-V3";
                const youtubeLink = "https://youtu.be/zJsemXLaRbY?si=8O-O-nSXgQlsNvnU";

                const response = `✨ | Fork this project here:\n\n` +
                                 `${githubLink}\n\n` +
                                 `• Bot make tutorial video:\n` +
                                 `${youtubeLink}`;

                return api.sendMessage(response, event.threadID, event.messageID);
        }
};
