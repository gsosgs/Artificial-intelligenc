const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    
    // البوت سيرد إذا تم عمل منشن له
    if (message.mentions.has(client.user)) {
        const text = message.content.toLowerCase();
        
        if (text.includes("كيفك")) {
            message.reply("أنا بخير يا Bato، كيف أقدر أساعدك اليوم؟");
        } else if (text.includes("اسمك")) {
            message.reply("اسمي Void، وأنا جاهز للعمل!");
        } else {
            message.reply("أنا بوت يعمل بكامل طاقتي، اسألني أي شيء مبرمج عليّ!");
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
