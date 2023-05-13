import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';
import { Command } from '../../structs/types/Command';
import { AskChatGPT } from '../../services/ChatGPT';

export default new Command({
    name: 'ask-gpt',
    description: 'pergunte ao chat-gpt',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'question',
            description: 'question',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    async run({ interaction, options }) {
        await interaction.deferReply();

        const message = options.getString('question', true);
        const answer = await AskChatGPT({ role: 'user', content: message });

        const content = `> ${message}
        \`\`\`${answer}\`\`\` `;

        interaction.editReply({ content: content });
    },
});
