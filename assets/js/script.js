// Theme Management
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById("theme-toggle-icon");
  const isDark = html.classList.contains("dark");
  
  // Toggle theme
  html.classList.toggle("dark");
  
  // Update icon with smooth animation
  icon.style.transform = "rotate(180deg)";
  
  setTimeout(() => {
    icon.textContent = isDark ? "dark_mode" : "light_mode";
    icon.style.transform = "rotate(0deg)";
  }, 150);
  
  // Store preference
  localStorage.setItem("theme", isDark ? "light" : "dark");
  
  // Announce theme change for screen readers
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

// Enhanced Modal Management
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
    
    // Event listeners
    this.cancelBtn?.addEventListener("click", () => this.close());
    this.closeBtn?.addEventListener("click", () => this.close());
    this.signinBtn?.addEventListener("click", () => {
      window.location.href = "signin.html";
    });
    
    // Close on backdrop click
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.close();
    });
    
    // Keyboard navigation
    this.modal.addEventListener("keydown", (e) => this.handleKeyDown(e));
    
    // Hook course links
    this.hookCourseLinks();
  }
  
  open() {
    if (!this.modal) return;
    
    // Store current focus
    this.previousActiveElement = document.activeElement;
    
    // Show modal
    this.modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    
    // Animate in
    requestAnimationFrame(() => {
      this.modalContent.classList.remove("scale-95", "opacity-0");
      this.modalContent.classList.add("scale-100", "opacity-100");
    });
    
    // Focus management
    this.setFocusableElements();
    this.focusableElements[0]?.focus();
    
    // Announce to screen readers
    announceToScreenReader("Sign in dialog opened");
  }
  
  close() {
    if (!this.modal) return;
    
    // Animate out
    this.modalContent.classList.remove("scale-100", "opacity-100");
    this.modalContent.classList.add("scale-95", "opacity-0");
    
    // Hide after animation
    setTimeout(() => {
      this.modal.classList.add("hidden");
      document.body.style.overflow = "";
      
      // Restore focus
      this.previousActiveElement?.focus();
      
      // Announce to screen readers
      announceToScreenReader("Sign in dialog closed");
    }, 300);
  }
  
  setFocusableElements() {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    this.focusableElements = Array.from(
      this.modalContent.querySelectorAll(focusableSelectors.join(', '))
    );
  }
  
  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.close();
      return;
    }
    
    if (e.key === 'Tab') {
      this.trapFocus(e);
    }
  }
  
  trapFocus(e) {
    if (this.focusableElements.length === 0) return;
    
    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
  
  hookCourseLinks() {
    const courseLinks = document.querySelectorAll("a[href*='course-']");
    courseLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const isSignedIn = localStorage.getItem("isSignedIn") === "true";
        if (!isSignedIn) {
          e.preventDefault();
          this.open();
        }
      });
    });
  }
}

// Enhanced Navbar Scroll Effects
class NavbarManager {
  constructor() {
    this.navbar = document.getElementById("navbar");
    this.lastScrollY = window.scrollY;
    this.init();
  }
  
  init() {
    if (!this.navbar) return;
    
    // Throttled scroll handler for better performance
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
  
  handleScroll() {
    const scrollY = window.scrollY;
    const scrollingDown = scrollY > this.lastScrollY;
    
    if (scrollY > 100) {
      this.navbar.classList.add("scrolled");
      
      // Hide navbar when scrolling down, show when scrolling up
      if (scrollingDown && scrollY > 200) {
        this.navbar.style.transform = "translateX(-50%) translateY(-100%)";
      } else {
        this.navbar.style.transform = "translateX(-50%) translateY(0)";
      }
    } else {
      this.navbar.classList.remove("scrolled");
      this.navbar.style.transform = "translateX(-50%) translateY(0)";
    }
    
    this.lastScrollY = scrollY;
  }
}

// Performance Monitoring
class PerformanceMonitor {
  constructor() {
    this.init();
  }
  
