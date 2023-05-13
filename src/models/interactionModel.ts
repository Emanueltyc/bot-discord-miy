import mongoose from 'mongoose';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';

const interactionSchema = new mongoose.Schema({
    role: { type: String, trim: true },
    content: { type: String, trim: true },
    serverId: { type: String, trim: true },
});

export const Interaction = mongoose.model('Interaction', interactionSchema);
