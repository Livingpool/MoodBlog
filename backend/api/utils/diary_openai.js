const OpenAI = require('openai');
const transformMessages = require('./helper');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const diaryOpenAIChat = async (messages) => {
    if (messages.length === 0) {
        return "沒有收到訊息";
    } else {
        console.log("Calling OpenAI API...");
        console.log(messages);

        messages = transformMessages(messages);

        const messagesWithSystemMsg = [
            { role: 'system', content: '你是一位情緒諮商師，我希望你對我的日記內容進行評論。這個評論需要包括一個情緒分數，以1至5分的方式進行評定，1分代表情緒非常負面，而5分代表情緒非常正面。我也需要完整的建議，以幫助我更好地處理我的情緒和克服其中的困難。請提供50~100字的完整回應，這樣我可以更好地理解並應用您的專業意見，一定要是完整內容，情緒分數和建議都需要冒號' },
            ...messages,
        ];

        const completion = await openai.chat.completions.create({
            messages: messagesWithSystemMsg,
            model: 'gpt-3.5-turbo',
            max_tokens: 500,
            temperature: 0.9,
        });

        const fullConversation = completion.choices.map(choice => choice.message.content).join('\n');

        console.log(fullConversation);

        return fullConversation;
    }
}

module.exports = diaryOpenAIChat;
