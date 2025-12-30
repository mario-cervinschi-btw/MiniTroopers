import { getAllEmployees, setFilteredEmployees } from '../../state/state';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'src/features/filter-form/filter-form.css';
document.head.appendChild(link);

const form = document.getElementById('filter-form');
const statusFilter = document.getElementById('status-filter');
const searchFilter = document.getElementById('search-filter');
const resetBtn = document.getElementById('reset-filters');

export function addFormEventListeners() {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const statusValue = statusFilter.value;
    const searchValue = searchFilter.value.trim().toLowerCase();

    const params = new URLSearchParams();
    if (statusValue) {
      params.set('status', statusValue);
    }

    if (searchValue) {
      params.set('search', searchValue);
    }

    history.pushState(null, '', '?' + params.toString());

    const filteredEmp = getAllEmployees().filter((emp) => {
      if (statusValue && emp.status !== statusValue) {
        return false;
      }

      if (searchValue) {
        const inName = emp.name.toLowerCase().includes(searchValue);
        const inPresent = emp.desiredPresent
          .toLowerCase()
          .includes(searchValue);

        if (!inName && !inPresent) {
          return false;
        }
      }

      return true;
    });

    setFilteredEmployees(filteredEmp);
  });

  resetBtn.addEventListener('click', function () {
    form.reset();

    history.pushState(null, '', '/');

    setFilteredEmployees(getAllEmployees());
  });

  window.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);

    if (params.has('status')) {
      statusFilter.value = params.get('status');
    }

    if (params.has('search')) {
      searchFilter.value = params.get('search');
    }
  });
}
