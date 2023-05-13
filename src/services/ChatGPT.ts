import { Configuration, OpenAIApi } from 'openai';
import { ChatGPTMessageType } from '../structs/types/ChatGPTMessage';
import { getInteractions, saveInteraction } from './mongoDB';

const openAI = new OpenAIApi(
    new Configuration({
        apiKey: process.env.GPT_API_KEY,
    })
);

async function AskChatGPT(message: ChatGPTMessageType, guildId: string): Promise<string | false> {
    await saveInteraction(guildId, message);

    const interactions = (await getInteractions(guildId)) as Array<ChatGPTMessageType>;

    return new Promise((resolve, reject) => {
        openAI
            .createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [...interactions],
            })
            .then(res => {
                const message = res.data.choices[0].message?.content || '';
                saveInteraction(guildId, { role: 'assistant', content: message })
                    .then(() => resolve(message))
                    .catch(error => resolve(`error: ${error}`));
            })
            .catch(() => {
                reject(false);
            });
    });
}

export { AskChatGPT };
