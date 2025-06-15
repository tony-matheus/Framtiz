import OpenAI from 'openai';
import { BLOG_PROMPTS } from './contants/potential-prompts';
import { formatBlogMessage } from './helpers/format-blog-message';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function analyzeBlogContent(userText: string) {
  const response = await openai.responses.create({
    model: 'gpt-4.1-nano',
    input: [
      {
        role: 'system',
        content: [
          {
            type: 'input_text',
            text: BLOG_PROMPTS.SYSTEM,
          },
        ],
      },
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: formatBlogMessage({ text: userText }),
          },
        ],
      },
      // {
      //   id: 'msg_683bead54018819dbcad5cec81e8568601b71942d3ea7587',
      //   role: 'assistant',
      //   content: [
      //     {
      //       type: 'output_text',
      //       text: BLOG_PROMPTS.ASSISTANT,
      //       annotations: [],
      //     },
      //   ],
      // },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'document_output',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            excerpt: {
              type: 'string',
              description: 'A short excerpt or summary of the document.',
            },
            title: {
              type: 'string',
              description: 'The title of the document.',
            },
            read_time: {
              type: 'number',
              description:
                'Estimated time required to read the document, in minutes.',
            },
            formatted_suggestion: {
              type: 'string',
              description: 'A formatted suggestion related to the document.',
            },
          },
          required: ['excerpt', 'title', 'read_time', 'formatted_suggestion'],
          additionalProperties: false,
        },
      },
    },

    reasoning: {},
    tools: [],
    temperature: 1,
    max_output_tokens: 2048,
    top_p: 1,
    store: true,
  });

  return response.output_text;
}
