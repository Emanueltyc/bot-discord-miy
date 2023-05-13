import { ChatCompletionRequestMessageRoleEnum } from 'openai';

export type ChatGPTMessageType = {
    role: ChatCompletionRequestMessageRoleEnum;
    content: string;
};
