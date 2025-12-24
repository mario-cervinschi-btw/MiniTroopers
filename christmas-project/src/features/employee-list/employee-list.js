import {
  getAllEmployees
} from '../../state/state.js';
import { createEmployeeCard } from '../employee-card/employee-card.js';
import { updateRecentlyViewedList } from '../recently-viewed/recently-viewed.js';

const employeesListElement = document.getElementById('employees-list');
const resultCountElement = document.getElementById('result-count');


export function renderEmployeeList() {
  // Basic rendering of ALL employees (no filters)
  const allEmployees = getAllEmployees();

  allEmployees.forEach((employee) => {
    const card = createEmployeeCard(employee, updateRecentlyViewedList);
    employeesListElement.appendChild(card);
  });

  resultCountElement.textContent = allEmployees.length;
}
