import { EmployeeService } from '../../api/employee-service';
import { deleteEmployee } from '../../state/state';
import { renderEditEmployeePopUp } from '../employee-edit-modal/employee-edit-modal';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'src/features/employee-card/employee-card.css';
document.head.appendChild(link);

export function createEmployeeCard(employee, clickHandler) {
  const card = document.createElement('article');
  const headerBtn = document.createElement('button');
  headerBtn.className = 'employee-header';

  const nameSpan = document.createElement('span');
  nameSpan.className = 'employee-name';
  nameSpan.textContent = employee.name;

  const headerRight = document.createElement('div');
  headerRight.className = 'header-right';

  const statusSpan = document.createElement('span');
  if (employee.status === 'naughty') {
    statusSpan.classList.add('status-badge', 'bad');
  } else {
    statusSpan.classList.add('status-badge', 'good');
  }
  statusSpan.textContent = employee.status;

  const icon = document.createElement('i');
  icon.className = 'bi bi-chevron-down accordion-icon';

  headerRight.append(statusSpan, icon);
  headerBtn.append(nameSpan, headerRight);

  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'employee-details';
  detailsDiv.id = `details-${employee.id}`;

  const img = document.createElement('img');

  detailsDiv.appendChild(img);
  img.classList.add('imgResize');

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

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('employee-buttons');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('success');

  deleteBtn.addEventListener('click', () => {
    deleteEmployee(employee.id);
  });

  buttonsDiv.appendChild(deleteBtn);

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';

  editBtn.addEventListener('click', () => {
    renderEditEmployeePopUp(employee);
  });

  buttonsDiv.appendChild(editBtn);

  detailsDiv.append(buttonsDiv);

  card.append(headerBtn, detailsDiv);

  const header = card.querySelector('.employee-header');
  const details = card.querySelector('.employee-details');

  header.addEventListener('click', async () => {
    toggleAccordion(header, details, icon);
    if (header.classList.contains('drawer-open')) {
      const imageUrl = await EmployeeService.getEmployeeImage(employee.name);
      if (imageUrl) {
        img.src = imageUrl;
      }
      if (clickHandler) {
        clickHandler(employee);
      }
    }
  });

  return card;
}

function toggleAccordion(header, details, icon) {
  details.classList.toggle('show');
  header.classList.toggle('drawer-open');
  icon.classList.toggle('bi-chevron-down');
  icon.classList.toggle('bi-chevron-up');
}
