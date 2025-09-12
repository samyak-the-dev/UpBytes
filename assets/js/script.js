// Theme toggle
function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  const icon = document.getElementById("theme-toggle-icon");

  // Trigger spin animation every toggle
  icon.classList.remove("animate-spin-once");
  void icon.offsetWidth; // force reflow
  icon.classList.add("animate-spin-once");

  if (document.documentElement.classList.contains("dark")) {
    icon.textContent = "light_mode";
    localStorage.setItem("theme", "dark");
  } else {
    icon.textContent = "dark_mode";
    localStorage.setItem("theme", "light");
  }
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

      // Navbar scroll effect
      const navbar = document.getElementById("navbar");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navbar.classList.add("bg-gray-200/80", "dark:bg-gray-900/70", "shadow-md");
        } else {
          navbar.classList.remove("bg-gray-200/80", "dark:bg-gray-900/70", "shadow-md");
        }
      });