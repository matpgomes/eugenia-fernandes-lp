# Eugenia Fernandes LP — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-conversion landing page for Eugenia Fernandes Estética & Makeup, following the PRD spec (React 19 + Vite 8 + Preact alias + CSS puro), with all sections, animations, SEO, and mobile optimization.

**Architecture:** SPA with all components in `src/App.tsx`, design tokens in `src/index.css`, all styles in `src/App.css`. Build optimized with Critical CSS inline via custom Vite plugin. Preact alias for ~50% smaller bundle. SEO via meta tags + JSON-LD in `index.html`.

**Tech Stack:** React 19, Preact 10 (alias), Vite 8, TypeScript 5, Lucide React, CSS custom properties (no Tailwind)

---

## File Structure

```
eugenia-fernandes-lp/
├── index.html              → SEO, meta tags, structured data JSON-LD, scroll reset script
├── vite.config.ts          → Build config, Critical CSS plugin, Preact alias
├── package.json            → Dependencies
├── tsconfig.json           → TypeScript config
├── tsconfig.app.json       → App-specific TS config
├── src/
│   ├── main.tsx            → Entry point, scroll reset
│   ├── App.tsx             → ALL components + logic (~900 lines)
│   ├── App.css             → ALL styles (~2000 lines)
│   ├── index.css           → Design tokens + CSS reset
│   └── vite-env.d.ts       → Vite type declarations
├── public/
│   ├── logo.webp           → Logo (navbar + IG avatar)
│   ├── hero.webp           → Hero photo
│   ├── bio.webp            → Professional photo
│   ├── before-after/
│   │   ├── ba-1-before.webp
│   │   ├── ba-1-after.webp
│   │   ├── ba-2-before.webp
│   │   ├── ba-2-after.webp
│   │   ├── ba-3-before.webp
│   │   └── ba-3-after.webp
│   ├── instagram/
│   │   ├── ig-1.webp ... ig-6.webp
│   ├── videos/
│   │   ├── video-1.mp4, video-2.mp4, video-3.mp4
│   ├── robots.txt
│   └── sitemap.xml
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `src/vite-env.d.ts`, `src/main.tsx`

- [ ] **Step 1: Initialize project with Vite**

```bash
cd /config/lp-eugenia
npm create vite@latest eugenia-fernandes-lp -- --template react-ts
```

- [ ] **Step 2: Install dependencies**

```bash
cd /config/lp-eugenia/eugenia-fernandes-lp
npm install
npm install @preact/compat lucide-react
```

- [ ] **Step 3: Configure Vite with Preact alias + Critical CSS plugin**

Replace `vite.config.ts` with:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: '@preact/compat',
      'react-dom': '@preact/compat',
      'react/jsx-runtime': '@preact/compat/jsx-runtime',
    },
  },
  build: {
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
```

- [ ] **Step 4: Configure `src/main.tsx` with scroll reset**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App'

window.history.scrollRestoration = 'manual'
window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 5: Copy assets to `public/`**

```bash
cd /config/lp-eugenia/eugenia-fernandes-lp

# Logo
cp ../logo.jpg public/logo.webp

# Instagram
mkdir -p public/instagram
i=1; for f in ../instagram/*.jpg; do cp "$f" "public/instagram/ig-$i.webp"; i=$((i+1)); done

# Before/After
mkdir -p public/before-after
cp "../antes e depois/SaveClip.App_470079068_17972794775799352_1555996602477073520_n (1).jpg" public/before-after/ba-1.webp
cp "../antes e depois/SaveClip.App_470944631_17973945389799352_968042624106023254_n.jpg" public/before-after/ba-2.webp
cp "../antes e depois/SaveClip.App_471864473_17974839275799352_5953990434061620160_n.jpg" public/before-after/ba-3.webp

# Videos
mkdir -p public/videos
i=1; for f in ../videos/*.mp4; do cp "$f" "public/videos/video-$i.mp4"; i=$((i+1)); done
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```

Expected: `VITE v8.x.x ready` on `http://localhost:5173/`

- [ ] **Step 7: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Vite + React + Preact project with assets"
```

---

## Task 2: Design Tokens (`src/index.css`)

**Files:**
- Create: `src/index.css`

Design tokens from the Eugenia Fernandes design system, adapted to the PRD template structure.

- [ ] **Step 1: Write design tokens + CSS reset**

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lato:wght@300;400;500;600;700&display=swap');

:root {
  /* ── Primary (Eugenia Fernandes brand) ── */
  --color-gold: #B8932B;
  --color-gold-light: #D4AD3C;
  --color-gold-dark: #9A7B1F;

  /* ── Secondary ── */
  --color-brown: #5C3D2E;
  --color-brown-dark: #3E2A1E;
  --color-brown-light: #8B6E5A;

  /* ── Neutrals ── */
  --color-white: #FFFFFF;
  --color-black: #1A1A1A;
  --color-text-primary: #3E2A1E;
  --color-text-body: #5C3D2E;
  --color-text-muted: #9C9080;

  /* ── Backgrounds ── */
  --bg-ivory: #FDF8F0;
  --bg-cream: #F5EDE1;
  --bg-warm: #E8DDD1;
  --bg-warm-deep: #D4C4A8;

  /* ── Functional ── */
  --color-whatsapp: #25D366;
  --color-card-bg: rgba(255, 255, 255, 0.85);
  --color-border: rgba(184, 147, 43, 0.15);
  --color-border-strong: rgba(184, 147, 43, 0.3);

  /* ── Gradients ── */
  --gradient-gold: linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 50%, var(--color-gold-dark) 100%);
  --gradient-hero: linear-gradient(160deg, var(--bg-ivory) 0%, var(--bg-cream) 40%, var(--bg-warm) 100%);
  --gradient-section: linear-gradient(180deg, var(--bg-ivory) 0%, var(--bg-cream) 100%);
  --mesh-hero: radial-gradient(ellipse at 20% 50%, rgba(184,147,43,0.08) 0%, transparent 50%),
               radial-gradient(ellipse at 80% 20%, rgba(139,110,90,0.06) 0%, transparent 50%),
               radial-gradient(ellipse at 50% 100%, rgba(212,173,60,0.05) 0%, transparent 40%),
               var(--gradient-hero);
  --gradient-aurora: linear-gradient(135deg, rgba(184,147,43,0.05) 0%, rgba(139,110,90,0.08) 25%, rgba(212,173,60,0.05) 50%, rgba(139,110,90,0.06) 75%, rgba(184,147,43,0.04) 100%);

  /* ── Glassmorphism ── */
  --glass-bg: rgba(255, 255, 255, 0.65);
  --glass-bg-strong: rgba(255, 255, 255, 0.85);
  --glass-bg-subtle: rgba(255, 255, 255, 0.35);
  --glass-bg-dark: rgba(62, 42, 30, 0.60);
  --glass-blur: blur(16px);
  --glass-blur-light: blur(8px);
  --glass-blur-heavy: blur(24px);
  --glass-border: 1px solid rgba(255, 255, 255, 0.18);
  --glass-border-warm: 1px solid rgba(184, 147, 43, 0.15);
  --glass-shadow: 0 8px 32px rgba(62, 42, 30, 0.08);

  /* ── Typography ── */
  --font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-body: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
  --text-xs: 0.75rem; --text-sm: 0.875rem; --text-base: 1rem;
  --text-lg: 1.125rem; --text-xl: 1.25rem; --text-2xl: 1.5rem;
  --text-3xl: 1.875rem; --text-4xl: 2.25rem; --text-5xl: 3rem; --text-6xl: 3.75rem;

  /* ── Spacing (4px grid) ── */
  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem;
  --space-4: 1rem; --space-5: 1.25rem; --space-6: 1.5rem;
  --space-8: 2rem; --space-10: 2.5rem; --space-12: 3rem;
  --space-16: 4rem; --space-20: 5rem; --space-24: 6rem; --space-32: 8rem;

  /* ── Radius ── */
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px;
  --radius-xl: 24px; --radius-full: 9999px;

  /* ── Shadows ── */
  --shadow-sm: 0 1px 3px rgba(62,42,30,0.04), 0 1px 2px rgba(62,42,30,0.02);
  --shadow-md: 0 4px 16px rgba(62,42,30,0.06), 0 1px 4px rgba(62,42,30,0.03);
  --shadow-lg: 0 12px 40px rgba(62,42,30,0.08), 0 4px 12px rgba(62,42,30,0.04);
  --shadow-xl: 0 20px 60px rgba(62,42,30,0.1), 0 8px 20px rgba(62,42,30,0.05);
  --shadow-gold: 0 8px 32px rgba(184,147,43,0.15);
  --shadow-glow: 0 0 20px rgba(184,147,43,0.20), 0 0 60px rgba(184,147,43,0.08);

  /* ── Transitions ── */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  --duration-fast: 150ms; --duration-base: 250ms;
  --duration-slow: 400ms; --duration-reveal: 800ms;

  /* ── Layout ── */
  --container-max: 1200px; --container-narrow: 800px; --navbar-height: 72px;
}

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
  font-size: 16px;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.5;
  color: var(--color-text-body);
  background: var(--bg-ivory);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

img, video { display: block; max-width: 100%; height: auto; }
a { color: inherit; text-decoration: none; }
button { font: inherit; cursor: pointer; }
ul, ol { list-style: none; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Verify tokens render in browser**

Check `localhost:5173` — page should show ivory background with Lato font.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add design tokens and CSS reset for Eugenia Fernandes brand"
```

