import { updateEmployeeInState } from '../../state/state';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'src/features/employee-edit-modal/employee-edit-modal.css';
document.head.appendChild(link);

const errors = {
  name: (value) =>
    /^[A-Za-z\s-]{2,}$/.test(value)
      ? ''
      : 'Name must have at least 2 letters (including space or - allowed)',

  location: (value) => (value ? '' : 'Location cant be empty'),

  status: (value) => (value ? '' : 'Please select a status'),

  desiredPresent: (value) => (value ? '' : 'Desired present cant be empty'),

  notes: (value) => (value ? '' : 'Notes cant be empty'),
};

export function renderEditEmployeePopUp(employee) {
  const background = document.createElement('div');
  background.classList.add('employee-edit-background');

  const card = document.createElement('article');
  card.classList.add('employee-edit-card');

  const form = createForm(employee);
  form.classList.add('employee-edit-form');

  card.append(form);
  background.append(card);

  card.addEventListener('click', (e) => e.stopPropagation());
  background.addEventListener('click', closeModal);

  document.body.prepend(background);
}

function createForm(employee) {
  const form = document.createElement('form');

  const name = createLabeledInput({
    label: 'Name',
    name: 'name',
    value: employee.name ? employee.name : '',
    placeholder: 'Name',
  });
  name.input.addEventListener('input', () =>
    validateField(name.input, errors.name, name.error)
  );

  const location = createLabeledInput({
    label: 'Location',
    name: 'location',
    value: employee.location ? employee.location : '',
    placeholder: 'Location',
  });
  location.input.addEventListener('input', () =>
    validateField(location.input, errors.location, location.error)
  );

  const status = createLabeledSelect({
    label: 'Status',
    name: 'status',
    value: employee.status ? employee.status : '',
    options: [
      { value: '', text: 'Select status' },
      { value: 'good', text: 'Good' },
      { value: 'naughty', text: 'Naughty' },
    ],
  });

  const statusError = document.createElement('small');
  statusError.classList.add('form-error');
  status.labelElement.append(statusError);

  status.input.addEventListener('change', () =>
    validateField(status.input, errors.status, statusError)
  );

  const desiredPresent = createLabeledInput({
    label: 'Desired Present',
    name: 'desiredPresent',
    value: employee.desiredPresent ? employee.desiredPresent : '',
    placeholder: 'Desired Present',
  });
  desiredPresent.input.addEventListener('input', () =>
    validateField(
      desiredPresent.input,
      errors.desiredPresent,
      desiredPresent.error
    )
  );

  const notes = createLabeledInput({
    label: 'Notes',
    name: 'notes',
    value: employee.notes ? employee.notes : '',
    placeholder: 'Notes',
  });
  notes.input.addEventListener('input', () =>
    validateField(notes.input, errors.notes, notes.error)
  );

  const actions = document.createElement('div');
  actions.classList.add('employee-edit-form-actions');

  const saveBtn = document.createElement('button');
  saveBtn.type = 'submit';
  saveBtn.textContent = 'Save';
  saveBtn.classList.add('success');

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Cancel';

  actions.append(saveBtn, cancelBtn);

  form.append(
    name.labelElement,
    location.labelElement,
    status.labelElement,
    desiredPresent.labelElement,
    notes.labelElement,
    actions
  );

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isValid =
      validateField(name.input, errors.name, name.error) &
      validateField(location.input, errors.location, location.error) &
      validateField(status.input, errors.status, statusError) &
      validateField(
        desiredPresent.input,
        errors.desiredPresent,
        desiredPresent.error
      ) &
      validateField(notes.input, errors.notes, notes.error);

    if (!isValid) {
      return;
    }

    const newEmployeeData = {
      id: employee.id,
      name: name.input.value.trim(),
      location: location.input.value.trim(),
      status: status.input.value.trim(),
      desiredPresent: desiredPresent.input.value.trim(),
      notes: notes.input.value.trim(),
    };

    updateEmployeeInState(newEmployeeData);
    closeModal();
  });

  cancelBtn.addEventListener('click', closeModal);

  return form;
}

function createLabeledInput({
  label,
  name,
  value = '',
  placeholder = '',
  type = 'text',
}) {
  const labelElement = document.createElement('label');
  labelElement.textContent = label;

  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.value = value;
  input.placeholder = placeholder;

  const error = document.createElement('small');
  error.classList.add('form-error');

  labelElement.append(input, error);

  return { labelElement, input, error };
}

function createLabeledSelect({ label, name, value, options }) {
  const labelElement = document.createElement('label');
  labelElement.textContent = label;

  const select = document.createElement('select');
  select.name = name;

  options.forEach((el) => {
    const option = document.createElement('option');
    option.value = el.value;
    option.textContent = el.text;
    if (el.value === value) {
      option.selected = true;
    }
    select.append(option);
  });

  labelElement.append(select);

  return { labelElement, input: select };
}

function validateField(field, validator, errorElement) {
  const value = field.value.trim();
  const errorMessage = validator(value);

  if (errorMessage) {
    field.classList.add('error');
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
    return false;
  }

  field.classList.remove('error');
  errorElement.textContent = '';
  errorElement.style.display = 'none';
  return true;
}

function closeModal() {
  document.querySelector('.employee-edit-background')?.remove();
}
