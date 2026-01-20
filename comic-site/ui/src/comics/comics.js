export function initComic(comic) {
  const article = document.createElement('article');

  const title = document.createElement('h3');
  title.id = 'comic-title';
  title.textContent = comic.title;

  article.appendChild(title);

  const img = document.createElement('img');
  img.id = 'comic-image';
  img.src = comic.imgUrl;
  img.alt = comic.alt;

  article.appendChild(img);

  return article;
}

export function changeComic(comic) {
  const title = document.getElementById('comic-title');
  const image = document.getElementById('comic-image');

  title.textContent = comic.title;
  image.src = comic.imgUrl;
  image.alt = comic.alt;
}
