export function initButtons() {
  const section = document.createElement('section');
  section.classList.add('buttons');

  const firstButton = document.createElement('button');
  firstButton.type = 'button';
  firstButton.textContent = '|<';

  const prevButton = document.createElement('button');
  prevButton.type = 'button';
  prevButton.textContent = '< PREV';

  const randomButton = document.createElement('button');
  randomButton.type = 'button';
  randomButton.textContent = 'RANDOM';

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.textContent = 'NEXT >';

  const lastButton = document.createElement('button');
  lastButton.type = 'button';
  lastButton.textContent = '>|';

  section.append(firstButton, prevButton, randomButton, nextButton, lastButton);

  return section;
}
