import employeesData from './data/employee-data.json';
import { initializeEmployeesState } from './state/state.js';
import { renderEmployeeList } from './features/employee-list/employee-list.js';

import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './styles/main.css';
import './styles/variables.css';

// HELPER COMMENT: Started code to show how to initialize the function from state and features

initializeEmployeesState(employeesData);

renderEmployeeList();
