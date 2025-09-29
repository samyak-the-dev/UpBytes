// Enhanced UpBytes JavaScript - Professional & Accessible

// Theme Management
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById("theme-toggle-icon");
  const isDark = html.classList.contains("dark");

  html.classList.toggle("dark");

  icon.style.transform = "rotate(180deg)";

  setTimeout(() => {
    icon.textContent = isDark ? "dark_mode" : "light_mode";
    icon.style.transform = "rotate(0deg)";
  }, 150);

  localStorage.setItem("theme", isDark ? "light" : "dark");

  const announcement = isDark ? "Light mode activated" : "Dark mode activated";
  announceToScreenReader(announcement);
}

// Screen reader announcements
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
}

// Modal Manager
class ModalManager {
  constructor() {
    this.modal = document.getElementById("signin-modal");
    this.modalContent = document.getElementById("modal-content");
    this.cancelBtn = document.getElementById("cancel-modal");
    this.closeBtn = document.getElementById("close-modal");
    this.signinBtn = document.getElementById("signin-modal-btn");
    this.focusableElements = [];
    this.previousActiveElement = null;

    this.init();
  }

  init() {
    if (!this.modal) return;

    this.cancelBtn?.addEventListener("click", () => this.close());
    this.closeBtn?.addEventListener("click", () => this.close());
    this.signinBtn?.addEventListener("click", () => window.location.href = "signin.html");

    this.modal.addEventListener("click", e => { if (e.target === this.modal) this.close(); });
    this.modal.addEventListener("keydown", e => this.handleKeyDown(e));

    this.hookCourseLinks();
  }

  open() {
    if (!this.modal) return;

    this.previousActiveElement = document.activeElement;
    this.modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      this.modalContent.classList.remove("scale-95", "opacity-0");
      this.modalContent.classList.add("scale-100", "opacity-100");
    });

    // Recalculate focusable elements after animation
    setTimeout(() => {
      this.setFocusableElements();
      this.focusableElements[0]?.focus();
    }, 150);

    announceToScreenReader("Sign in dialog opened");
  }

  close() {
    if (!this.modal) return;

    this.modalContent.classList.remove("scale-100", "opacity-100");
    this.modalContent.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
      this.modal.classList.add("hidden");
      document.body.style.overflow = "";
      this.previousActiveElement?.focus();
      announceToScreenReader("Sign in dialog closed");
    }, 300);
  }

  setFocusableElements() {
    const selectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ];
    this.focusableElements = Array.from(this.modalContent.querySelectorAll(selectors.join(', ')));
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') return this.close();
    if (e.key === 'Tab') this.trapFocus(e);
  }

  trapFocus(e) {
    if (!this.focusableElements.length) return;
    const first = this.focusableElements[0];
    const last = this.focusableElements[this.focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  hookCourseLinks() {
    const courseLinks = document.querySelectorAll("a[href*='course-']");
    courseLinks.forEach(link => {
      link.addEventListener("click", e => {
        if (localStorage.getItem("isSignedIn") !== "true") {
          e.preventDefault();
          this.open();
        }
      });
    });
  }
}

// Navbar Manager
class NavbarManager {
  constructor() {
    this.navbar = document.getElementById("navbar");
    this.lastScrollY = window.scrollY;
    this.init();
  }

  init() {
    if (!this.navbar) return;

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => { this.handleScroll(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
  }

  handleScroll() {
    const scrollY = window.scrollY;
    const down = scrollY > this.lastScrollY;

    if (scrollY > 100) this.navbar.classList.add("scrolled");
    else this.navbar.classList.remove("scrolled");

    // Smooth transform for fixed Tailwind navbar
    this.navbar.style.transition = "transform 0.3s ease";
    if (scrollY > 200 && down) this.navbar.style.transform = "translateX(-50%) translateY(-100%)";
    else this.navbar.style.transform = "translateX(-50%) translateY(0)";

    this.lastScrollY = scrollY;
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() { this.init(); }
  init() {
    if ('web-vital' in window) this.trackWebVitals();
    this.trackResourceTiming();
    this.trackInteractions();
  }
  trackWebVitals() { console.log('Web Vitals tracking initialized'); }
  trackResourceTiming() {
    window.addEventListener('load', () => {
      const nav = performance.getEntriesByType('navigation')[0];
      if (nav) {
        const loadTime = nav.loadEventEnd - nav.loadEventStart;
        if (loadTime > 3000) console.warn(`Slow page load: ${loadTime}ms`);
      }
    });
  }
  trackInteractions() {
    document.addEventListener('click', e => {
      if (e.target.matches('button, .course-card, a[href*="course-"]')) {
        console.log('User interaction:', {
          element: e.target.tagName.toLowerCase(),
          text: e.target.textContent?.trim().substring(0, 50),
          href: e.target.href,
          timestamp: Date.now()
        });
      }
    }, { passive: true });
  }
}

// Accessibility Manager
class AccessibilityManager {
  constructor() { this.init(); }
  init() { this.enhanceKeyboardNavigation(); this.improveScreenReaderSupport(); this.handleReducedMotion(); }

  enhanceKeyboardNavigation() {
    document.addEventListener('keydown', e => { if (e.key === 'Tab') document.body.classList.add('using-keyboard'); });
    document.addEventListener('mousedown', () => document.body.classList.remove('using-keyboard'));

    const skipLink = document.querySelector('a[href="#main-content"]');
    skipLink?.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById('main-content');
      if (target) { target.focus(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  }

  improveScreenReaderSupport() {
    document.querySelectorAll(
      'button:not([aria-label]):not([aria-labelledby]), a:not([aria-label]):not([aria-labelledby])'
    ).forEach(el => {
      const text = el.textContent?.trim() || el.title || el.alt;
      if (text) el.setAttribute('aria-label', text);
    });
  }

  handleReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--animation-delay', '0.01ms');
    }
  }
}

// Image Lazy Loading
class ImageLoader {
  constructor() { this.init(); }
  init() {
    const images = document.querySelectorAll('img[data-src]');
    if ('loading' in HTMLImageElement.prototype) {
      images.forEach(img => { img.src = img.dataset.src; img.removeAttribute('data-src'); });
    } else { this.lazyLoadImages(images); }
  }
  lazyLoadImages(images) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    });
    images.forEach(img => observer.observe(img));
  }
}

// Initialize all managers on DOM load
document.addEventListener("DOMContentLoaded", () => {
  new ModalManager();
  new NavbarManager();
  new PerformanceMonitor();
  new AccessibilityManager();
  new ImageLoader();

  // Theme initialization
  const storedTheme = localStorage.getItem("theme");
  const icon = document.getElementById("theme-toggle-icon");
  if (storedTheme === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");

  if (icon) icon.textContent = storedTheme === "dark" ? "light_mode" : "dark_mode";

  announceToScreenReader("UpBytes learning platform loaded successfully");
});

// Service Worker
if ('serviceWorker' in navigator && 'caches' in window) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/UpBytes/sw.js');
      console.log('ServiceWorker registered successfully');
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              announceToScreenReader("New version available. Refresh to update.");
            }
          });
        }
      });
    } catch (err) { console.log('ServiceWorker registration failed:', err); }
  });
}

// Global Error Handling
window.addEventListener('error', e => console.error('Application error:', e.error));
window.addEventListener('unhandledrejection', e => console.error('Unhandled promise rejection:', e.reason));

// Export for external use
window.UpBytes = { toggleTheme, announceToScreenReader };
