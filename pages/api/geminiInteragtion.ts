import { GoogleGenerativeAI } from "@google/generative-ai";

// Function to interact with the Gemini API
export async function run(prompt: string) {
  const ApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  // Check for the API key and ensure it's a string
  if (!ApiKey) {
    throw new Error("API Key not found");
  }

  const genAI = new GoogleGenerativeAI(ApiKey);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return text;
  } catch (error) {
    console.error("Error fetching response from Gemini API:", error);
    return "An error occurred while processing the response.";
  }
}
