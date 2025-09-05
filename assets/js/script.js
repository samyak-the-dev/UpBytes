// Toggle dark/light theme
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon(isDark);
}
window.toggleTheme = toggleTheme;

// Update theme icon w/ animation
function updateThemeIcon(isDark) {
  const toggleBtn = document.getElementById("theme-toggle-icon");
  if (!toggleBtn) return;

  toggleBtn.classList.add("animate-spin-slow");
  toggleBtn.textContent = isDark ? "light_mode" : "dark_mode";

  setTimeout(() => toggleBtn.classList.remove("animate-spin-slow"), 600);
}

//On load
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("signin-modal");
  const modalContent = document.getElementById("modal-content");
  const cancelBtn = document.getElementById("cancel-modal");
  const closeBtn = document.getElementById("close-modal");
  const signinBtn = document.getElementById("signin-modal-btn");

  // Open modal
  function openModal() {
    modal.classList.remove("hidden");
    setTimeout(() => {
      modalContent.classList.remove("scale-95", "opacity-0");
      modalContent.classList.add("scale-100", "opacity-100");
    }, 10);
  }

  // Close modal
  function closeModal() {
    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");
    setTimeout(() => modal.classList.add("hidden"), 250);
  }

  // Hook buttons
  cancelBtn.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);
  signinBtn.addEventListener("click", () => {
    window.location.href = "signin.html";
  });

  // Click outside modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Hook course links
  const courseLinks = document.querySelectorAll("a[href*='course-']");
  courseLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const isSignedIn = localStorage.getItem("isSignedIn") === "true";
      if (!isSignedIn) {
        e.preventDefault();
        openModal();
      }
    });
  });
});



