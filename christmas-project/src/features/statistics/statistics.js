import { getAllEmployees, getStatusFilteredSize } from '../../state/state.js';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'src/features/statistics/statistics.css';
document.head.appendChild(link);

const totalCountSpan = document.getElementById('total-count');
const positiveCountSpan = document.getElementById('positive-count');
const negativeCountSpan = document.getElementById('negative-count');

export function renderEmployeeStatistics() {
  totalCountSpan.textContent = getAllEmployees().length;
  positiveCountSpan.textContent = getStatusFilteredSize('good').length;
  negativeCountSpan.textContent = getStatusFilteredSize('naughty').length;
}
