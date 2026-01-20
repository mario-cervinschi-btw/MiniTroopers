const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'src/features/dark-mode-switch/dark-mode-switch.css';
document.head.appendChild(link);

let darkModeState = false; // init with white mode

const darkModePill = document.getElementById('dark-mode');
const darkModeObject = document.getElementById('dark-mode-object');
const icon = document.createElement('i');

const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
}

export function initDarkModeSwitch() {
  icon.classList.add('bi');
  darkModePill.append(icon);

  darkModeObject.addEventListener('click', () => {
    darkModeState = !darkModeState;
    renderDarkModeSwitch();
  });

  renderDarkModeSwitch();
}

export function renderDarkModeSwitch() {
  setTheme(darkModeState === false ? 'light' : 'dark');

  switch (darkModeState) {
    case false:
      darkModePill.classList.remove('right');
      darkModePill.classList.add('left');

      icon.classList.add('bi-sun-fill');
      icon.classList.remove('bi-moon-fill');

      break;

    case true:
      darkModePill.classList.add('right');
      darkModePill.classList.remove('left');

      icon.classList.remove('bi-sun-fill');
      icon.classList.add('bi-moon-fill');

      break;
  }
}
