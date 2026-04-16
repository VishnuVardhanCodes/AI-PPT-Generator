const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

export const fetchSlideImage = async (keyword: string): Promise<string> => {
  const accessKey = import.meta.env.VITE_UNSPLASH_KEY;
  if (!accessKey) {
    console.warn('VITE_UNSPLASH_KEY is missing. Using placeholder images.');
    return `https://picsum.photos/seed/${encodeURIComponent(keyword)}/800/600`;
  }

  try {
    const response = await fetch(`${UNSPLASH_API_URL}?query=${encodeURIComponent(keyword)}&orientation=landscape&per_page=1`, {
      headers: {
        'Authorization': `Client-ID ${accessKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Unsplash');
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }

    // Fallback if no results
    return `https://picsum.photos/seed/${encodeURIComponent(keyword)}/800/600`;
  } catch (error) {
    console.error('Image Service Error:', error);
    return `https://picsum.photos/seed/${encodeURIComponent(keyword)}/800/600`;
  }
};
