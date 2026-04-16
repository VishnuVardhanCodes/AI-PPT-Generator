const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export interface SlideContent {
  slideNumber: number;
  heading: string;
  bulletPoints: string[];
  imageKeyword: string;
}

export const generatePresentationContent = async (topic: string, slideCount: number): Promise<SlideContent[]> => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_GROQ_API_KEY is missing');
  }

  const prompt = `Create a detailed PowerPoint presentation structure for the topic: "${topic}".
  The presentation must have exactly ${slideCount} slides.
  
  Slide structure rules:
  - Slide 1: TITLE SLIDE (heading is the topic).
  - Slides 2 to ${slideCount - 1}: CONTENT SLIDES.
  - Slide ${slideCount}: THANK YOU SLIDE (heading: "THANK YOU", bullet: "Thank you for your attention").
  
  For CONTENT SLIDES:
  - heading: UPPERCASE.
  - bulletPoints: 4 bullet points.
  - imageKeyword: keyword for Unsplash search.

  Return ONLY a valid JSON array. No markdown. No text.
  
  Format:
  [
    {
      "slideNumber": 1,
      "heading": "TOPIC",
      "bulletPoints": ["Subheading/Description"],
      "imageKeyword": "keyword"
    }
  ]`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are an AI that generates structured presentation content in JSON format only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to fetch from Groq API');
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    // Clean potential markdown blocks
    content = content.replace(/```json\n?|```/g, '').trim();
    
    // Parse JSON
    const parsed = JSON.parse(content);
    // Sometimes Groq returns { "slides": [...] } or just [...]
    return Array.isArray(parsed) ? parsed : (parsed.slides || parsed.presentation || []);
  } catch (error) {
    console.error('Groq Service Error:', error);
    throw error;
  }
};
