export const buildGroqPrompt = (topic, slideCount) => {
  return `Create a detailed PowerPoint presentation structure for the topic: "${topic}".
  The presentation must have exactly ${slideCount} slides.
  
  Follow these slide-specific rules:
  1. Slide 1 must be the TITLE SLIDE. Its heading should be the topic.
  2. The last slide must be a THANK YOU SLIDE. Its heading should be "THANK YOU" and it should have one bullet point: "Thank you for your attention".
  3. All other slides are CONTENT SLIDES.
  
  For each CONTENT SLIDE:
  - heading: MUST be UPPERCASE.
  - bulletPoints: A JSON array of 4 concise bullet points.
  - imageKeyword: A short, descriptive phrase (2-4 words) to find a relevant high-quality landscape image on Unsplash.
  
  Return the result as a STRICT JSON array of objects. 
  Each object must have: slideNumber (number), heading (string), bulletPoints (array of strings), and imageKeyword (string).
  
  IMPORTANT: 
  - Return ONLY valid JSON.
  - NO markdown, NO explanations, NO extra text.
  - Ensure all headings are UPPERCASE.`;
};