---

## Task 3: Base Styles + Animations (`src/App.css` — Part 1)

**Files:**
- Create: `src/App.css`

This task covers: container, glass utilities, scroll progress, reveal system, keyframes, buttons, section headers, preloader.

- [ ] **Step 1: Write base layout + utility styles**

```css
/* ── Container ── */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* ── Glass Utilities ── */
.glass {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: var(--glass-border);
  box-shadow: var(--glass-shadow);
}
.glass--strong {
  background: var(--glass-bg-strong);
  backdrop-filter: var(--glass-blur-heavy);
  -webkit-backdrop-filter: var(--glass-blur-heavy);
}
.glass--subtle {
  background: var(--glass-bg-subtle);
  backdrop-filter: var(--glass-blur-light);
  -webkit-backdrop-filter: var(--glass-blur-light);
}

/* ── Scroll Progress ── */
.scroll-progress {
  position: fixed; top: 0; left: 0; right: 0; height: 3px;
  background: var(--gradient-gold);
  transform-origin: left;
  z-index: 99999;
  animation: scaleProgress linear;
  animation-timeline: scroll(root);
}
@keyframes scaleProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

/* ── Reveal System ── */
.reveal {
  opacity: 0;
  transition: opacity var(--duration-reveal) var(--ease-out),
              transform var(--duration-reveal) var(--ease-out);
  will-change: opacity, transform;
}
.reveal--up { transform: translateY(18px); }
.reveal--left { transform: translateX(-24px); }
.reveal--right { transform: translateX(24px); }
.reveal--scale { transform: scale(0.96); }
.revealed { opacity: 1 !important; transform: none !important; }

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; will-change: auto; }
}

/* ── Section Header ── */
.section-header { text-align: center; margin-bottom: var(--space-12); }
.section-label {
  display: inline-block;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: var(--space-3);
}
.section-title {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  font-weight: 400;
  color: var(--color-text-primary);
  line-height: 1.2;
  margin-bottom: var(--space-4);
}
.section-subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

@media (max-width: 767px) {
  .section-title { font-size: var(--text-3xl); }
  .section-subtitle { font-size: var(--text-base); }
}

/* ── Buttons ── */
.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.875rem 2.5rem;
  background: var(--gradient-gold);
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border: none;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-gold);
  transition: transform var(--duration-fast) var(--ease-spring),
              box-shadow var(--duration-base) var(--ease-out);
}
.btn-cta:hover { transform: translateY(-2px); box-shadow: var(--shadow-glow); }
.btn-cta:active { transform: translateY(1px) scale(0.98); box-shadow: var(--shadow-sm); transition-duration: 80ms; }

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.875rem 2.5rem;
  background: transparent;
  color: var(--color-brown);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border: 1.5px solid var(--bg-warm-deep);
  border-radius: var(--radius-full);
  transition: border-color var(--duration-base) var(--ease-out),
              color var(--duration-base) var(--ease-out);
}
.btn-secondary:hover { border-color: var(--color-gold); color: var(--color-gold); }

/* ── Preloader ── */
.preloader {
  position: fixed; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg-ivory);
  z-index: 99999;
  transition: opacity 0.5s ease;
}
.preloader--hidden { opacity: 0; pointer-events: none; }
.preloader img {
  width: 80px; height: 80px;
  object-fit: contain;
  animation: breathing 2s ease-in-out infinite;
}

/* ── Keyframes ── */
@keyframes fadeIn { to { opacity: 1; } }
@keyframes fadeSlideUp { to { opacity: 1; transform: translateY(0); } }
@keyframes fadeSlideDown { to { opacity: 1; transform: translateY(0); } }
@keyframes fadeSlideLeft { to { opacity: 1; transform: translateX(0); } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes pulseRing { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2.2); opacity: 0; } }
@keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
@keyframes breathing { 0%,100% { opacity: 0.7; transform: scale(0.98); } 50% { opacity: 1; transform: scale(1.02); } }
@keyframes spin { to { transform: rotate(360deg); } }
```

- [ ] **Step 2: Commit**

```bash
git add src/App.css
git commit -m "feat: add base styles, animations, reveal system, buttons, preloader"
```

---

## Task 4: App Shell + Constants + Preloader + Navbar (`src/App.tsx` — Part 1)

**Files:**
- Create: `src/App.tsx`

- [ ] **Step 1: Write App shell with constants, preloader, and navbar**

```tsx
import { useState, useEffect, useRef } from 'react'
import {
  Menu, X, Phone, MapPin, Clock, Star, ChevronDown,
  Play, Heart, CheckCircle, ArrowUp, MessageCircle,
  Instagram, Mail, Sparkles, Users, Award, CalendarCheck,
  Scissors, Droplets, Zap, Gem, Sun, Eye
} from 'lucide-react'

// ── Constants ──
const WHATSAPP_NUMBER = '351XXXXXXXXX'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%21%20Gostaria%20de%20agendar%20uma%20consulta.`
const PHONE = '+351 XXX XXX XXX'
const ADDRESS = 'Rua XXXXX, Lisboa, Portugal'
const INSTAGRAM_URL = 'https://www.instagram.com/eugeniafernandes.estetica'
const INSTAGRAM_HANDLE = 'eugeniafernandes.estetica'
const CLINIC_NAME = 'Eugenia Fernandes Estética & Makeup'
const GOOGLE_MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113!2d-9.15!3d38.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ0JzI0LjAiTiA5wrAwOScwMC4wIlc!5e0!3m2!1spt-PT!2spt!4v1'

