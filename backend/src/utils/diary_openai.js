const OpenAI = require('openai')

const transformMessages = require('./helper')

require('dotenv').config()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// 日記版：傳入 messages，取得 OpenAI API 的回覆
const diaryOpenAIChat = async (messages) => {
    // 輸入空訊息直接回傳
    if (messages.length === 0) {
        return JSON.stringify({ error: "沒有收到訊息" }); // 返回 JSON 格式的錯誤訊息
    } else {
        // 轉換成 openai 格式

        console.log("Calling OpenAI API...");
        console.log(messages);

        messages = transformMessages(messages); // 转换消息格式

        // 在 messages 前添加系统消息
        const messagesWithSystemMsg = [
            { role: 'system', content: '你是一位情緒諮商師，我希望你對我的日記內容進行評論。這個評論需要包括一個情緒分數，以1至5分的方式進行評定，1分代表情緒非常負面，而5分代表情緒非常正面。除了情緒分數，我也需要完整的建議，以幫助我更好地處理我的情緒和克服其中的困難。請提供50~100字的完整回應，這樣我可以更好地理解並應用您的專業意見，一定要是完整內容' },
            ...messages,
        ];

        // 调用 OpenAI API
        const completion = await openai.chat.completions.create({
            messages: messagesWithSystemMsg, // 使用包含系统消息的数组
            model: 'gpt-3.5-turbo',
            max_tokens: 300,
            temperature: 0.9,
        });

        // 提取完整的對話內容
        const fullConversation = completion.choices.map(choice => choice.message.content).join('\n');

        console.log(fullConversation);

        return JSON.stringify({ response: fullConversation }); // 返回 JSON 格式的回應
    }
}

module.exports = diaryOpenAIChat;
