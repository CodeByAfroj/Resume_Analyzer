import axios from "axios";
import dotenv from "dotenv"
dotenv.config();
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;  // Use the actual API key

export async function searchJobs(keywords) {
  const query = keywords.join(' ').trim();
  
  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/search`,
    params: {
      query: query, // 'developer jobs in chicago' or other keywords
      page: '1',
      num_pages: '1',
     
      country: 'in', // Country code for the search
      date_posted: 'all', 
      remote: 'true',// All jobs, or you can filter by time period
    },
    headers: {
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.data; // List of job matches
  } catch (error) {
    console.error("Error fetching jobs:", error?.response?.data || error.message);
    return [];
  }
}