const PROCEDURES = [
  { icon: Eye, title: 'Design de Sobrancelha', desc: 'Threading com linha para um olhar perfeito e natural.' },
  { icon: Sparkles, title: 'Dermaplaning', desc: 'Esfoliacao com lamina para pele lisa e luminosa.' },
  { icon: Zap, title: 'Radiofrequencia Indiba', desc: 'Tecnologia avancada para firmeza e rejuvenescimento.' },
  { icon: Droplets, title: 'Tratamentos Faciais', desc: 'Limpeza profunda, hidratacao e revitalizacao.' },
  { icon: Sun, title: 'Lifting Facial', desc: 'Efeito lifting nao invasivo com resultados visiveis.' },
  { icon: Gem, title: 'Makeup Profissional', desc: 'Maquilhagem para noivas, eventos e editoriais.' },
]

const RESULTS = [
  { before: '/before-after/ba-1.webp', after: '/before-after/ba-1.webp', title: 'Ondas Acusticas + Indiba' },
  { before: '/before-after/ba-2.webp', after: '/before-after/ba-2.webp', title: 'Design de Sobrancelha' },
  { before: '/before-after/ba-3.webp', after: '/before-after/ba-3.webp', title: 'Tratamento Facial' },
]

const TESTIMONIALS = [
  { name: 'Ana S.', text: 'Profissional incrivel! Resultado superou as expectativas. Recomendo a todas.', rating: 5 },
  { name: 'Maria L.', text: 'O espaco e lindo e acolhedor. A Eugenia e muito atenciosa e competente.', rating: 5 },
  { name: 'Joana R.', text: 'Fiz o design de sobrancelha e amei! Finalmente encontrei alguem de confianca.', rating: 5 },
  { name: 'Patricia M.', text: 'Resultados visiveis desde a primeira sessao de Indiba. Estou muito satisfeita!', rating: 5 },
]

const VIDEOS_ATENDIMENTO = [
  { src: '/videos/video-1.mp4', title: 'Atendimento Personalizado' },
  { src: '/videos/video-2.mp4', title: 'Espaco e Equipamentos' },
  { src: '/videos/video-3.mp4', title: 'Tratamento em Acao' },
]

const STEPS = [
  { icon: Phone, title: 'Contacte-nos', desc: 'Envie uma mensagem pelo WhatsApp' },
  { icon: CalendarCheck, title: 'Agende', desc: 'Escolha o melhor dia e horario' },
  { icon: Sparkles, title: 'Consulta', desc: 'Avaliacao personalizada gratuita' },
  { icon: Heart, title: 'Resultados', desc: 'Transformacao visivel e duradoura' },
]

const FAQ_ITEMS = [
  { question: 'Quanto tempo dura cada sessao?', answer: 'A duracao varia conforme o tratamento. A maioria das sessoes dura entre 30 e 60 minutos. Na primeira consulta, fazemos uma avaliacao completa para definir o plano ideal.' },
  { question: 'Os procedimentos sao dolorosos?', answer: 'Nao. Os nossos procedimentos sao pensados para maximo conforto. Utilizamos tecnicas suaves e equipamentos de ultima geracao que minimizam qualquer desconforto.' },
  { question: 'Quantas sessoes sao necessarias?', answer: 'Depende do tratamento e dos objetivos. Em geral, recomendamos entre 4 a 8 sessoes para resultados otimos. Na consulta inicial definimos um protocolo personalizado.' },
  { question: 'Posso fazer tratamentos durante a gravidez?', answer: 'Alguns tratamentos sao seguros durante a gravidez, mas outros nao sao recomendados. Informe-nos sobre a sua situacao e adaptaremos o protocolo.' },
  { question: 'Como funciona o agendamento?', answer: 'Basta enviar uma mensagem pelo WhatsApp. Respondemos rapidamente e encontramos o melhor horario para si. Tambem pode ligar diretamente.' },
  { question: 'Qual o metodo de pagamento?', answer: 'Aceitamos dinheiro, Multibanco, MBWay e transferencia bancaria. O pagamento e feito no dia da sessao.' },
  { question: 'E necessario preparacao antes do tratamento?', answer: 'Para a maioria dos tratamentos, nao e necessaria preparacao especial. Enviamos instrucoes especificas por WhatsApp antes da sua sessao, caso necessario.' },
  { question: 'Os resultados sao permanentes?', answer: 'Os resultados variam conforme o tratamento. Tratamentos como threading duram 3-4 semanas. Tratamentos corporais com Indiba tem resultados progressivos e duradouros com manutencao.' },
]

const IG_POSTS = [
  { src: '/instagram/ig-1.webp', alt: 'Post Instagram 1' },
  { src: '/instagram/ig-2.webp', alt: 'Post Instagram 2' },
  { src: '/instagram/ig-3.webp', alt: 'Post Instagram 3' },
  { src: '/instagram/ig-4.webp', alt: 'Post Instagram 4' },
  { src: '/instagram/ig-5.webp', alt: 'Post Instagram 5' },
  { src: '/instagram/ig-6.webp', alt: 'Post Instagram 6' },
]

const NAV_LINKS = [
  { label: 'Resultados', href: '#resultados' },
  { label: 'Procedimentos', href: '#procedimentos' },
  { label: 'Sobre', href: '#bio' },
  { label: 'Contacto', href: '#agendamento' },
]

// ── SectionHeader Component ──
function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div className="section-header">
      <span className="reveal reveal--up section-label" style={{ transitionDelay: '0s' }}>{label}</span>
      <h2 className="reveal reveal--up section-title" style={{ transitionDelay: '0.08s' }}>{title}</h2>
      {subtitle && (
        <p className="reveal reveal--up section-subtitle" style={{ transitionDelay: '0.16s' }}>{subtitle}</p>
      )}
    </div>
  )
}

// ── useVideoPoster Hook ──
function useVideoPoster(src: string, posterTime = 0.5) {
  const [poster, setPoster] = useState('')
  useEffect(() => {
    if (!src) return
    const video = document.createElement('video')
    video.muted = true
    video.playsInline = true
    video.preload = 'metadata'
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    video.addEventListener('loadeddata', () => { video.currentTime = posterTime })
    video.addEventListener('seeked', () => {
      canvas.width = video.videoWidth || 720
      canvas.height = video.videoHeight || 1280
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
      setPoster(canvas.toDataURL('image/jpeg', 0.8))
      video.pause(); video.src = ''; video.load()
    })
    video.src = src; video.load()
    return () => { video.pause(); video.src = '' }
  }, [src, posterTime])
  return poster
}

// ── VideoCard Component ──
function VideoCard({ src, title, posterTime = 0.5 }: { src: string; title: string; posterTime?: number }) {
  const [isNear, setIsNear] = useState(false)
  const [state, setState] = useState<'idle' | 'loading' | 'playing'>('idle')
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsNear(true); io.disconnect() }
    }, { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const poster = useVideoPoster(isNear ? src : '', posterTime)

  const handlePlay = async () => {
    setState('loading')
    try {
      const vid = videoRef.current
      if (!vid) return
      vid.muted = false
      await vid.play()
      setState('playing')
    } catch { setState('idle') }
  }

  return (
    <div ref={cardRef} className={`video-card video-card--${state} reveal reveal--up`}>
      {poster && state !== 'playing' && (
        <img className="video-card__poster" src={poster} alt={title} draggable={false} />
      )}
      {state !== 'playing' && (
        <button className="video-card__play" onClick={handlePlay} aria-label={`Reproduzir: ${title}`}>
          <span className="video-card__play-circle">
            {state === 'idle' && <Play size={28} fill="white" />}
            {state === 'loading' && <span className="video-card__spinner" />}
          </span>
        </button>
      )}
      <video
        ref={videoRef}
        className={`video-card__video ${state === 'playing' ? 'video-card__video--visible' : ''}`}
        src={src} playsInline controls={state === 'playing'} preload="none"
      />
    </div>
  )
}

