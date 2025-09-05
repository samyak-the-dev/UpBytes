// script.js

// Toggle dark/light theme
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon(isDark);
}

window.toggleTheme = toggleTheme;


// Update the icon based on the theme
// Update the icon based on the theme and animate
function updateThemeIcon(isDark) {
  const toggleBtn = document.getElementById('theme-toggle-icon');
  if (!toggleBtn) return;

  toggleBtn.classList.add('animate-spin-slow');
  toggleBtn.textContent = isDark ? 'light_mode' : 'dark_mode';

  setTimeout(() => {
    toggleBtn.classList.remove('animate-spin-slow');
  }, 600);
}



// Apply theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const userPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark' || (savedTheme === null && userPreference);

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  

  updateThemeIcon(isDark);
});