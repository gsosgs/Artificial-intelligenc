const { Client, GatewayIntentBits } = require('discord.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

// ضع الـ API Key الخاص بك هنا أو في المتغيرات
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.mentions.has(client.user)) {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(message.content);
            const response = await result.response;
            message.reply(response.text());
        } catch (error) {
            message.reply("عذراً، حدث خطأ تقني. تأكد من الـ API Key.");
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
