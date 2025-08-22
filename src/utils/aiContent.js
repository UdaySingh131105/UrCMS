"use server";

import { marked } from "marked";

export default async function AIContent({ text, customInstructions = "", contentGen = false }) {
    let basePrompt;

    if (contentGen) {
        basePrompt = `
        You are an AI content generator. 
        Your task is to create high-quality, original, and engaging content based on the following input text.
        
        Input Text: "${text}"
        Additional Instructions: "${customInstructions}"

        Requirements:
        - Keep the content clear, concise, and structured.
        - Ensure the tone is professional yet readable.
        - Avoid repetition or filler content.
        - Format neatly with headings/paragraphs if needed.
        `;
    } else {
        basePrompt = `
        You are an AI content assistant. 
        Analyze and improve the provided text by applying the given instructions. 
        Provide suggestions, corrections, or enhancements without losing the original meaning.

        Input Text: "${text}"
        Additional Instructions: "${customInstructions}"

        Requirements:
        - Highlight key improvements (grammar, clarity, style).
        - Keep it user-friendly and natural.
        - Maintain the context of the original text.
        `;
    }

    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // or gpt-4.1-mini, gpt-3.5-turbo, etc.
                messages: [
                    { role: "user", content: basePrompt }
                ],
                max_tokens: contentGen ? 1000 : 300,
            }),
        });

        if (!res.ok) {
            throw new Error(`OpenAI API error: ${res.statusText}`);
        }

        const data = await res.json();
        const mdResponse = data.choices?.[0]?.message?.content || "No response generated.";
        const output = marked(mdResponse);
        return output;

    } catch (error) {
        console.error("AIContent Error:", error.message);
        return `Error: ${error.message}`;
    }
}
