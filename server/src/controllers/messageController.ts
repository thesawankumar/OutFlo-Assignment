import { Request, Response } from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});
const generateMessage = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, job_title, company, location, summary } = req.body;

        if (!name || !job_title || !company || !location || !summary) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `Write a short personalized outreach message for ${name}, a ${job_title} at ${company} in ${location}. Bio: ${summary}`,
                },
            ],
            max_tokens: 100,
            temperature: 0.7,
        });

        const message = completion.choices[0].message.content?.trim();

        if (!message) {
            return res.status(500).json({ error: 'Failed to generate message.' });
        }

        res.json({ message });
    } catch (error) {
        console.error('OpenAI error:', error);
        res.status(500).json({ error: 'Something went wrong while generating the message.' });
    }
};

export default generateMessage;