// ── Main App Component ──
export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeVideo, setActiveVideo] = useState(0)
  const videosRef = useRef<HTMLDivElement>(null)

  // Scroll reset
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  // Preloader
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Scroll listener (navbar glass + scroll-to-top)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100)
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Reveal observer
  useEffect(() => {
    if (!loaded) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [loaded])

  // Video dots observer
  useEffect(() => {
    const cards = videosRef.current?.querySelectorAll('.video-card')
    if (!cards) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const idx = Array.from(cards).indexOf(entry.target as HTMLElement)
            if (idx !== -1) setActiveVideo(idx)
          }
        })
      },
      { threshold: 0.5 }
    )
    cards.forEach((card) => io.observe(card))
    return () => io.disconnect()
  }, [loaded])

  // Counter animation helper
  const animateCounter = (el: HTMLElement, target: number) => {
    const start = performance.now()
    const update = (now: number) => {
      const progress = Math.min((now - start) / 2000, 1)
      const eased = 1 - (1 - progress) ** 2
      el.textContent = Math.round(eased * target).toString()
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }

  // Bio stats counter trigger
  useEffect(() => {
    if (!loaded) return
    const statsEls = document.querySelectorAll('[data-counter]')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt((entry.target as HTMLElement).dataset.counter || '0')
          animateCounter(entry.target as HTMLElement, target)
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })
    statsEls.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [loaded])

  return (
    <>
      {/* Preloader */}
      <div className={`preloader ${loaded ? 'preloader--hidden' : ''}`}>
        <img src="/logo.webp" alt="Eugenia Fernandes" width={80} height={80} />
      </div>

      {/* Scroll Progress */}
      <div className="scroll-progress" />

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar-inner">
          <a href="#" className="navbar-logo">
            <img src="/logo.webp" alt="Eugenia Fernandes" width={44} height={44} />
          </a>
          <div className="navbar-links">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="navbar-link">{link.label}</a>
            ))}
          </div>
          <a href={WHATSAPP_LINK} className="btn-cta navbar-cta" target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} /> Agendar
          </a>
          <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href={WHATSAPP_LINK} className="btn-cta mobile-menu-cta" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} /> Agendar pelo WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* ══════ HERO ══════ */}
      <section id="hero" className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-brand">
              Eugenia Fernandes
            </span>
            <h1 className="hero-title">
              Realce a sua <em>beleza natural</em> com tratamentos de excelencia
            </h1>
            <div className="hero-image-mobile-slot">
              <img className="hero-image" src="/logo.webp" alt="Eugenia Fernandes" width={260} height={260} />
            </div>
            <p className="hero-subtitle">
              Estetica facial, corporal e maquilhagem profissional em Lisboa. Resultados visiveis desde a primeira sessao.
            </p>
            <a href={WHATSAPP_LINK} className="btn-cta hero-cta" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} /> Agendar Consulta
            </a>
            <div className="hero-badge glass">
              <Star size={16} fill="#F59E0B" color="#F59E0B" />
              <span><strong>5.0</strong> Google Reviews</span>
            </div>
            <div className="scroll-indicator" aria-hidden="true">
              <ChevronDown size={24} />
            </div>
          </div>
          <div className="hero-image-desktop">
            <img className="hero-image" src="/logo.webp" alt="Eugenia Fernandes" width={460} height={460} />
          </div>
        </div>
      </section>

      {/* ══════ RESULTADOS ══════ */}
      <section id="resultados" className="results-section">
        <div className="container">
          <SectionHeader label="Transformacoes" title="Resultados Reais" subtitle="Veja as transformacoes das nossas clientes" />
          <div className="results-grid">
            {RESULTS.map((r, i) => (
              <div key={i} className="result-card reveal reveal--scale" style={{ transitionDelay: `${i * 0.07}s` }}>
                <img src={r.after} alt={r.title} loading="lazy" />
                <span className="result-card__label">{r.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PROCEDIMENTOS ══════ */}
      <section id="procedimentos" className="procedures-section">
        <div className="container">
          <SectionHeader label="Servicos" title="Nossos Procedimentos" subtitle="Tratamentos personalizados para cada necessidade" />
          <div className="procedures-grid">
            {PROCEDURES.map((p, i) => (
              <div key={i} className="procedure-card reveal reveal--up" style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="procedure-icon">
                  <p.icon size={28} />
                </div>
                <h3 className="procedure-title">{p.title}</h3>
                <p className="procedure-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ DEPOIMENTOS ══════ */}
      <section id="depoimentos" className="testimonials-section">
        <div className="container">
          <SectionHeader label="Avaliacoes" title="O Que Dizem as Clientes" />
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card glass reveal reveal--up" style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <span className="testimonial-name">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ VIDEOS ══════ */}
      <section id="atendimento-videos" className="videos-section">
        <div className="container">
          <SectionHeader label="Experiencia" title="Nosso Atendimento" subtitle="Conheca o nosso espaco e forma de trabalhar" />
          <div className="videos-grid" ref={videosRef}>
            {VIDEOS_ATENDIMENTO.map((v, i) => (
              <VideoCard key={i} src={v.src} title={v.title} posterTime={0.5} />
            ))}
          </div>
          <div className="videos-dots" aria-hidden="true">
            {VIDEOS_ATENDIMENTO.map((_, i) => (
              <span key={i} className={`videos-dot ${i === activeVideo ? 'videos-dot--active' : ''}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PASSOS ══════ */}
      <section id="passos" className="steps-section">
        <div className="container">
          <SectionHeader label="Como Funciona" title="4 Passos Simples" subtitle="Agendar e facil e rapido" />
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={i} className="step-card reveal reveal--up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="step-icon">
                  <s.icon size={32} />
                </div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ BIO ══════ */}
      <section id="bio" className="bio-section">
        <div className="container bio-grid">
          <div className="bio-image-wrap reveal reveal--left">
            <img src="/logo.webp" alt="Eugenia Fernandes" className="bio-image" width={400} height={500} />
          </div>
          <div className="bio-content reveal reveal--right" style={{ transitionDelay: '0.1s' }}>
            <span className="section-label">Sobre</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Eugenia Fernandes</h2>
            <p className="bio-text">
              Com mais de 10 anos de experiencia em estetica e maquilhagem profissional, a Eugenia combina tecnica e sensibilidade para realcar a beleza unica de cada cliente. Formacao internacional e atualizacao constante nas mais recentes tecnologias e tendencias.
            </p>
            <div className="bio-stats">
              <div className="bio-stat reveal reveal--scale" style={{ transitionDelay: '0.2s' }}>
                <span className="bio-stat-number" data-counter="10">0</span>
                <span className="bio-stat-suffix">+</span>
                <span className="bio-stat-label">Anos de Experiencia</span>
              </div>
              <div className="bio-stat reveal reveal--scale" style={{ transitionDelay: '0.27s' }}>
                <span className="bio-stat-number" data-counter="2000">0</span>
                <span className="bio-stat-suffix">+</span>
                <span className="bio-stat-label">Clientes Satisfeitas</span>
              </div>
              <div className="bio-stat reveal reveal--scale" style={{ transitionDelay: '0.34s' }}>
                <span className="bio-stat-number" data-counter="5000">0</span>
                <span className="bio-stat-suffix">+</span>
                <span className="bio-stat-label">Procedimentos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ INSTAGRAM ══════ */}
      <section id="instagram" className="instagram-section">
        <div className="container">
          <SectionHeader label="Redes Sociais" title="Siga no Instagram" />
          <div className="instagram-header">
            <a className="instagram-profile" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <div className="instagram-avatar-wrap">
                <img className="instagram-avatar" src="/logo.webp" alt="Logo" width={52} height={52} />
              </div>
              <div className="instagram-profile-info">
                <span className="instagram-handle">@{INSTAGRAM_HANDLE}</span>
                <span className="instagram-name">{CLINIC_NAME}</span>
              </div>
            </a>
            <a className="btn-instagram-follow" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              Seguir
            </a>
          </div>
          <div className="ig-grid">
            {IG_POSTS.map((post, i) => (
              <a key={i} className="ig-post reveal reveal--scale" style={{ transitionDelay: `${i * 0.05}s` }} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                <img src={post.src} alt={post.alt} loading="lazy" width={400} height={400} />
                <div className="ig-post__overlay"><Heart size={24} /></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA CARD ══════ */}
      <section id="agendamento" className="cta-section">
        <div className="container">
          <div className="cta-card reveal reveal--scale">
            <div className="cta-shimmer" />
            <h2 className="cta-title">Pronta para a sua transformacao?</h2>
            <ul className="cta-checklist">
              {['Consulta de avaliacao gratuita', 'Atendimento personalizado', 'Equipamentos de ultima geracao', 'Resultados comprovados', 'Agendamento facil pelo WhatsApp'].map((item, i) => (
                <li key={i} className="cta-check-item reveal reveal--up" style={{ transitionDelay: `${i * 0.06}s` }}>
                  <CheckCircle size={18} /> {item}
                </li>
              ))}
            </ul>
            <a href={WHATSAPP_LINK} className="btn-cta cta-btn" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} /> Agendar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ══════ MAPA ══════ */}
      <section id="mapa" className="map-section">
        <div className="container">
          <SectionHeader label="Localizacao" title="Como Chegar" />
          <div className="map-address reveal reveal--up">
            <MapPin size={20} color="var(--color-gold)" />
            <span>{ADDRESS}</span>
          </div>
          <div className="map-wrapper reveal reveal--scale">
            <iframe
              className="map-iframe"
              src={GOOGLE_MAPS_EMBED}
              title="Localizacao no Google Maps"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section id="faq" className="faq-section">
        <div className="container faq-container">
          <SectionHeader label="Duvidas" title="Perguntas Frequentes" />
          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={`faq-item reveal reveal--up ${openFaq === i ? 'faq-item--open' : ''}`} style={{ transitionDelay: `${i * 0.04}s` }}>
                <button className="faq-trigger" onClick={() => setOpenFaq(prev => prev === i ? null : i)} aria-expanded={openFaq === i} aria-controls={`faq-answer-${i}`}>
                  <span className="faq-question">{item.question}</span>
                  <span className="faq-icon"><ChevronDown size={20} /></span>
                </button>
                <div className="faq-answer" id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-trigger-${i}`}>
                  <div className="faq-answer-inner">
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer id="footer" className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/logo.webp" alt="Eugenia Fernandes" width={60} height={60} />
            <p className="footer-desc">Estetica & Makeup profissional em Lisboa. Beleza, confianca e bem-estar.</p>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Navegacao</h4>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="footer-link">{link.label}</a>
            ))}
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Contacto</h4>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="footer-link"><Phone size={14} /> {PHONE}</a>
            <a href={`mailto:info@eugeniafernandes.pt`} className="footer-link"><Mail size={14} /> info@eugeniafernandes.pt</a>
            <span className="footer-link"><MapPin size={14} /> {ADDRESS}</span>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Redes Sociais</h4>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer-link"><Instagram size={14} /> Instagram</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {CLINIC_NAME}. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* ══════ FLOATING ELEMENTS ══════ */}
      <a href={WHATSAPP_LINK} className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <MessageCircle size={28} />
        <span className="wa-float__ring" />
      </a>

      {showScrollTop && (
        <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Voltar ao topo">
          <ArrowUp size={20} />
        </button>
      )}
    </>
  )
}
```

- [ ] **Step 2: Verify app renders in browser with all sections visible**

```bash
npm run dev
```

Check all sections render at `localhost:5173`.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add complete App with all sections, components, and data"
```

---

## Task 5: Section Styles (`src/App.css` — Part 2)

**Files:**
- Modify: `src/App.css` (append)

- [ ] **Step 1: Append navbar styles**

```css
/* ══════ NAVBAR ══════ */
.navbar {
  position: fixed; top: 0; left: 0; right: 0;
  height: var(--navbar-height);
  z-index: 9999;
  transition: background var(--duration-base) var(--ease-out),
              box-shadow var(--duration-base) var(--ease-out);
}
.navbar--scrolled {
  background: var(--glass-bg-strong);
  backdrop-filter: var(--glass-blur-heavy);
  -webkit-backdrop-filter: var(--glass-blur-heavy);
  border-bottom: var(--glass-border);
  box-shadow: var(--shadow-md);
}
.navbar-inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 100%; gap: var(--space-6);
}
.navbar-logo img { border-radius: var(--radius-full); }
.navbar-links { display: flex; gap: var(--space-8); }
.navbar-link {
  font-family: var(--font-body); font-size: var(--text-sm);
  font-weight: 500; color: var(--color-text-primary);
  letter-spacing: 0.02em;
  transition: color var(--duration-fast) var(--ease-out);
}
.navbar-link:hover { color: var(--color-gold); }
.navbar-cta { padding: 0.625rem 1.5rem; font-size: var(--text-sm); }
.navbar-hamburger {
  display: none; background: none; border: none;
  color: var(--color-text-primary); padding: var(--space-2);
}

@media (max-width: 767px) {
  .navbar { height: 64px; }
  .navbar-links, .navbar-cta { display: none; }
  .navbar-hamburger { display: flex; }
}

/* ── Mobile Menu ── */
.mobile-menu-overlay {
  position: fixed; inset: 0; background: rgba(62,42,30,0.5);
  backdrop-filter: blur(4px); z-index: 10000;
}
.mobile-menu {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: 300px; background: var(--bg-ivory);
  padding: var(--space-20) var(--space-6) var(--space-6);
  display: flex; flex-direction: column; gap: var(--space-4);
  box-shadow: var(--shadow-xl);
}
.mobile-menu-link {
  font-family: var(--font-body); font-size: var(--text-lg);
  font-weight: 500; color: var(--color-text-primary);
  padding: var(--space-3) 0; border-bottom: 1px solid var(--color-border);
}
.mobile-menu-cta { margin-top: auto; text-align: center; justify-content: center; }
```

- [ ] **Step 2: Append hero styles**

```css
/* ══════ HERO ══════ */
.hero {
  background: var(--mesh-hero);
  min-height: 100vh; min-height: 100dvh;
  padding-top: var(--navbar-height);
}
.hero-grid {
  display: grid; grid-template-columns: 1.1fr 0.9fr;
  gap: var(--space-16); align-items: center;
  min-height: calc(100vh - var(--navbar-height));
  padding: var(--space-24) 0;
}
.hero-content {
  display: flex; flex-direction: column;
  align-items: flex-start; gap: var(--space-6);
}
.hero-brand {
  font-family: var(--font-body); font-size: var(--text-sm);
  font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--color-gold); padding-left: var(--space-4);
  border-left: 3px solid var(--color-gold);
  opacity: 0; transform: translateY(-12px);
  animation: fadeSlideDown 0.6s var(--ease-out) 0.2s forwards;
}
.hero-title {
  font-family: var(--font-heading); font-size: var(--text-5xl);
  font-weight: 400; color: var(--color-text-primary); line-height: 1.15;
  opacity: 0; transform: translateY(16px);
  animation: fadeSlideUp 0.7s var(--ease-out) 0.4s forwards;
}
.hero-title em { color: var(--color-gold); font-style: italic; }
.hero-subtitle {
  font-size: var(--text-lg); color: var(--color-text-muted); line-height: 1.6; max-width: 480px;
  opacity: 0; animation: fadeIn 0.6s var(--ease-out) 0.7s forwards;
}
.hero-cta {
  opacity: 0; transform: translateY(12px);
  animation: fadeSlideUp 0.6s var(--ease-spring) 0.9s forwards;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full); font-size: var(--text-sm); font-weight: 500;
  color: var(--color-text-primary);
  opacity: 0; transform: translateY(12px);
  animation: fadeSlideUp 0.5s var(--ease-out) 1.1s forwards;
}
.hero-image-desktop { display: flex; align-items: center; justify-content: center; }
.hero-image {
  width: 100%; max-width: 460px; border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl); object-fit: cover;
  opacity: 0; transform: translateX(20px);
  animation: fadeSlideLeft 0.8s var(--ease-out) 0.5s forwards;
}
.hero-image-mobile-slot { display: none; }
.scroll-indicator {
  color: var(--color-text-muted);
  opacity: 0; animation: fadeIn 0.5s ease 1.3s forwards, bounce 2s ease-in-out 1.8s infinite;
}

@media (max-width: 767px) {
  .hero-grid { grid-template-columns: 1fr; gap: var(--space-6); padding: var(--space-12) 0; }
  .hero-image-desktop { display: none; }
  .hero-image-mobile-slot {
    display: flex; justify-content: center; width: 100%; margin: var(--space-4) 0;
  }
  .hero-image-mobile-slot .hero-image {
    max-width: 260px; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg);
    transform: translateY(16px); animation: fadeSlideUp 0.7s var(--ease-out) 0.5s forwards;
  }
  .hero-title { font-size: var(--text-3xl); }
  .hero-content { align-items: center; text-align: center; }
  .hero-brand { border-left: none; padding-left: 0; }
  .scroll-indicator { display: none; }
}
```

- [ ] **Step 3: Append results + procedures + testimonials styles**

```css
/* ══════ RESULTADOS ══════ */
.results-section { background: var(--gradient-section); padding: var(--space-24) 0; }
.results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
.result-card {
  position: relative; border-radius: var(--radius-xl); overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out);
}
.result-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.result-card img { width: 100%; aspect-ratio: 1; object-fit: cover; }
.result-card__label {
  position: absolute; bottom: var(--space-3); left: var(--space-3);
  font-size: var(--text-xs); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--color-white); background: rgba(62,42,30,0.7);
  padding: var(--space-1) var(--space-3); border-radius: var(--radius-full);
}

@media (max-width: 767px) { .results-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; } }

/* ══════ PROCEDIMENTOS ══════ */
.procedures-section { background: var(--bg-ivory); padding: var(--space-24) 0; }
.procedures-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
.procedure-card {
  background: var(--color-card-bg); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: var(--space-8) var(--space-6);
  text-align: center;
  transition: transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out);
}
.procedure-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
.procedure-icon {
  width: 56px; height: 56px; margin: 0 auto var(--space-4);
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-full); background: var(--bg-cream); color: var(--color-gold);
  transition: transform var(--duration-base) var(--ease-spring);
}
.procedure-card:hover .procedure-icon { transform: rotate(-5deg) scale(1.1); }
.procedure-title {
  font-family: var(--font-heading); font-size: var(--text-lg);
  font-weight: 600; color: var(--color-text-primary); margin-bottom: var(--space-2);
}
.procedure-desc { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.6; }

@media (max-width: 1023px) { .procedures-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .procedures-grid { grid-template-columns: 1fr; } }

/* ══════ DEPOIMENTOS ══════ */
.testimonials-section { background: var(--bg-cream); padding: var(--space-24) 0; }
.testimonials-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-6); }
.testimonial-card {
  padding: var(--space-8); border-radius: var(--radius-lg);
  transition: transform var(--duration-base) var(--ease-out);
}
.testimonial-card:hover { transform: translateY(-2px); }
.testimonial-stars { display: flex; gap: 2px; margin-bottom: var(--space-4); }
.testimonial-text {
  font-family: var(--font-heading); font-size: var(--text-lg);
  font-style: italic; color: var(--color-text-primary);
  line-height: 1.6; margin-bottom: var(--space-4);
}
.testimonial-name { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-muted); }

@media (max-width: 767px) { .testimonials-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 4: Append video + steps + bio styles**

```css
/* ══════ VIDEOS ══════ */
.videos-section { background: var(--bg-cream); padding: var(--space-24) 0; }

@media (min-width: 1024px) {
  .videos-grid {
    display: grid; grid-template-columns: repeat(3, 260px);
    gap: var(--space-6); justify-content: center;
  }
}
@media (min-width: 1280px) { .videos-grid { grid-template-columns: repeat(3, 280px); } }
@media (min-width: 1440px) { .videos-grid { grid-template-columns: repeat(3, 320px); } }

@media (max-width: 1023px) {
  .videos-section .container { padding-right: 0; }
  .videos-grid {
    display: flex; gap: var(--space-4);
    overflow-x: auto; scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-left: var(--space-4); padding-right: var(--space-4);
    scrollbar-width: none;
  }
  .videos-grid::-webkit-scrollbar { display: none; }
  .video-card { flex: 0 0 85vw; max-width: 340px; scroll-snap-align: start; }
}
@media (max-width: 480px) { .video-card { max-width: 300px; } }

.video-card {
  position: relative; border-radius: var(--radius-xl); overflow: hidden;
  background: var(--color-black); aspect-ratio: 9 / 16; cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out);
}
@media (hover: hover) { .video-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-xl); } }
.video-card__poster {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; transition: opacity var(--duration-base) var(--ease-out);
}
.video-card::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(62,42,30,0.4) 0%, transparent 50%);
  z-index: 1; pointer-events: none;
}
.video-card__play {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: transparent; border: none; cursor: pointer; z-index: 2;
}
.video-card__play-circle {
  width: 72px; height: 72px; border-radius: var(--radius-full);
  background: rgba(139,110,90,0.35); backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.25);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-white);
  transition: transform var(--duration-base) var(--ease-spring), background var(--duration-base) var(--ease-out);
}
.video-card__play:hover .video-card__play-circle { transform: scale(1.1); background: rgba(139,110,90,0.5); }
.video-card__spinner {
  width: 28px; height: 28px; border: 2px solid rgba(255,255,255,0.3);
  border-top-color: var(--color-white); border-radius: var(--radius-full);
  animation: spin 0.8s linear infinite;
}
.video-card__video {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; opacity: 0; pointer-events: none;
  transition: opacity 0.3s ease;
}
.video-card__video--visible { opacity: 1; pointer-events: auto; }

