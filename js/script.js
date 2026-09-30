/**
 * BJRS Portfolio — script.js
 * Handles: theme, scroll FX, reveal, nav active, typing, modal,
 *          magnetic buttons, card tilt/shine, back-to-top, content protection.
 */

/* ══════════════════════════════════════════════════════════
   1. THEME — dark / light, persist to localStorage
   ══════════════════════════════════════════════════════════ */
(function initTheme() {
  const stored = localStorage.getItem('bjrs-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('bjrs-theme', theme);
  // Update toggle icons
  const isDark = theme === 'dark';
  const sunSvg = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`;
  const moonSvg = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const sunSvgLg = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`;
  const moonSvgLg = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  document.querySelectorAll('.theme-toggle-thumb').forEach(el => {
    el.innerHTML = isDark ? moonSvg : sunSvg;
  });
  document.querySelectorAll('.mobile-theme-btn').forEach(el => {
    el.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    el.querySelector('.btn-icon').innerHTML = isDark ? moonSvgLg : sunSvgLg;
  });
}

function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

/* ══════════════════════════════════════════════════════════
   2. SCROLL PROGRESS BAR
   ══════════════════════════════════════════════════════════ */
const scrollBar = document.getElementById('scroll-progress');

function updateScrollProgress() {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollBar) scrollBar.style.width = pct + '%';
}

/* ══════════════════════════════════════════════════════════
   3. NAVBAR — scroll state + active section indicator
   ══════════════════════════════════════════════════════════ */
const navbar     = document.getElementById('navbar');
const navLinks   = document.querySelectorAll('.nav-links a');
const navIndicator = document.querySelector('.nav-indicator');
const sections   = document.querySelectorAll('section[id], .section[id]');

function updateNavbar() {
  if (!navbar) return;
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

function updateActiveSection() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= window.innerHeight * 0.45) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    if (href === current) {
      link.classList.add('active');
      // Move the indicator pill
      if (navIndicator && link.parentElement) {
        const linkRect = link.getBoundingClientRect();
        const parentRect = link.parentElement.getBoundingClientRect();
        navIndicator.style.left  = (linkRect.left - parentRect.left) + 'px';
        navIndicator.style.width = linkRect.width + 'px';
      }
    } else {
      link.classList.remove('active');
    }
  });

  // Mobile nav
  const mobileBtns = document.querySelectorAll('.mobile-nav-btn[data-section]');
  const mobileIndicator = document.querySelector('.mobile-nav-indicator');

  mobileBtns.forEach(btn => {
    if (btn.dataset.section === current) {
      btn.classList.add('active');
      if (mobileIndicator) {
        const btnRect    = btn.getBoundingClientRect();
        const parentRect = btn.parentElement.getBoundingClientRect();
        mobileIndicator.style.left  = (btnRect.left - parentRect.left) + 'px';
        mobileIndicator.style.width = btnRect.width + 'px';
      }
    } else {
      btn.classList.remove('active');
    }
  });
}

/* ══════════════════════════════════════════════════════════
   4. BACK-TO-TOP BUTTON
   ══════════════════════════════════════════════════════════ */
const backToTop = document.getElementById('back-to-top');

function updateBackToTop() {
  if (!backToTop) return;
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ══════════════════════════════════════════════════════════
   4b. FOOTER PILL CARD — reveal on scroll to bottom
   ══════════════════════════════════════════════════════════ */
const footerCard = document.querySelector('.footer-card');

function updateFooterReveal() {
  if (!footerCard) return;
  const scrolled    = window.scrollY;
  const docHeight   = document.documentElement.scrollHeight;
  const winHeight   = window.innerHeight;
  // Trigger when within 120px of the very bottom
  const nearBottom  = scrolled + winHeight >= docHeight - 120;
  if (nearBottom) {
    footerCard.classList.add('footer-visible');
  } else {
    footerCard.classList.remove('footer-visible');
  }
}

/* ══════════════════════════════════════════════════════════
   5. SCROLL REVEAL — IntersectionObserver
   ══════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Don't unobserve stagger parents — they may re-enter
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
  revealObserver.observe(el);
});

/* ══════════════════════════════════════════════════════════
   6. PARALLAX — background blobs on scroll
   ══════════════════════════════════════════════════════════ */
const blob1 = document.querySelector('.blob-1');
const blob2 = document.querySelector('.blob-2');
const blob3 = document.querySelector('.blob-3');

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

function updateParallax() {
  // Disable JS parallax on touch devices (tablets and mobile) to fix scrolling lag with heavy blurs, even in landscape
  if (isTouchDevice) return;
  
  const y = window.scrollY;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  
  // Use `translate` instead of `transform` to avoid overriding the CSS keyframe animations
  if (blob1) blob1.style.translate = `0px ${y * 0.08}px`;
  if (blob2) blob2.style.translate = `0px ${-y * 0.06}px`;
  if (blob3) blob3.style.translate = `0px ${y * 0.05}px`;
}

/* ══════════════════════════════════════════════════════════
   7. UNIFIED SCROLL HANDLER (rAF throttled)
   ══════════════════════════════════════════════════════════ */
let rafPending = false;

function onScroll() {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    updateScrollProgress();
    updateNavbar();
    updateActiveSection();
    updateBackToTop();
    updateFooterReveal();
    updateParallax();
    rafPending = false;
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

// Initial call
onScroll();

/* ══════════════════════════════════════════════════════════
   8. TYPING EFFECT (original texts preserved)
   ══════════════════════════════════════════════════════════ */
const typingEl = document.querySelector('.typing-text');
const typingTexts = ['Full Stack Developer', 'UI/UX Designer', 'Freelancer'];
let tCount = 0, tIndex = 0, tCurrentText = '', tLetter = '', tDeleting = false;

function typeEffect() {
  if (tCount >= typingTexts.length) tCount = 0;
  tCurrentText = typingTexts[tCount];

  if (tDeleting) {
    tLetter = tCurrentText.slice(0, --tIndex);
  } else {
    tLetter = tCurrentText.slice(0, ++tIndex);
  }

  if (typingEl) typingEl.textContent = tLetter;

  let speed = 90;
  if (tDeleting) speed /= 2;

  if (!tDeleting && tLetter.length === tCurrentText.length) {
    speed = 2000;
    tDeleting = true;
  } else if (tDeleting && tLetter.length === 0) {
    tDeleting = false;
    tCount++;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

/* ══════════════════════════════════════════════════════════
   9. CONTACT MODAL
   ══════════════════════════════════════════════════════════ */
const modalOverlay = document.getElementById('contactModal');

function openModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Focus the first input for accessibility
  setTimeout(() => {
    const firstInput = modalOverlay.querySelector('input, textarea');
    if (firstInput) firstInput.focus();
  }, 100);
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// All elements that should open the modal
document.querySelectorAll('[data-open-modal]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); openModal(); });
});

// Close button(s)
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', closeModal);
});

// Click overlay to close
if (modalOverlay) {
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });
}

