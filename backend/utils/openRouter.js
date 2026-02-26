
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function generateJobSearchQuery(resumeText) {
  const prompt = `
You are a job search assistant AI. Based on the resume text below, generate a job search query string that would return highly relevant jobs for this person.

Resume:
"""
${resumeText}
"""

Respond ONLY with a search string. Examples:
- "React Developer remote"
- "Java Backend Engineer Bangalore"
- "Full Stack Developer JavaScript Node.js USA"

Be concise, 6–8 words maximum. Do not return any extra formatting or explanation.
`;

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You help generate job search queries from resumes.' },
        { role: 'user', content: prompt }
      ]
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  if (response.data?.choices?.length > 0 && response.data.choices[0].message) {
    return response.data.choices[0].message.content.trim(); // return the query string directly
  } else {
    throw new Error("Invalid response from OpenRouter");
  }
}

export default generateJobSearchQuery;
