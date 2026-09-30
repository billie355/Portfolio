# Billy Joe Roxas Sablayan - Portfolio

A minimalist and functional personal portfolio website showcasing my work as a Front End Developer and UI/UX Designer. Built with a focus on clean design, responsiveness, and user experience.

## 🚀 Features

- **Minimalist Design**: Clean layout with a focus on typography and whitespace.
- **Responsive Layout**: Fully adaptable to different screen sizes (mobile, tablet, desktop).
- **Interactive Elements**:
  - Typing text effect for role introduction.
  - Scroll reveal animations for sections.
  - Animated hero image (morphing blob effect).
  - Custom cursor blink animation.
- **Contact Modal**: Integrated popup form for direct messaging using FormSubmit (no backend required).

## 🛠️ Technologies Used

- **HTML5**: Semantic structure.
- **CSS3**: Custom styling, CSS variables, Flexbox, Grid, and Keyframe animations.
- **JavaScript**: DOM manipulation for scroll effects, typing animation, and modal logic.
- **Google Fonts**: 'Inter' typeface for a modern look.

## 📂 Projects Showcased

1.  **STI College Grade Calculator**
    - A tool to calculate weighted averages dynamically.
2.  **Coding For Kids**
    - Educational resources written for kids and beginners.
3.  **Reaction Time Test**
    - A game/tool with stats, history, and theme toggles.

## 🔧 How to Run

1.  Clone the repository or download the files.
2.  Open `index.html` in any modern web browser.
3.  No installation or server setup required.

## 📬 Contact

- **Email**: roxassablayanbillyjoe@gmail.com

---
*© 2025 Billy Joe Roxas Sablayan*

---

## ✨ Redesign (v2) — What's New

The entire UI was rebuilt from scratch while keeping all original text, links and contact info exactly as written.

### Design System
- **Neumorphism** base layer: soft extruded/inset shadows on buttons, chips, form fields, toggles and the photo frame — all using dual light/dark box-shadows and large border radii (20–48 px).
- **Liquid Glass / Glassmorphism** floating layers: the navbar, project cards, about card, contact section and modal all use `backdrop-filter: blur(28px) saturate(160%)`, semi-transparent fill, a 1 px translucent border and an inner highlight — just like iOS Liquid Glass. A `@supports` fallback ensures a solid surface on unsupported browsers.
- **Animated gradient blobs** drift slowly behind every section so the glass blur is always visible.
- **Light & Dark theme** — follows `prefers-color-scheme` on first visit; persisted in `localStorage`; toggled via a neumorphic pill switch in the navbar or the mobile tab bar.
- **CSS design tokens** (`--clr-*`, `--nm-*`, `--glass-*`, `--r-*`, `--sp-*`, `--ease-*`) defined in `:root` and overridden for `[data-theme="dark"]`.
- **Font pairing**: Plus Jakarta Sans (headings) + Inter (body) via Google Fonts.

### Layout
| Breakpoint | Layout |
|---|---|
| **Desktop ≥ 1024 px** | Floating pill glass navbar, hero 2-col grid, bento grid for projects, 2-col about |
| **Tablet 768–1023 px** | 2-col bento grid, single-col about |
| **Mobile < 768 px** | iOS-style glass bottom tab bar, single-column stacked cards, safe-area insets |

### Animations (iOS feel)
- Easing: `cubic-bezier(0.32, 0.72, 0, 1)` throughout; spring bounce on press/release.
- **Intro screen** fades out at 1 s.
- **Scroll reveal** via `IntersectionObserver`: fade + slide-up + blur-to-sharp, staggered children.
- **Parallax** on background blobs.
- **Thin scroll-progress bar** at the top.
- **Navbar** glass intensity increases on scroll.
- **3D card tilt** + cursor-following glass shine on desktop hover.
- **Magnetic buttons** drift toward the cursor on desktop.
- All animations disabled if `prefers-reduced-motion` is set.

### Professional Upgrades
- Back-to-top button (neumorphic, spring-animated).
- Contact section with email button.
- Footer from existing contact info.
- SEO: `<title>`, `<meta description>`, Open Graph, Twitter Card, `theme-color`, favicon from `pfp.png`.
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- `aria-label` on all icon buttons, `aria-live` on typing text, `role="dialog"` on modal.
- Visible `:focus-visible` states for keyboard navigation.

### Content Protection
- Right-click context menu blocked (`contextmenu` → `preventDefault`).
- `pfp.png` protected: `draggable="false"`, `-webkit-user-drag: none`, `user-select: none`, `-webkit-touch-callout: none`.
- Ctrl/Cmd+S blocked (no other keyboard shortcuts affected).

### Files
| File | Purpose |
|---|---|
| `index.html` | Entry point — all markup, SEO, semantic structure |
| `style.css` | All styles: design tokens, neumorphism, glass, animations, responsive |
| `script.js` | All JS: theme, typing, scroll, reveal, tilt, shine, magnetic, modal, protection |
| `pfp.png` | Profile photo (unchanged) |
| `README.md` | This file |

### Placeholders to Fill In
Search for `<!-- TODO:` in `index.html` to find two placeholder comment blocks:
1. **GitHub / social links** in the Contact section — add your profile URLs there.
2. **GitHub / social links** in the Footer — same.

These sections are hidden inside HTML comments until you fill them in.
