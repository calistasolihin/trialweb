<div align="center">

<img src="asset/image/favicon.png" alt="Calista Solihin Logo" width="80" height="80" />

# ✦ Calista Solihin — Creative Portfolio

**A personal portfolio website with a Soft Claymorphism aesthetic.**  
Pastel mint tones · Interactive animations · Pixel-perfect responsive layout

<br/>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![FontAwesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white)
![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=google&logoColor=white)

![Status](https://img.shields.io/badge/Status-Active-4CAF50?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-C9DED9?style=flat-square)
![Made with Love](https://img.shields.io/badge/Made%20with-🍵%20%26%20Claymorphism-E2ECE9?style=flat-square)

<br/>

[🌐 Live Demo](#) · [📩 Contact Me](mailto:calistasolihin@example.com) · [💼 Behance](https://behance.net)

</div>

---

## 📸 Preview

> *Soft, tactile, and alive — every element is designed to feel like you can reach out and touch it.*

| Section | Description |
|---|---|
| 🏠 **Hero** | 9-directional eye-tracking character illustration |
| 👤 **About** | Draggable lanyard ID badge with spring physics |
| 📁 **Projects** | Horizontal clay card slider with modal previews |
| 📩 **Contact** | Interactive clay envelope with hover animation |

---

## ✨ Features

<details>
<summary><b>🏠 Hero — Eye Tracking Character</b></summary>
<br/>

The hero section features a custom illustrated character whose **eyes follow your cursor** in 9 distinct directions (top-left, top, top-right, left, center, right, bottom-left, bottom, bottom-right).

- Image swaps based on cursor zone relative to the viewport
- Smooth transition between eye states
- Mobile-friendly fallback to center gaze

</details>

<details>
<summary><b>👤 About — Typing Animation & Draggable Lanyard</b></summary>
<br/>

- **Typing animation** writes *"Hi, I'm Calista Solihin"* letter-by-letter using a recursive `setTimeout` approach — runs exactly once per page session
- **Draggable ID Badge** with realistic spring physics:
  - Mouse-hover sway effect
  - Click & drag with velocity tracking
  - Smooth spring return to origin on release

</details>

<details>
<summary><b>📁 Projects — Horizontal Slider & Modal</b></summary>
<br/>

- 5 clay-styled project cards in a **horizontal scroll track**
- Prev/Next arrow buttons navigate the slider
- Clicking a card opens a **full-screen modal** with:
  - Backdrop blur overlay
  - Project number, title, category & description
  - CTA button → *"Discuss This Project"*
  - Close via ✕ button **or** `Escape` key

</details>

<details>
<summary><b>📩 Contact — Interactive Clay Envelope</b></summary>
<br/>

- Pure CSS **3-layer envelope** (back, letter, pocket)
- On hover, the letter **rises from the envelope** revealing the message
- Direct email CTA button inside the letter

</details>

<details>
<summary><b>🧭 Global — Sidebar Navigation & ScrollSpy</b></summary>
<br/>

- **Vertical sidebar** on desktop (left, sticky)
- **Bottom tab bar** on mobile (fixed)
- **ScrollSpy** via `IntersectionObserver` — active nav link updates as you scroll
- Manual scroll lock to prevent flickering during click-navigation
- Floating **WhatsApp** button fixed at bottom-right

</details>

---

## 🛠️ Tech Stack

| | Technology | Role |
|---|---|---|
| 🧱 | **HTML5** | Semantic structure, ARIA accessibility |
| 🎨 | **CSS3 (Vanilla)** | Claymorphism design system, animations |
| ⚡ | **JavaScript (Vanilla)** | All interactive features, zero dependencies |
| 🔤 | **Plus Jakarta Sans** | Primary typeface via Google Fonts |
| 🔣 | **Font Awesome 6.5** | Icon library (CDN) |

> **No frameworks. No build tools. No npm.** Just clean, hand-crafted HTML, CSS & JS.

---

## 📁 Project Structure

```
trial-web/
│
├── 📄 index.html                   # Single-page app — all sections
│
├── 📂 asset/
│   ├── 📂 css/
│   │   └── style.css               # 1200+ lines of Claymorphism CSS
│   │
│   ├── 📂 js/
│   │   └── script.js               # 500+ lines of interactive JS
│   │
│   └── 📂 image/
│       ├── favicon.png             # Browser favicon
│       ├── character-center.png    # Hero character (center gaze)
│       ├── character-*.png         # 8 additional eye direction states
│       └── lanyard.png             # ID Badge illustration
│
└── 📄 README.md
```

---

## 🎨 Design System — Color Palette

The entire UI is built on a curated **Soft Claymorphism** color palette:

```css
:root {
  --bg-page:          #ffffff;  /* Page background          */
  --sidebar-mint:     #c9ded9;  /* Sidebar & clay base      */
  --active-cream:     #f5f1e7;  /* Active menu & accents    */
  --card-bg-mint:     #e2ece9;  /* Card backgrounds         */
  --text-dark-green:  #26463e;  /* Primary text & headings  */
  --text-muted-green: #3f6158;  /* Subtitles & links        */
  --text-subtle:      #6b8d84;  /* Borders & subtle accents */
}
```

**Claymorphism shadow recipe used throughout:**
```css
box-shadow:
  14px 18px 36px rgba(145, 176, 168, 0.45),   /* outer soft shadow */
  -8px -8px 24px rgba(255, 255, 255, 0.9),     /* outer highlight   */
  inset 2.5px 2.5px 5px rgba(255,255,255,0.8), /* inner top-left    */
  inset -2.5px -2.5px 5px rgba(150,180,173,.3);/* inner bottom-right*/
```

---

## ⚙️ JavaScript Modules

| # | Module | Technique |
|---|---|---|
| 1 | **ScrollSpy** | `IntersectionObserver` with threshold & rootMargin |
| 2 | **Typing Animation** | Recursive `setTimeout`, single-run guard flag |
| 3 | **Eye Tracking** | Mouse zone detection → image `src` swap (9 states) |
| 4 | **Lanyard Physics** | `mousemove` + `mousedown` drag with spring `requestAnimationFrame` loop |
| 5 | **Project Slider** | `scrollBy()` with scroll-snap CSS |
| 6 | **Project Modal** | Dynamic content injection, `aria-hidden` toggle, `keydown` Escape listener |

---

## 🚀 Getting Started

**No installation required.** This is a fully static website.

### Option 1 — Open directly
```bash
# Just double-click index.html, or:
open index.html
```

### Option 2 — Local dev server (recommended)
```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx serve .

# Using VS Code
# Install "Live Server" extension → right-click index.html → "Open with Live Server"
```

Then visit → `http://localhost:8080`

---

## 🌐 Browser Compatibility

| Browser | Support |
|---|---|
| Chrome / Edge 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Safari 14+ | ✅ Full support |
| Mobile Chrome / Safari | ✅ Responsive layout |

---

## 📬 Contact & Socials

<div align="center">

[![Email](https://img.shields.io/badge/Email-calistasolihin%40example.com-C9DED9?style=for-the-badge&logo=gmail&logoColor=26463E)](mailto:calistasolihin@example.com)
[![Behance](https://img.shields.io/badge/Behance-Profile-1769FF?style=for-the-badge&logo=behance&logoColor=white)](https://behance.net)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Chat-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/6281234567890)

</div>

---

## 📄 License

This project is open source under the [MIT License](LICENSE).  
Feel free to use it as inspiration — but please credit the original design. 🙏

---

<div align="center">

**✦ Designed & developed by Calista Solihin ✦**

*"Good design is obvious. Great design is transparent."*

⭐ If you like this portfolio, please **star** the repository!

</div>
