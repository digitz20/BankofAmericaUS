'use server';

/**
 * @fileOverview Provides answers to common banking questions using a Genkit flow.
 *
 * - smartAssistAnswers - A function that takes a user question and returns an answer.
 * - SmartAssistAnswersInput - The input type for the smartAssistAnswers function.
 * - SmartAssistAnswersOutput - The return type for the smartAssistAnswers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartAssistAnswersInputSchema = z.object({
  question: z.string().describe('The user\'s banking-related question.'),
});
export type SmartAssistAnswersInput = z.infer<typeof SmartAssistAnswersInputSchema>;

const SmartAssistAnswersOutputSchema = z.object({
  answer: z.string().describe('The answer to the user\'s question.'),
});
export type SmartAssistAnswersOutput = z.infer<typeof SmartAssistAnswersOutputSchema>;

export async function smartAssistAnswers(input: SmartAssistAnswersInput): Promise<SmartAssistAnswersOutput> {
  return smartAssistAnswersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartAssistAnswersPrompt',
  input: {schema: SmartAssistAnswersInputSchema},
  output: {schema: SmartAssistAnswersOutputSchema},
  prompt: `You are a virtual assistant for Legacy National Bank. Your goal is to answer user questions about Legacy National's services and policies.

Question: {{{question}}}

Answer:`,
});

const smartAssistAnswersFlow = ai.defineFlow(
  {
    name: 'smartAssistAnswersFlow',
    inputSchema: SmartAssistAnswersInputSchema,
    outputSchema: SmartAssistAnswersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
