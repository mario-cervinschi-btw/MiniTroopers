import {
  getCurrentPage,
  setCurrentPage,
  getItemsPerPage,
  getFilteredEmployees,
} from '../../state/state';
import { renderPagedEmployeeList } from '../employee-list/employee-list';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'src/features/pagination/pagination.css';
document.head.appendChild(link);

const topPrev = document.getElementById('prev-page-top');
const topNext = document.getElementById('next-page-top');
const topText = document.getElementById('page-info-top');
const bottomPrev = document.getElementById('prev-page-bottom');
const bottomNext = document.getElementById('next-page-bottom');
const bottomText = document.getElementById('page-info-bottom');

export function initPagination() {
  topNext.addEventListener('click', nextHandler);
  bottomNext.addEventListener('click', nextHandler);
  topPrev.addEventListener('click', prevHandler);
  bottomPrev.addEventListener('click', prevHandler);

  updatePaginationUI();
}

function prevHandler() {
  const currentPage = getCurrentPage();

  if (currentPage <= 1) {
    return;
  }

  setCurrentPage(currentPage - 1);
  renderPagedEmployeeList();
  updatePaginationUI();
}

function nextHandler() {
  const currentPage = getCurrentPage();
  const maxPages = getMaxPages();

  if (currentPage >= maxPages) {
    return;
  }

  setCurrentPage(currentPage + 1);
  renderPagedEmployeeList();
  updatePaginationUI();
}

function updatePaginationUI() {
  const currentPage = getCurrentPage();
  const maxPages = getMaxPages();

  topPrev.classList.toggle('disabled', currentPage === 1);
  topPrev.classList.toggle('success', currentPage !== 1);
  bottomPrev.classList.toggle('disabled', currentPage === 1);
  bottomPrev.classList.toggle('success', currentPage !== 1);

  topNext.classList.toggle('disabled', currentPage === maxPages);
  topNext.classList.toggle('success', currentPage !== maxPages);
  bottomNext.classList.toggle('disabled', currentPage === maxPages);
  bottomNext.classList.toggle('success', currentPage !== maxPages);

  setPageText(maxPages);
}

function getMaxPages() {
  const employeesPerPage = getItemsPerPage();
  const totalEmployees = getFilteredEmployees().length;

  return Number.parseInt(totalEmployees / employeesPerPage) + 1;
}

function setPageText() {
  const employeesPerPage = getItemsPerPage();
  const totalEmployees = getFilteredEmployees().length;
  const maxPages = Number.parseInt(totalEmployees / employeesPerPage) + 1;

  const str = `Page ${getCurrentPage()} of ${maxPages}`;

  topText.innerText = str;
  bottomText.innerText = str;
}
