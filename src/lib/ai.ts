import { GoogleGenAI, Type } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface TLDRResult {
  takeaways: string[];
  readingTimeMin: number;
}

export async function generateTLDR(content: string): Promise<TLDRResult | null> {
  if (!ai) {
    console.warn("Gemini API key is not set. Cannot generate TLDR.");
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following article and provide an executive summary including 3-5 key takeaways and an estimated reading time in minutes.\n\nArticle Content:\n${content}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            takeaways: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING
              },
              description: "3 to 5 key takeaways from the article."
            },
            readingTimeMin: {
              type: Type.NUMBER,
              description: "Estimated reading time in minutes, as an integer."
            }
          },
          required: ["takeaways", "readingTimeMin"]
        }
      }
    });

    const jsonStr = response.text?.trim();
    if (jsonStr) {
      return JSON.parse(jsonStr) as TLDRResult;
    }
    return null;
  } catch (error) {
    console.error("Failed to generate TLDR:", error);
    return null;
  }
}
