const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'src/features/recently-viewed/recently-viewed.css';
document.head.appendChild(link);

const RECENTLY_VIEW_MAX_SIZE = 5;
const recentlyViewedList = document.getElementById('recent-employees');

export function updateRecentlyViewedList(employee) {
  const li = document.createElement('li');

  li.textContent = employee.name;

  recentlyViewedList.prepend(li);

  if (recentlyViewedList.children.length > RECENTLY_VIEW_MAX_SIZE) {
    recentlyViewedList.lastElementChild.remove();
  }
}
