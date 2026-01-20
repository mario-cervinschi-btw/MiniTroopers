const API_URL = 'http://localhost:3000/comics';

export const ComicApi = {
  async getComic(position) {
    let FETCH_URL = API_URL;
    if (position) {
      FETCH_URL += `?position=${position}`;
    }

    const response = await fetch(FETCH_URL, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  },
  async getComicIndex(index) {
    const FETCH_URL = API_URL + `/${index}`;

    const response = await fetch(FETCH_URL, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  },
};
