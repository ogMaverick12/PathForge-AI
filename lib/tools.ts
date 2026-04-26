import { search } from 'duck-duck-scrape';

export interface SearchResult {
  title: string;
  url: string;
  description: string;
}

export async function searchWeb(query: string): Promise<SearchResult[]> {
  try {
    const results = await search(query, {
      time: 'y',     // Past year
    });

    if (!results.noResults && results.results) {
      // Return top 4 results to save tokens
      return results.results.slice(0, 4).map(r => ({
        title: r.title,
        url: r.url,
        description: r.description
      }));
    }
    return [];
  } catch (error) {
    console.error("DuckDuckGo Search Error:", error);
    return [];
  }
}

export const toolsDefinition = [
  {
    type: "function",
    function: {
      name: "search_web",
      description: "Search the web for up-to-date, real-time information. Use this to verify current university fees, placement medians, entry-level salaries, or global news.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The search query (e.g., 'VIT Vellore median placement package 2026' or 'average salary data scientist in India 2025')",
          },
        },
        required: ["query"],
      },
    },
  }
];
