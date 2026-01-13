import {
  getAllEmployees,
  getEmployeesForCurrentPage,
  getFilteredEmployees,
} from '../../state/state.js';
import { createEmployeeCard } from '../employee-card/employee-card.js';
import { initPagination } from '../pagination/pagination.js';
import { updateRecentlyViewedList } from '../recently-viewed/recently-viewed.js';
import { renderEmployeeStatistics } from '../statistics/statistics.js';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'src/features/employee-list/employee-list.css';
document.head.appendChild(link);

const employeesListElement = document.getElementById('employees-list');
const resultCountElement = document.getElementById('result-count');

export function renderEmployeeList(employees) {
  let allEmployees;

  if (employees) {
    allEmployees = employees;
  } else {
    allEmployees = getAllEmployees();
  }
  employeesListElement.innerHTML = '';

  allEmployees.forEach((employee) => {
    const card = createEmployeeCard(employee, updateRecentlyViewedList);
    employeesListElement.appendChild(card);
  });

  resultCountElement.textContent = 'Results: ' + getFilteredEmployees().length;
}

export function renderPagedEmployeeList() {
  const pageEmployees = getEmployeesForCurrentPage();
  renderEmployeeList(pageEmployees);
  renderEmployeeStatistics();
  initPagination();
}
