import { GIPHY_API_KEY } from '../env';

const URL = 'https://api.giphy.com/v1/gifs';

export const EmployeeService = {
  async getEmployeeImage(name) {
    const searchUrl =
      URL +
      `/search?api_key=${GIPHY_API_KEY}&q=${name}&limit=1&rating=g&lang=en&bundle=messaging_non_clips`;

    try {
      const response = await fetch(searchUrl, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      return result.data[0].images.original.webp;
    } catch (error) {
      console.error(error.message);
    }
  },
};