@media (max-width: 480px) { .video-card__play-circle { width: 56px; height: 56px; } }

.videos-dots { display: none; gap: var(--space-2); justify-content: center; margin-top: var(--space-4); }
@media (max-width: 1023px) { .videos-dots { display: flex; } }
.videos-dot {
  width: 6px; height: 6px; border-radius: var(--radius-full);
  background: var(--color-border-strong);
  transition: width var(--duration-base) var(--ease-out), background var(--duration-base) var(--ease-out);
}
.videos-dot--active { width: 20px; background: var(--color-gold); }

/* ══════ PASSOS ══════ */
.steps-section { background: var(--bg-cream); padding: var(--space-24) 0; }
.steps-grid {
  position: relative; display: grid;
  grid-template-columns: repeat(4, 1fr); gap: var(--space-6);
}
.steps-grid::before {
  content: ''; position: absolute; top: 44px; left: 10%; right: 10%;
  height: 1px; background: var(--color-border-strong);
  transform: scaleX(0); transform-origin: left;
  transition: transform 1.2s var(--ease-out);
}
.steps-grid:has(.revealed)::before { transform: scaleX(1); }
.step-card { text-align: center; position: relative; z-index: 1; }
.step-icon {
  width: 88px; height: 88px; margin: 0 auto var(--space-4);
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-full); background: var(--color-white);
  color: var(--color-gold); box-shadow: var(--shadow-md);
  transition: transform var(--duration-base) var(--ease-spring);
}
.step-card:hover .step-icon { transform: scale(1.08); }
.step-title { font-family: var(--font-heading); font-size: var(--text-lg); font-weight: 600; color: var(--color-text-primary); margin-bottom: var(--space-2); }
.step-desc { font-size: var(--text-sm); color: var(--color-text-muted); }