// Escape key to close
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalOverlay?.classList.contains('open')) {
    closeModal();
  }
});

/* ══════════════════════════════════════════════════════════
   10. CARD — GLASS SHINE ON MOUSE MOVE (desktop only)
   ══════════════════════════════════════════════════════════ */
function initCardShine() {
  document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
}

/* ══════════════════════════════════════════════════════════
   11. CARD — SUBTLE 3D TILT (desktop only)
   ══════════════════════════════════════════════════════════ */
function initCardTilt() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);  // -1 to 1
      const dy     = (e.clientY - cy) / (rect.height / 2);  // -1 to 1
      const maxTilt = 5; // degrees
      card.style.transform = `
        translateY(-6px)
        rotateX(${-dy * maxTilt}deg)
        rotateY(${dx * maxTilt}deg)
      `;
      card.style.transition = 'transform 0.1s linear, box-shadow 0.35s';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.35s cubic-bezier(0.32,0.72,0,1), box-shadow 0.35s';
    });
  });
}

/* ══════════════════════════════════════════════════════════
   12. MAGNETIC BUTTONS (desktop only)
   ══════════════════════════════════════════════════════════ */
function initMagneticButtons() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  if (window.innerWidth < 768) return;

  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect  = btn.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const dx    = (e.clientX - cx) * 0.25;
      const dy    = (e.clientY - cy) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-3px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ══════════════════════════════════════════════════════════
   13. MOBILE — tap/press states (no hover)
   ══════════════════════════════════════════════════════════ */
function initTapStates() {
  if (window.innerWidth >= 768) return;
  document.querySelectorAll('.bento-card, .btn-primary, .btn-secondary').forEach(el => {
    el.addEventListener('touchstart', () => el.classList.add('pressed'), { passive: true });
    el.addEventListener('touchend',   () => setTimeout(() => el.classList.remove('pressed'), 150), { passive: true });
  });
}

/* ══════════════════════════════════════════════════════════
   14. SMOOTH ANCHOR NAVIGATION
   ══════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id  = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close modal if open
    closeModal();
  });
});

/* ══════════════════════════════════════════════════════════
   15. MOBILE NAV — tap scroll
   ══════════════════════════════════════════════════════════ */
document.querySelectorAll('.mobile-nav-btn[data-section]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.section);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ══════════════════════════════════════════════════════════
   16. CONTENT PROTECTION
   ══════════════════════════════════════════════════════════ */
// Block right-click context menu
document.addEventListener('contextmenu', e => e.preventDefault());

// Block Ctrl/Cmd+S (save page)
document.addEventListener('keydown', e => {
  const key = e.key.toLowerCase();
  if ((e.ctrlKey || e.metaKey) && key === 's') {
    e.preventDefault();
  }
  // DO NOT block any other keys — typing, scrolling, a11y etc. remain intact
});

/* ══════════════════════════════════════════════════════════
   17. THEME TOGGLE BINDINGS
   ══════════════════════════════════════════════════════════ */
document.querySelectorAll('.theme-toggle, .mobile-theme-btn').forEach(btn => {
  btn.addEventListener('click', toggleTheme);
});

/* ══════════════════════════════════════════════════════════
   18. INIT — run all desktop-only features only on desktop
   ══════════════════════════════════════════════════════════ */
function init() {
  // Sync initial theme icon
  const isDark = getTheme() === 'dark';
  const sunSvg = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`;
  const moonSvg = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const sunSvgLg = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>`;
  const moonSvgLg = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  document.querySelectorAll('.theme-toggle-thumb').forEach(el => {
    el.innerHTML = isDark ? moonSvg : sunSvg;
  });
  document.querySelectorAll('.mobile-theme-btn .btn-icon').forEach(el => {
    el.innerHTML = isDark ? moonSvgLg : sunSvgLg;
  });

  if (window.innerWidth >= 768) {
    initCardShine();
    initCardTilt();
    initMagneticButtons();
  } else {
    initTapStates();
  }
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ══════════════════════════════════════════════════════════
// PWA Service Worker Registration
// ══════════════════════════════════════════════════════════
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('SW registered!', reg))
      .catch(err => console.error('SW registration failed!', err));
  });
}
