const { Client, GatewayIntentBits } = require('discord.js');
const { OpenAI } = require('openai');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    // البوت يرد فقط إذا تم عمل Mention له
    if (message.mentions.has(client.user)) {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message.content }],
        });
        message.reply(response.choices[0].message.content);
    }
});

client.login(process.env.DISCORD_TOKEN);
