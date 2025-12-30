import { renderPagedEmployeeList } from '../features/employee-list/employee-list';

let state = {
  allEmployees: [],
  filteredEmployees: [],
  currentPage: 1,
  itemsPerPage: 10,
  recentlyViewed: [],
};

/**
 * Get a copy of the entire state
 * @returns {Object} Copy of current state
 */
export function getState() {
  return { ...state };
}

export function getStatusFilteredSize(status) {
  return state.allEmployees.filter((val, _) => val.status === status);
}

/**
 * Get all employees
 * @returns {Array} Copy of all employees
 */
export function getAllEmployees() {
  return [...state.allEmployees];
}

/**
 * Get filtered employees
 * @returns {Array} Copy of filtered employees
 */
export function getFilteredEmployees() {
  return [...state.filteredEmployees];
}

/**
 * Get current page number
 * @returns {number} Current page
 */
export function getCurrentPage() {
  return state.currentPage;
}

/**
 * Get items per page
 * @returns {number} Items per page
 */
export function getItemsPerPage() {
  return state.itemsPerPage;
}

/**
 * Get recently viewed employee IDs
 * @returns {Array} Copy of recently viewed IDs
 */
export function getRecentlyViewed() {
  return [...state.recentlyViewed];
}

/**
 * Get employee by ID
 * @param {string} employeeId - Employee ID
 * @returns {Object|null} Employee object or null if not found
 */
export function getEmployeeById(employeeId) {
  const employee = state.allEmployees.find((emp) => emp.id === employeeId);
  return employee ? { ...employee } : null;
}

/**
 * Initialize all employees (sets both allEmployees and filteredEmployees)
 * @param {Array} employees - Array of employee objects
 */
export function initializeEmployeesState(employees) {
  state = {
    ...state,
    allEmployees: [...employees],
    filteredEmployees: [...employees],
  };
}

export function getEmployeesForCurrentPage() {
  return state.filteredEmployees.slice(
    (state.currentPage - 1) * state.itemsPerPage,
    state.currentPage * state.itemsPerPage
  );
}

/**
 * Update filtered employees list
 * Resets to page 1 when filtering
 * @param {Array} employees - Filtered array of employee objects
 */
export function setFilteredEmployees(employees) {
  state = {
    ...state,
    filteredEmployees: [...employees],
    currentPage: 1,
  };
  renderPagedEmployeeList();
}

/**
 * Set current page number
 * @param {number} page - Page number
 */
export function setCurrentPage(page) {
  state = {
    ...state,
    currentPage: page,
  };
}

/**
 * Add employee ID to recently viewed list
 * @param {string} employeeId - Employee ID to add
 */
export function addToRecentlyViewed(employeeId) {
  // add logic here
}

/**
 * Update an employee's data in state
 * @param {Object} updatedEmployee - Employee object with updated data
 */
export function updateEmployeeInState(updatedEmployee) {
  // add logic here if you reach this point
}

/**
 * Reset state to initial filtered view
 */
export function resetState() {
  state = {
    ...state,
    currentPage: 1,
    filteredEmployees: [...state.allEmployees],
  };
}
