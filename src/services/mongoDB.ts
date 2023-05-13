import { Interaction } from '../models';
import { ChatGPTMessageType } from '../structs/types/ChatGPTMessage';

const saveInteraction = async (guildId: string, chatGPTInteraction: ChatGPTMessageType): Promise<void> => {
    const newInteraction = { ...chatGPTInteraction, serverId: guildId };

    try {
        await Interaction.create(newInteraction);
    } catch (error) {
        console.log(`Error: ${error}`.red);
    }
};

const getInteractions = async (guildId: string) => {
    try {
        const interactions = await Interaction.find(
            {
                serverId: guildId,
            },
            'role content -_id'
        );

        return interactions || [];
    } catch (error) {
        console.log(`Error: ${error}`.red);
    }
};

export { saveInteraction, getInteractions };