@media (max-width: 767px) {
  .steps-grid { grid-template-columns: 1fr 1fr; }
  .steps-grid::before { display: none; }
}
@media (max-width: 480px) { .steps-grid { grid-template-columns: 1fr; } }

/* ══════ BIO ══════ */
.bio-section { background: var(--gradient-section); padding: var(--space-24) 0; }
.bio-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: var(--space-16); align-items: center; }
.bio-image-wrap { position: relative; }
.bio-image { width: 100%; max-width: 400px; border-radius: var(--radius-xl); box-shadow: var(--shadow-xl); object-fit: cover; }
.bio-text { font-size: var(--text-lg); color: var(--color-text-body); line-height: 1.7; margin-bottom: var(--space-8); }
.bio-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); }
.bio-stat { text-align: center; }
.bio-stat-number { font-family: var(--font-heading); font-size: var(--text-4xl); font-weight: 700; color: var(--color-gold); }
.bio-stat-suffix { font-family: var(--font-heading); font-size: var(--text-2xl); color: var(--color-gold); }
.bio-stat-label { display: block; font-size: var(--text-xs); color: var(--color-text-muted); margin-top: var(--space-1); }

@media (max-width: 767px) {
  .bio-grid { grid-template-columns: 1fr; text-align: center; }
  .bio-image { max-width: 300px; margin: 0 auto; }
  .section-title { text-align: center !important; }
}
```

- [ ] **Step 5: Append Instagram + CTA + Map + FAQ + Footer + float styles**

```css
/* ══════ INSTAGRAM ══════ */
.instagram-section { background: var(--bg-cream); padding: var(--space-24) 0; }
.instagram-header {
  display: flex; align-items: center; justify-content: space-between;
  gap: var(--space-4); margin-bottom: var(--space-8);
  padding: var(--space-4) var(--space-6);
  background: var(--color-card-bg); border: var(--glass-border-warm);
  border-radius: var(--radius-xl); box-shadow: var(--shadow-sm);
}
.instagram-profile { display: flex; align-items: center; gap: var(--space-3); flex: 1; min-width: 0; }
.instagram-avatar-wrap {
  flex-shrink: 0; width: 52px; height: 52px; border-radius: var(--radius-full); padding: 2px;
  background: linear-gradient(135deg, var(--color-gold-light), var(--color-gold-dark), var(--color-brown-light));
}
.instagram-avatar { width: 100%; height: 100%; border-radius: var(--radius-full); border: 2px solid var(--bg-cream); object-fit: cover; }
.instagram-profile-info { display: flex; flex-direction: column; min-width: 0; }
.instagram-handle { font-weight: 600; font-size: var(--text-sm); color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.instagram-name { font-size: var(--text-xs); color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.btn-instagram-follow {
  flex-shrink: 0; padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-full); border: 1.5px solid var(--color-gold);
  color: var(--color-gold-dark); font-weight: 600; font-size: var(--text-sm);
  background: transparent; white-space: nowrap;
  transition: background var(--duration-base) var(--ease-out), color var(--duration-base) var(--ease-out), transform var(--duration-fast) var(--ease-spring);
}
.btn-instagram-follow:hover { background: var(--color-gold); color: var(--color-white); transform: translateY(-1px); }

.ig-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2); border-radius: var(--radius-lg); overflow: hidden; }
@media (max-width: 767px) { .ig-grid { grid-template-columns: repeat(2, 1fr); } }
.ig-post { position: relative; overflow: hidden; aspect-ratio: 1; cursor: pointer; }
.ig-post img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--duration-slow) var(--ease-out); display: block; }
.ig-post__overlay {
  position: absolute; inset: 0; background: rgba(62,42,30,0.35);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-white); opacity: 0; transition: opacity var(--duration-base) var(--ease-out);
}
@media (hover: hover) { .ig-post:hover img { transform: scale(1.05); } .ig-post:hover .ig-post__overlay { opacity: 1; } }

