import { Configuration, OpenAIApi } from 'openai';
import { ChatGPTMessageType } from '../structs/types/ChatGPTMessage';

const openAI = new OpenAIApi(
    new Configuration({
        apiKey: process.env.GPT_API_KEY,
    })
);

const messages: Array<ChatGPTMessageType> = [];

function AskChatGPT(message: ChatGPTMessageType): Promise<string> {
    messages.push(message);

    return new Promise((resolve, reject) => {
        openAI
            .createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [...messages],
            })
            .then(res => {
                const message = res.data.choices[0].message?.content || '';
                messages.push({ role: 'assistant', content: message });
                resolve(message);
            })
            .catch(error => {
                reject(`Error: ${error}`);
            });
    });
}

export { AskChatGPT };