  init() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      this.trackWebVitals();
    }
    
    // Monitor resource loading
    this.trackResourceTiming();
    
    // Monitor user interactions
    this.trackInteractions();
  }
  
  trackWebVitals() {
    // Implementation would depend on web-vitals library
    // This is a placeholder for actual implementation
    console.log('Web Vitals tracking initialized');
  }
  
  trackResourceTiming() {
    window.addEventListener('load', () => {
      const navTiming = performance.getEntriesByType('navigation')[0];
      const loadTime = navTiming.loadEventEnd - navTiming.loadEventStart;
      
      if (loadTime > 3000) {
        console.warn(`Slow page load detected: ${loadTime}ms`);
      }
    });
  }
  
  trackInteractions() {
    // Track button clicks for analytics
    document.addEventListener('click', (e) => {
      if (e.target.matches('button, .course-card, a[href*="course-"]')) {
        const element = e.target;
        const trackingData = {
          element: element.tagName.toLowerCase(),
          text: element.textContent?.trim().substring(0, 50),
          href: element.href,
          timestamp: Date.now()
        };
        
        // Send to analytics service (placeholder)
        console.log('User interaction:', trackingData);
      }
    }, { passive: true });
  }
}

// Accessibility Enhancements
class AccessibilityManager {
  constructor() {
    this.init();
  }
  
  init() {
    this.enhanceKeyboardNavigation();
    this.improveScreenReaderSupport();
    this.handleReducedMotion();
  }
  
  enhanceKeyboardNavigation() {
    // Enhanced focus management
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('using-keyboard');
    });
    
    // Skip link functionality
    const skipLink = document.querySelector('a[href="#main-content"]');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('main-content');
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
  
  improveScreenReaderSupport() {
    // Add ARIA labels to interactive elements without explicit labels
    const interactiveElements = document.querySelectorAll(
      'button:not([aria-label]):not([aria-labelledby]), a:not([aria-label]):not([aria-labelledby])'
    );
    
    interactiveElements.forEach(element => {
      const text = element.textContent?.trim() || element.title || element.alt;
      if (text && !element.getAttribute('aria-label')) {
        element.setAttribute('aria-label', text);
      }
    });
  }
  
  handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--animation-delay', '0.01ms');
    }
  }
}

// Image Lazy Loading Enhancement
class ImageLoader {
  constructor() {
    this.init();
  }
  
  init() {
    // Use native lazy loading where supported, fallback to Intersection Observer
    const images = document.querySelectorAll('img[data-src]');
    
    if ('loading' in HTMLImageElement.prototype) {
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    } else {
      this.lazyLoadImages(images);
    }
  }
  
  lazyLoadImages(images) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all managers
  new ModalManager();
  new NavbarManager();
  new PerformanceMonitor();
  new AccessibilityManager();
  new ImageLoader();
  
  // Initialize theme based on stored preference
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const icon = document.getElementById("theme-toggle-icon");
  
  if (icon) {
    if (document.documentElement.classList.contains("dark")) {
      icon.textContent = "light_mode";
    } else {
      icon.textContent = "dark_mode";
    }
  }
  
  // Announce page load for screen readers
  announceToScreenReader("UpBytes learning platform loaded successfully");
});

// Service Worker Registration (for offline support)
if ('serviceWorker' in navigator && 'caches' in window) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registered successfully');
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available, show update notification
              announceToScreenReader("New version available. Refresh to update.");
            }
          });
        }
      });
    } catch (error) {
      console.log('ServiceWorker registration failed:', error);
    }
  });
}

// Error handling for production
window.addEventListener('error', (e) => {
  console.error('Application error:', e.error);
  // Send error to monitoring service in production
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // Send error to monitoring service in production
});

// Export functions for external use
window.UpBytes = {
  toggleTheme,
  announceToScreenReader
};