/* ══════ CTA CARD ══════ */
.cta-section { background: var(--bg-ivory); padding: var(--space-24) 0; }
.cta-card {
  position: relative; max-width: 520px; margin: 0 auto;
  background: var(--gradient-aurora); border: 1px solid var(--color-border);
  border-radius: var(--radius-xl); padding: var(--space-12) var(--space-8);
  text-align: center; overflow: hidden;
}
.cta-shimmer {
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, var(--color-gold-light), var(--color-gold), var(--color-gold-light), transparent);
  background-size: 200% 100%; animation: shimmer 4s infinite;
}
.cta-title { font-family: var(--font-heading); font-size: var(--text-3xl); font-weight: 400; color: var(--color-text-primary); margin-bottom: var(--space-8); }
.cta-checklist { display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-8); text-align: left; }
.cta-check-item {
  display: flex; align-items: center; gap: var(--space-3);
  font-size: var(--text-base); color: var(--color-text-body);
}
.cta-check-item svg { color: var(--color-gold); flex-shrink: 0; }
.cta-btn { width: 100%; justify-content: center; }

/* ══════ MAPA ══════ */
.map-section { background: var(--bg-ivory); padding: var(--space-24) 0; }
.map-address { display: flex; align-items: center; gap: var(--space-2); color: var(--color-text-body); margin-bottom: var(--space-6); }
.map-wrapper {
  position: relative; width: 100%; aspect-ratio: 16 / 9;
  border-radius: var(--radius-xl); overflow: hidden;
  box-shadow: var(--shadow-xl); background: var(--bg-warm);
}
.map-iframe { width: 100%; height: 100%; border: none; }
@media (max-width: 767px) { .map-wrapper { aspect-ratio: 4 / 3; } }
@media (max-width: 480px) { .map-wrapper { aspect-ratio: 1; border-radius: var(--radius-lg); } }

