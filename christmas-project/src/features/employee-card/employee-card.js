export function createEmployeeCard(employee, clickHandler) {
  const card = document.createElement('article');
  /*
   *  HELPER COMMENT: Here we have an example of creating the card element.
   * This was done with innerHTML for simplicity.
   * but in real life this is not always recommended due to security risks.
   * Try creating the same structure using only DOM methods.
   * You can organize the html differently if you see fit. You might need to add changes nevertheless ;)
   */
  const headerBtn = document.createElement('button');
  headerBtn.className = 'employee-header';

  const nameSpan = document.createElement('span');
  nameSpan.className = 'employee-name';
  nameSpan.textContent = employee.name;

  const headerRight = document.createElement('div');
  headerRight.className = 'header-right';

  const statusSpan = document.createElement('span');
  statusSpan.className = 'status-badge';
  statusSpan.textContent = employee.status;

  const icon = document.createElement('i');
  icon.className = 'bi bi-chevron-down accordion-icon';

  headerRight.append(statusSpan, icon);
  headerBtn.append(nameSpan, headerRight);

  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'employee-details';
  detailsDiv.id = `details-${employee.id}`;

  const dl = document.createElement('dl');

  function addDefinition(term, value, isStrong = false) {
    const dt = document.createElement('dt');
    dt.textContent = term;

    const dd = document.createElement('dd');

    if (isStrong) {
      const strong = document.createElement('strong');
      strong.textContent = value;
      dd.appendChild(strong);
    } else {
      dd.textContent = value;
    }

    dl.append(dt, dd);
  }

  addDefinition('Location:', employee.location);
  addDefinition('Desired Present:', employee.desiredPresent, true);
  addDefinition('Notes:', employee.notes);

  detailsDiv.appendChild(dl);

  card.append(headerBtn, detailsDiv);

  const header = card.querySelector('.employee-header');
  const details = card.querySelector('.employee-details');

  header.addEventListener('click', () => {
    toggleAccordion(header, details);
    if (clickHandler) {
      clickHandler(employee);
    }
  });

  return card;
}

function toggleAccordion(header, details) {
  details.classList.toggle('show');
  header.classList.toggle('drawer-open');
  // logic for toggling accordion, expanding/collapsing details
  // toggle CSS classes using DOM methods, they should contain the logic for showing/hiding the details
}
