const COMIC_STORAGE = 'comic_storage_key';

export const useComicStorage = {
  getComics() {
    return JSON.parse(localStorage.getItem(COMIC_STORAGE));
  },

  setComics(comics) {
    localStorage.setItem(COMIC_STORAGE, comics);
  },

  removeComics() {
    localStorage.removeItem(COMIC_STORAGE);
  },

  addComicToStorage(comic) {
    const currentComics = this.getComics();
    if (currentComics) {
      this.setComics(JSON.stringify([...currentComics, comic]));
    } else {
      this.setComics(JSON.stringify([comic]));
    }
  },
};
