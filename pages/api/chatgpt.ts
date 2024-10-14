// import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';

// interface OpenAIResponse {
//   choices: Array<{
//     text: string;
//   }>;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { prompt } = req.body;

//   if (!prompt) {
//     return res.status(400).json({ error: 'Prompt is required' });
//   }

//   try {
//     const response = await axios.post<OpenAIResponse>(
//       'https://api.openai.com/v1/completions',
//       {
//         model: 'text-davinci-003',
//         prompt,
//         max_tokens: 100,
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     res.status(200).json({ response: response.data.choices[0].text.trim() });
//   } catch (error) {
//     console.error('Error with ChatGPT API:', error);
//     res.status(500).json({ error: 'Error with ChatGPT API' });
//   }
// }