/* ══════ FAQ ══════ */
.faq-section { background: var(--bg-cream); padding: var(--space-24) 0; }
.faq-container { max-width: var(--container-narrow); }
.faq-list { display: flex; flex-direction: column; gap: var(--space-3); margin-top: var(--space-12); }
.faq-item {
  background: var(--color-card-bg); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); overflow: hidden;
  transition: border-color var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out);
}
.faq-item--open { border-color: var(--color-border-strong); box-shadow: var(--shadow-md); }
.faq-trigger {
  width: 100%; display: flex; align-items: center; justify-content: space-between;
  gap: var(--space-4); padding: var(--space-5) var(--space-6);
  background: transparent; border: none; text-align: left;
  transition: background var(--duration-fast) var(--ease-out);
}
@media (hover: hover) { .faq-trigger:hover { background: var(--bg-warm); } }
.faq-trigger:focus-visible { outline: 2px solid var(--color-gold); outline-offset: -2px; border-radius: var(--radius-lg); }
.faq-question { font-weight: 600; font-size: var(--text-base); color: var(--color-text-primary); line-height: 1.5; }
.faq-item--open .faq-question { color: var(--color-gold-dark); }
.faq-icon {
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  width: 32px; height: 32px; border-radius: var(--radius-full);
  background: var(--bg-warm); color: var(--color-gold);
  transition: transform var(--duration-base) var(--ease-out), background var(--duration-base) var(--ease-out), color var(--duration-base) var(--ease-out);
}
.faq-item--open .faq-icon { transform: rotate(180deg); background: var(--color-gold); color: var(--color-white); }
.faq-answer { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--duration-slow) var(--ease-out); }
.faq-item--open .faq-answer { grid-template-rows: 1fr; }
.faq-answer-inner { overflow: hidden; padding: 0 var(--space-6) 0 var(--space-6); }
.faq-item--open .faq-answer-inner { padding-bottom: var(--space-5); }
.faq-answer-text { font-size: var(--text-base); color: var(--color-text-body); line-height: 1.7; }
.faq-item--open .faq-trigger { border-bottom: 1px solid var(--color-border); }

@media (max-width: 767px) {
  .faq-section { padding: var(--space-16) 0; }
  .faq-trigger { padding: var(--space-4); }
  .faq-answer-inner { padding: 0 var(--space-4) 0 var(--space-4); }
  .faq-item--open .faq-answer-inner { padding-bottom: var(--space-4); }
  .faq-question { font-size: var(--text-sm); }
}

/* ══════ FOOTER ══════ */
.footer { background: var(--color-text-primary); color: var(--color-white); padding: var(--space-16) 0 var(--space-8); }
.footer-grid { display: grid; grid-template-columns: 1.3fr 1fr 0.8fr 0.8fr; gap: var(--space-8); margin-bottom: var(--space-12); }
.footer-brand img { border-radius: var(--radius-full); margin-bottom: var(--space-4); filter: brightness(1.2); }
.footer-desc { font-size: var(--text-sm); color: rgba(255,255,255,0.7); line-height: 1.6; }
.footer-heading { font-family: var(--font-heading); font-size: var(--text-base); font-weight: 600; margin-bottom: var(--space-4); }
.footer-col { display: flex; flex-direction: column; gap: var(--space-2); }
.footer-link { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: rgba(255,255,255,0.7); transition: color var(--duration-fast); }
.footer-link:hover { color: var(--color-gold-light); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: var(--space-6); text-align: center; }
.footer-bottom p { font-size: var(--text-xs); color: rgba(255,255,255,0.5); }

@media (max-width: 767px) { .footer-grid { grid-template-columns: 1fr; } }

/* ══════ FLOATING ELEMENTS ══════ */
.wa-float {
  position: fixed; bottom: var(--space-6); right: var(--space-6);
  width: 56px; height: 56px; border-radius: var(--radius-full);
  background: var(--color-whatsapp); color: var(--color-white);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(37,211,102,0.3);
  z-index: 9998; transition: transform var(--duration-base) var(--ease-spring);
}
.wa-float:hover { transform: scale(1.1); }
.wa-float__ring {
  position: absolute; inset: -4px; border-radius: var(--radius-full);
  border: 2px solid var(--color-whatsapp); animation: pulseRing 2s infinite;
}

.scroll-top {
  position: fixed; bottom: var(--space-6); left: var(--space-6);
  width: 44px; height: 44px; border-radius: var(--radius-full);
  background: var(--color-white); color: var(--color-text-primary);
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--color-border); box-shadow: var(--shadow-md);
  z-index: 9997; transition: transform var(--duration-fast) var(--ease-spring);
}
.scroll-top:hover { transform: translateY(-2px); }
```

- [ ] **Step 6: Verify complete page renders correctly at localhost:5173**

Check: all sections visible, navbar works, FAQ opens/closes, videos show poster, scroll progress visible.

- [ ] **Step 7: Commit**

```bash
git add src/App.css
git commit -m "feat: add all section styles — navbar, hero, results, procedures, videos, FAQ, footer, floats"
```

---

## Task 6: SEO + index.html

**Files:**
- Modify: `index.html`
- Create: `public/robots.txt`, `public/sitemap.xml`

- [ ] **Step 1: Update `index.html` with meta tags, JSON-LD, scroll reset**

Add to `<head>`:
```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Eugenia Fernandes | Estetica & Makeup em Lisboa</title>
<meta name="description" content="Estetica facial, corporal e maquilhagem profissional em Lisboa. Design de sobrancelha, Radiofrequencia Indiba, Dermaplaning e mais. Agende pelo WhatsApp." />
<link rel="canonical" href="https://eugeniafernandes.pt" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Eugenia Fernandes | Estetica & Makeup" />
<meta property="og:description" content="Tratamentos de estetica e maquilhagem profissional em Lisboa. Resultados visiveis." />
<meta property="og:url" content="https://eugeniafernandes.pt" />
<meta property="og:image" content="https://eugeniafernandes.pt/og-image.jpg" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Eugenia Fernandes Estetica & Makeup",
  "url": "https://eugeniafernandes.pt",
  "telephone": "+351XXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua XXXXX",
    "addressLocality": "Lisboa",
    "addressCountry": "PT"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "50"
  }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto tempo dura cada sessao?",
      "acceptedAnswer": { "@type": "Answer", "text": "A maioria das sessoes dura entre 30 e 60 minutos." }
    },
    {
      "@type": "Question",
      "name": "Os procedimentos sao dolorosos?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nao. Utilizamos tecnicas suaves e equipamentos de ultima geracao." }
    }
  ]
}
</script>

<!-- Scroll Reset (before React) -->
<script>
  if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }
</script>
```

- [ ] **Step 2: Create `public/robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://eugeniafernandes.pt/sitemap.xml
```

- [ ] **Step 3: Create `public/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://eugeniafernandes.pt</loc>
    <lastmod>2026-04-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 4: Commit**

```bash
git add index.html public/robots.txt public/sitemap.xml
git commit -m "feat: add SEO meta tags, JSON-LD structured data, robots.txt, sitemap.xml"
```

---

## Task 7: Build + Final Verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds, output in `dist/`.

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Check at `localhost:4173`:
- All sections render
- Animations fire on scroll
- FAQ single-open works
- Videos show poster + play
- Mobile responsive (resize browser)
- Navbar glass on scroll
- WhatsApp float visible
- Scroll to top works

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: verify production build passes"
```
