import { initComic, changeComic } from './comics/comics';
import { initButtons } from './navigation/navigation';
import { ComicApi } from './service/comic-api';

const mainComponent = document.getElementById('main-content');

let currentData = {};

function showError(message) {
  let errorElement = document.getElementById('error-message');

  if (!errorElement) {
    errorElement = document.createElement('p');
    errorElement.id = 'error-message';
    mainComponent.prepend(errorElement);
  }

  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function clearError() {
  const errorElement = document.getElementById('error-message');
  if (errorElement) {
    errorElement.style.display = 'none';
  }
}

function updateButtonStates() {
  const sections = document.querySelectorAll('.buttons');

  sections.forEach((section) => {
    const buttons = section.querySelectorAll('button');
    const prevButton = buttons[1];
    const nextButton = buttons[3];

    prevButton.disabled = !currentData.prev && currentData.prev !== 0;
    nextButton.disabled = !currentData.next && currentData.next !== 0;
  });
}

function attachButtonHandlers(section) {
  const buttons = section.querySelectorAll('button');
  const [firstBtn, prevBtn, randomBtn, nextBtn, lastBtn] = buttons;

  if (firstBtn) {
    firstBtn.addEventListener('click', () => loadComic('first'));
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => loadComicOnIndex(currentData.prev));
  }
  if (randomBtn) {
    randomBtn.addEventListener('click', () => loadComic('random'));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => loadComicOnIndex(currentData.next));
  }
  if (lastBtn) {
    lastBtn.addEventListener('click', () => loadComic('latest'));
  }
}

async function loadComic(position) {
  try {
    await ComicApi.getComic(position)
      .then((res) => {
        currentData = res;
        clearError();
        changeComic(res.comic);
        updateButtonStates();
      })
      .catch((err) => {
        showError(`Error loading comic: ${err.message || err}`);
      });
  } catch (error) {
    showError(`Error loading comic: ${error.message || error}`);
  }
}

async function loadComicOnIndex(index) {
  try {
    const data = await ComicApi.getComicIndex(index);
    currentData = data;
    clearError();
    changeComic(data.comic);
    updateButtonStates();
  } catch (error) {
    showError(`Error loading comic: ${error.message || error}`);
  }
}

async function initComponents() {
  try {
    const data = await ComicApi.getComic();
    currentData = data;
    clearError();
    mainComponent.appendChild(initComic(data.comic));
  } catch (error) {
    showError(`Error initializing comic: ${error.message || error}`);
  } finally {
    const topButtons = initButtons();
    attachButtonHandlers(topButtons);
    mainComponent.prepend(topButtons);

    const bottomButtons = initButtons();
    attachButtonHandlers(bottomButtons);
    mainComponent.appendChild(bottomButtons);

    updateButtonStates();
  }
}

initComponents();
