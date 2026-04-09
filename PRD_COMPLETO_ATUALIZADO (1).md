# PRD — Template Landing Page de Vendas
**v2.3 — Vídeos mobile alinhados à esquerda + instrução npm run dev**

> Documento de referência para AI construir landing pages de alta conversão.
> Inclui: Design System moderno, Sistema de Animações 2025/2026, Micro-interações, Efeitos Visuais, Componentes e Estrutura.
> Para criar uma nova LP: substituir **Design System** (cores, fontes) + **imagens/conteúdo** + **dados de contato**.

---

## 1. Visão Geral

### Propósito

Landing page de alta conversão para profissionais de saúde, beleza e estética. Otimizada para mobile, SEO e velocidade. Funil: Atenção → Prova Social → Autoridade → Conversão (WhatsApp).

### Stack Técnico

| Tecnologia | Versão | Função |
|---|---|---|
| React | 19.x | Framework UI |
| Preact | 10.x | Alias do React (bundle ~50% menor) |
| Vite | 8.x | Build tool + dev server |
| TypeScript | 5.x | Tipagem |
| Lucide React | 1.x | Biblioteca de ícones |
| CSS Puro | — | Estilos via custom properties (sem Tailwind) |

### Arquitetura

- **SPA** (Single Page Application) — tudo em `src/App.tsx` (~945 linhas)
- **Design Tokens** via CSS custom properties em `src/index.css`
- **Estilos** em `src/App.css` (~2048 linhas)
- **SEO/Structured Data** em `index.html`
- **Build otimizado** com Critical CSS inline via plugin customizado em `vite.config.ts`
- **Preact alias** para bundle menor (configurado em `vite.config.ts`)

### Arquivos Principais

```
src/
├── App.tsx          → Todos os componentes e lógica
├── App.css          → Todos os estilos
├── index.css        → Design tokens + reset CSS
├── main.tsx         → Entry point React
index.html           → SEO, meta tags, structured data JSON-LD
vite.config.ts       → Build config, critical CSS plugin, Preact alias
package.json         → Dependências
public/
├── videos/          → Arquivos .mp4 9:16
├── instagram/       → ig-1.webp até ig-6.webp (400×400)
└── ...              → logo, hero, before/after, bio, favicons
```

### Iniciar o Projeto — Dev Server

**⚠️ Obrigatório:** Conectar ao projeto e rodar o servidor de desenvolvimento antes de qualquer alteração ou preview. Se o usuário não especificar a pasta, perguntar antes de prosseguir.

```bash
# 1. Entrar na pasta indicada pelo usuário
cd /caminho/indicado/pelo/usuario

# 2. Instalar dependências (apenas na primeira vez ou após mudar package.json)
npm install

# 3. Subir o servidor de desenvolvimento
npm run dev
```

**Saída esperada:**
```
  VITE v8.x.x  ready in XXXms
  ➜  Local:   http://localhost:5173/
```

**Regras:**
- Porta padrão: `5173` — se ocupada, Vite tenta 5174, 5175 automaticamente
- HMR ativo: salvar qualquer arquivo atualiza a página sem reload manual
- Para encerrar: `Ctrl + C`
- Se falhar: verificar se `node_modules` existe — se não, rodar `npm install` primeiro

---

## 2. Ordenação das Seções (Fluxo de Conversão)

```
PRELOADER (2s)
    ↓
NAVBAR (fixo, acompanha scroll)
    ↓
HERO ← Primeira impressão: proposta de valor + CTA + credibilidade (badge Google)
    ↓
RESULTADOS ← Prova visual: galeria de transformações (before/after)
    ↓
PROCEDIMENTOS ← Amplitude: mostra todos os tratamentos disponíveis
    ↓
DEPOIMENTOS ← Prova social: reviews reais do Google
    ↓
VÍDEOS DE ATENDIMENTO ← Prova de experiência: vídeos 9:16 do consultório
    ↓
PASSOS ← Simplificação: mostra que agendar é fácil (4 passos)
    ↓
BIO ← Autoridade: quem é o profissional + stats numéricos
    ↓
INSTAGRAM ← Presença social: posts do feed
    ↓
CARD CTA ← Conversão final: checklist + botão WhatsApp
    ↓
MAPA ← Localização: Google Maps embed
    ↓
FAQ ← Quebra de objeções: perguntas frequentes
    ↓
FOOTER ← Contato, links, social
    ↓
WHATSAPP FLOAT (fixo, sempre visível)
SCROLL TO TOP (fixo, aparece após 400px)
```

---

## 3. Design System

### 3.1 Paleta de Cores

```css
:root {
  /* ── Primary (trocar para cada marca) ── */
  --color-gold: #B8956B;
  --color-gold-light: #D4BC94;
  --color-gold-dark: #9A7B56;

  /* ── Secondary (complementar) ── */
  --color-rose: #C9A9A6;
  --color-rose-light: #E2D0CE;
  --color-rose-dark: #A88B88;

  /* ── Neutrals ── */
  --color-black: #1A1A1A;
  --color-text-primary: #2D2926;
  --color-text-body: #5C5856;
  --color-text-muted: #767069;
  --color-white: #FFFFFF;

  /* ── Backgrounds ── */
  --bg-ivory: #FDFBF8;
  --bg-cream: #F8F5F0;
  --bg-warm: #F3EDE5;
  --bg-warm-deep: #EBE3D8;

  /* ── Functional ── */
  --color-whatsapp: #25D366;
  --color-card-bg: rgba(255, 255, 255, 0.85);
  --color-border: rgba(184, 149, 107, 0.15);       /* ⚠️ Ajustar RGB pra cor primária */
  --color-border-strong: rgba(184, 149, 107, 0.3);  /* ⚠️ Ajustar RGB pra cor primária */
}
```

### 3.2 Gradientes e Efeitos de Fundo

```css
:root {
  --gradient-gold: linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 50%, var(--color-gold-dark) 100%);
  --gradient-hero: linear-gradient(160deg, var(--bg-ivory) 0%, var(--bg-cream) 40%, var(--bg-warm) 100%);
  --gradient-section: linear-gradient(180deg, var(--bg-ivory) 0%, var(--bg-cream) 100%);

  --mesh-hero: radial-gradient(ellipse at 20% 50%, rgba(184,149,107,0.08) 0%, transparent 50%),
               radial-gradient(ellipse at 80% 20%, rgba(201,169,166,0.06) 0%, transparent 50%),
               radial-gradient(ellipse at 50% 100%, rgba(212,188,148,0.05) 0%, transparent 40%),
               var(--gradient-hero);

  --gradient-aurora: linear-gradient(
    135deg,
    rgba(184,149,107,0.05) 0%,
    rgba(201,169,166,0.08) 25%,
    rgba(212,188,148,0.05) 50%,
    rgba(168,139,136,0.06) 75%,
    rgba(184,149,107,0.04) 100%
  );
}
```

### 3.3 Glassmorphism System

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.65);
  --glass-bg-strong: rgba(255, 255, 255, 0.85);
  --glass-bg-subtle: rgba(255, 255, 255, 0.35);
  --glass-bg-dark: rgba(45, 41, 38, 0.60);
  --glass-blur: blur(16px);
  --glass-blur-light: blur(8px);
  --glass-blur-heavy: blur(24px);
  --glass-border: 1px solid rgba(255, 255, 255, 0.18);
  --glass-border-warm: 1px solid rgba(184, 149, 107, 0.15);
  --glass-shadow: 0 8px 32px rgba(45, 41, 38, 0.08);
}

.glass        { background: var(--glass-bg); backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur); border: var(--glass-border); box-shadow: var(--glass-shadow); }
.glass--subtle { background: var(--glass-bg-subtle); backdrop-filter: var(--glass-blur-light); -webkit-backdrop-filter: var(--glass-blur-light); }
.glass--strong { background: var(--glass-bg-strong); backdrop-filter: var(--glass-blur-heavy); -webkit-backdrop-filter: var(--glass-blur-heavy); }
```

**Regras:** Navbar = `glass--strong`, cards flutuantes = `glass`, botão play = `glass--subtle`. Nunca usar sobre fundo branco sólido.

### 3.4 Tipografia

```css
:root {
  --font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  --text-xs: 0.75rem; --text-sm: 0.875rem; --text-base: 1rem;
  --text-lg: 1.125rem; --text-xl: 1.25rem; --text-2xl: 1.5rem;
  --text-3xl: 1.875rem; --text-4xl: 2.25rem; --text-5xl: 3rem; --text-6xl: 3.75rem;
}
```

### 3.5 Espaçamento (Grid 8px)

```css
:root {
  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem;
  --space-4: 1rem; --space-5: 1.25rem; --space-6: 1.5rem;
  --space-8: 2rem; --space-10: 2.5rem; --space-12: 3rem;
  --space-16: 4rem; --space-20: 5rem; --space-24: 6rem; --space-32: 8rem;
}
```

### 3.6 Radius, Shadows, Transitions

```css
:root {
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px;
  --radius-xl: 24px; --radius-full: 9999px;

  --shadow-sm:   0 1px 3px rgba(45,41,38,0.04), 0 1px 2px rgba(45,41,38,0.02);
  --shadow-md:   0 4px 16px rgba(45,41,38,0.06), 0 1px 4px rgba(45,41,38,0.03);
  --shadow-lg:   0 12px 40px rgba(45,41,38,0.08), 0 4px 12px rgba(45,41,38,0.04);
  --shadow-xl:   0 20px 60px rgba(45,41,38,0.1), 0 8px 20px rgba(45,41,38,0.05);
  --shadow-gold: 0 8px 32px rgba(184,149,107,0.15);
  --shadow-glow: 0 0 20px rgba(184,149,107,0.20), 0 0 60px rgba(184,149,107,0.08);

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  --duration-fast: 150ms; --duration-base: 250ms;
  --duration-slow: 400ms; --duration-reveal: 800ms;

  --container-max: 1200px; --container-narrow: 800px; --navbar-height: 72px;
}
```

### 3.7 Breakpoints e Responsividade

| Nome | Query CSS | Dispositivos |
|---|---|---|
| **Desktop Large** | `≥ 1440px` | Monitores grandes |
| **Desktop** | `≥ 1280px` | Desktop padrão, laptops |
| **Tablet Landscape** | `≥ 1024px` | Tablets landscape |
| **Tablet Portrait** | `≥ 768px` | Tablets portrait |
| **Mobile** | `< 768px` | Smartphones |
| **Small Mobile** | `≤ 480px` | Smartphones pequenos |

**Breakpoint principal:** `768px` — muda de layout multi-coluna para coluna única.

---

## 4. Sistema de Animações e Micro-interações

### 4.1 Filosofia

**Princípio:** Animação funcional > decorativa. Cada movimento deve guiar, confirmar ou clarificar.

- CSS `animation-timeline: view()` onde suportado (Chrome 115+), fallback IntersectionObserver
- Micro-interações táteis — botões com press/bounce
- Reveal contextual — stagger com timing natural
- Ambient motion — shimmer, float, pulse sutis

### 4.2 Scroll Reveal — Sistema Completo

Todos os elementos abaixo do hero começam invisíveis e animam **uma única vez** quando entram no viewport. Observer desconecta após reveal.

#### Classes CSS

```css
.reveal {
  opacity: 0;
  transition: opacity var(--duration-reveal) var(--ease-out),
              transform var(--duration-reveal) var(--ease-out);
  will-change: opacity, transform;
}

.reveal--up    { transform: translateY(18px); }
.reveal--left  { transform: translateX(-24px); }
.reveal--right { transform: translateX(24px); }
.reveal--scale { transform: scale(0.96); }

.revealed {
  opacity: 1 !important;
  transform: none !important;
}

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; will-change: auto; }
}
```

#### IntersectionObserver Global

```javascript
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
```

#### Stagger por Seção

| Seção | Delay entre items | Total no último |
|---|---|---|
| SectionHeader | 80ms | 160ms |
| Resultados (3 cards) | 70ms | 140ms |
| Procedimentos (6 cards) | 70ms | 350ms |
| Depoimentos (4 cards) | 70ms | 210ms |
| Vídeos (3 cards) | 80ms | 160ms |
| Passos (4 cards) | 100ms | 300ms |
| Bio stats (3 blocos) | 70ms | 140ms |
| Instagram (6 posts) | 50ms | 250ms |
| CTA checklist (5 items) | 60ms | 240ms |
| FAQ (9 itens) | 40ms | 320ms |

#### SectionHeader — Stagger Padrão

```tsx
function SectionHeader({ label, title, subtitle }) {
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
```

### 4.3 Micro-interações

#### Botões — Press Effect (Tátil)

```css
.btn-cta {
  transition: transform var(--duration-fast) var(--ease-spring),
              box-shadow var(--duration-base) var(--ease-out),
              background var(--duration-base) var(--ease-out);
}
.btn-cta:hover  { transform: translateY(-2px); box-shadow: var(--shadow-glow); }
.btn-cta:active { transform: translateY(1px) scale(0.98); box-shadow: var(--shadow-sm); transition-duration: 80ms; }
```

#### Cards — Lift + Tilt (Mouse-Tracking)

```css
.procedure-card {
  transition: transform var(--duration-base) var(--ease-out),
              box-shadow var(--duration-base) var(--ease-out);
}
.procedure-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
```

```javascript
// Tilt sutil seguindo mouse (desktop only, rotação máx 3°)
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  card.style.transform = `translateY(-6px) perspective(800px) rotateX(${y*-3}deg) rotateY(${x*3}deg)`
})
card.addEventListener('mouseleave', () => card.style.transform = '')
```

#### FAQ — Grid Animation

```css
.faq-answer { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--duration-slow) var(--ease-out); }
.faq-item--open .faq-answer { grid-template-rows: 1fr; }
.faq-answer > div { overflow: hidden; }
```

#### Scroll Progress Bar

```css
.scroll-progress {
  position: fixed; top: 0; left: 0; height: 3px;
  background: var(--gradient-gold); transform-origin: left; z-index: 99999;
  animation: scaleProgress linear; animation-timeline: scroll(root);
}
@keyframes scaleProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
```

#### Number Counter (Bio Stats)

```javascript
function animateCounter(el, target, duration = 2000) {
  const start = performance.now()
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - (1 - progress) ** 2
    el.textContent = Math.round(eased * target)
    if (progress < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}
```

#### Magnetic Cursor (WhatsApp Float — Desktop)

```javascript
document.addEventListener('mousemove', (e) => {
  const rect = wa.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
  if (dist < 150) {
    const pull = 1 - (dist / 150)
    wa.style.transform = `translate(${(e.clientX - cx) * pull * 0.15}px, ${(e.clientY - cy) * pull * 0.15}px) scale(${1 + pull * 0.08})`
  } else {
    wa.style.transform = ''
  }
})
```

### 4.4 Hero Keyframes (Load)

| Elemento | Keyframe | Delay |
|---|---|---|
| Brand | fadeSlideDown | 0.2s |
| H1 | fadeSlideUp | 0.4s |
| Subtítulo | fadeIn | 0.7s |
| CTA | fadeSlideUp | 0.9s |
| Badge | fadeSlideUp | 1.1s |
| Foto | fadeSlideLeft (desktop) / fadeSlideUp (mobile) | 0.5s |
| Scroll indicator | bounce (loop) | — |

### 4.5 Animações Permanentes

| Elemento | Animação | Duração |
|---|---|---|
| Preloader logo | breathing (opacity + scale pulse) | 2s |
| CTA bar | shimmer (gradient slide) | 4s |
| WhatsApp float | pulseRing (anel expansivo) | 2s |
| Scroll indicator | bounce (8px vertical) | 2s |

### 4.6 Keyframes

```css
@keyframes fadeIn          { to { opacity: 1 } }
@keyframes fadeSlideUp     { to { opacity: 1; transform: translateY(0) } }
@keyframes fadeSlideDown   { to { opacity: 1; transform: translateY(0) } }
@keyframes fadeSlideLeft   { to { opacity: 1; transform: translateX(0) } }
@keyframes shimmer         { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
@keyframes pulseRing       { 0% { transform: scale(1); opacity: 0.6 } 100% { transform: scale(2.2); opacity: 0 } }
@keyframes bounce          { 0%,100% { transform: translateY(0) } 50% { transform: translateY(8px) } }
@keyframes breathing       { 0%,100% { opacity: 0.7; transform: scale(0.98) } 50% { opacity: 1; transform: scale(1.02) } }
```

### 4.7 Mapa de Animações por Seção

| Seção | Elemento | Tipo | Detalhes |
|---|---|---|---|
| Hero | Conteúdo | keyframe | Ver 4.4 |
| Resultados | Cards | reveal--scale | stagger 70ms |
| Procedimentos | Cards (6) | reveal--up | stagger 70ms, tilt hover |
| Depoimentos | Cards (4) | reveal--up | stagger 70ms |
| Vídeos | Cards (3) | reveal--up | stagger 80ms |
| Passos | Cards (4) | reveal--up | stagger 100ms |
| Passos | Linha | CSS :has() | scaleX 0→1, 1.2s |
| Bio | Imagem | reveal--left | — |
| Bio | Conteúdo | reveal--right | 100ms delay |
| Bio | Stats | reveal--scale | stagger 70ms, counter |
| Instagram | Posts (6) | reveal--scale | stagger 50ms |
| CTA | Card | reveal--scale | shimmer bar |
| CTA | Checklist | reveal--up | stagger 60ms |
| FAQ | Items (9) | reveal--up | stagger 40ms |
| Todos | Headers | reveal--up | stagger 80ms |

### 4.8 Entrada Timeline

```
t=0.0s → Preloader (breathing)
t=2.0s → Fade-out, observers criados, WA float aparece
t=2.2s → Brand fadeSlideDown
t=2.4s → H1 fadeSlideUp
t=2.5s → Foto fadeSlideLeft (desktop) / fadeSlideUp (mobile, após H1)
t=2.7s → Sub fadeIn + CTA fadeSlideUp
t=3.0s → Badge fadeSlideUp
t=???  → Scroll → reveals ativam (uma vez cada)
```

---

## 5. Estrutura de Seções

### 5.1 Preloader

Fixed fullscreen z-99999. Logo .webp 48px, animation `breathing`. Fade-out após load ou máximo 3s.

#### Scroll to Top no Carregamento — Obrigatório

**Regra:** Ao carregar a página, o scroll deve sempre começar no topo — sem exceção. Isso evita que o browser restaure a posição de scroll anterior (comportamento padrão em SPAs e alguns browsers mobile).

**Implementação — 3 camadas de garantia:**

```html
<!-- index.html — antes de qualquer script -->
<script>
  // Executa ANTES do React montar — garante posição antes do primeiro render
  if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }
</script>
```

```tsx
// main.tsx — no entry point do React
window.history.scrollRestoration = 'manual'
window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
```

```tsx
// App.tsx — useEffect no componente raiz (camada de segurança final)
useEffect(() => {
  // 'instant' garante que não há animação de scroll — vai direto pro topo
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  // Também desativa a restauração automática de scroll do browser
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }
}, []) // array vazio = roda apenas na montagem inicial
```

**Por que 3 camadas:**
- O script inline no HTML roda antes do React — cobre o flash inicial
- O `main.tsx` cobre o momento do hydration
- O `useEffect` no `App` cobre SPAs com roteamento e edge cases mobile

**`behavior: 'instant'`** — não usar `smooth` aqui. Scroll suave no carregamento cria um efeito estranho de "câmera descendo". O topo deve aparecer instantaneamente.

**`history.scrollRestoration = 'manual'`** — desativa o comportamento padrão do browser de restaurar a posição de scroll ao voltar/avançar no histórico. Sem isso, ao voltar de outra página, o browser tenta restaurar o scroll e o usuário não vê o topo.

### 5.2 Navbar

Fixed top z-9999. 72px desktop / 64px mobile. Transparente → `glass--strong` on scroll >100px. Desktop: logo + 4 links + CTA. Mobile: hamburger → menu lateral 300px slide-in com overlay blur.

---

### 5.3 Hero ★ ESPECIFICAÇÃO DETALHADA

`#hero`. `min-height: 100vh` (`100dvh`). Background: `var(--mesh-hero)`.

**Regra geral:** Texto e elementos à esquerda, imagem à direita — sempre. Isso é invariável no desktop.

#### Layout Desktop (≥768px) — Grid `1.1fr 0.9fr`

```
┌──────────────────────────┬──────────────────────────┐
│                          │                          │
│  ▏ BRAND TEXT (barra     │                          │
│    gold à esquerda)      │                          │
│                          │    ┌──────────────────┐  │
│  H1 Título Principal     │    │                  │  │
│  com <em> itálico/gold   │    │   FOTO / IMAGEM  │  │
│                          │    │   hero.webp      │  │
│  Subtítulo / descrição   │    │   max 460px      │  │
│  do serviço              │    │   radius-xl      │  │
│                          │    │   shadow-xl      │  │
│  [BOTÃO CTA PRINCIPAL]   │    │                  │  │
│  [Badge Google 5★ glass] │    └──────────────────┘  │
│                          │                          │
│  ↓ (scroll indicator     │                          │
│     bounce — só desktop) │                          │
└──────────────────────────┴──────────────────────────┘
```

**Regras desktop:**
- Coluna esquerda: brand text, H1, subtítulo, botão CTA, badge Google — empilhados, alinhados à esquerda
- Coluna direita: foto centralizada verticalmente, ocupa toda a altura do grid
- A foto nunca fica acima nem abaixo do texto — fica **ao lado**
- `align-items: center` no grid para alinhamento vertical
- Scroll indicator (↓ bounce) aparece abaixo do badge, apenas em desktop

```css
.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: var(--space-16);
  align-items: center;
  min-height: calc(100vh - var(--navbar-height));
  padding: var(--space-24) 0;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-6);
}

.hero-image-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  width: 100%;
  max-width: 460px;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  object-fit: cover;
}
```

#### Layout Mobile (<768px) — 1 Coluna — Ordem Obrigatória

```
┌──────────────────────────┐
│   ▏ BRAND TEXT           │  ← 1. Brand + H1 (texto)
│   H1 Título Principal    │
│                          │
│     ┌──────────────┐     │
│     │              │     │
│     │   FOTO       │     │  ← 2. IMAGEM (entre título e subtítulo)
│     │   260px max  │     │
│     │   radius-xl  │     │
│     │              │     │
│     └──────────────┘     │
│                          │
│   Subtítulo / descrição  │  ← 3. Subtítulo + CTA + Badge
│   [BOTÃO CTA PRINCIPAL]  │
│   [Badge Google 5★]      │
└──────────────────────────┘
```

**Ordem mobile obrigatória (nunca alterar):**
1. Brand text + H1 (título)
2. **FOTO** (centralizada, max-width 260px, border-radius 24px, box-shadow-lg)
3. Subtítulo + CTA + Badge Google

**Por que essa ordem converte:** Título captura atenção → foto humaniza/conecta → CTA converte.

**Implementação React — ordem mobile via CSS order:**

```tsx
// JSX — hero-image fica após hero-content no DOM
<section className="hero">
  <div className="hero-grid">
    <div className="hero-content">
      <span className="hero-brand">...</span>
      <h1 className="hero-title">...</h1>
      {/* Mobile: foto aparece AQUI via CSS order */}
      <div className="hero-image-mobile-slot">
        <img className="hero-image" ... />
      </div>
      <p className="hero-subtitle">...</p>
      <a className="btn-cta" href={WHATSAPP_LINK}>...</a>
      <div className="hero-badge glass">...</div>
    </div>
    <div className="hero-image-desktop">
      <img className="hero-image" ... />
    </div>
  </div>
</section>
```

```css
/* Desktop: imagem no slot direito, ocultar slot mobile */
@media (min-width: 768px) {
  .hero-image-mobile-slot { display: none; }
  .hero-image-desktop { display: flex; align-items: center; justify-content: center; }
}

/* Mobile: ocultar coluna direita, mostrar slot interno */
@media (max-width: 767px) {
  .hero-grid { grid-template-columns: 1fr; gap: var(--space-6); }
  .hero-image-desktop { display: none; }
  .hero-image-mobile-slot {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: var(--space-4) 0;
  }
  .hero-image-mobile-slot .hero-image {
    max-width: 260px;
    width: 100%;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
  }
}
```

#### Animações de Entrada do Hero (após preloader 2s)

```css
/* Estado inicial — todos os elementos começam invisíveis */
.hero-brand    { opacity: 0; transform: translateY(-12px); animation: fadeSlideDown 0.6s var(--ease-out) 0.2s forwards; }
.hero-title    { opacity: 0; transform: translateY(16px);  animation: fadeSlideUp  0.7s var(--ease-out) 0.4s forwards; }
.hero-image    { opacity: 0; transform: translateX(20px);  animation: fadeSlideLeft 0.8s var(--ease-out) 0.5s forwards; } /* desktop */
/* mobile: imagem usa fadeSlideUp com delay 0.5s */
.hero-subtitle { opacity: 0; animation: fadeIn 0.6s var(--ease-out) 0.7s forwards; }
.btn-cta       { opacity: 0; transform: translateY(12px);  animation: fadeSlideUp  0.6s var(--ease-spring) 0.9s forwards; }
.hero-badge    { opacity: 0; transform: translateY(12px);  animation: fadeSlideUp  0.5s var(--ease-out) 1.1s forwards; }
.scroll-indicator { opacity: 0; animation: fadeIn 0.5s ease 1.3s forwards, bounce 2s ease-in-out 1.8s infinite; }

/* Mobile: fadeSlideLeft não faz sentido para imagem em coluna — usar fadeSlideUp */
@media (max-width: 767px) {
  .hero-image { transform: translateY(16px); animation: fadeSlideUp 0.7s var(--ease-out) 0.5s forwards; }
  .scroll-indicator { display: none; } /* sem scroll indicator no mobile */
}
```

#### Elementos do Hero

- **Brand text:** pequena string acima do H1, com barra vertical gold à esquerda (`border-left: 3px solid var(--color-gold)`)
- **H1:** `font-family: var(--font-heading)`, palavra-chave principal em `<em>` com `color: var(--color-gold)` e `font-style: italic`
- **Badge Google:** card glass com logo Google, "5.0 ★★★★★", quantidade de reviews — `backdrop-filter: blur(12px)`, border-radius-full
- **CTA Button:** gradient gold, sombra `--shadow-gold`, press effect tátil, ícone WhatsApp à esquerda

---

### 5.4 Resultados

`#resultados`. `var(--gradient-section)`. Grid 3 colunas → 1 mobile. BeforeAfterSlider: 1:1, clip-path, handle 40px, drag mouse+touch. Cards com `reveal--scale`, stagger 70ms.

### 5.5 Procedimentos

`#procedimentos`. Grid 3→2→1 colunas. Cards: ícone 56px, título, desc. Hover: lift -6px + shadow-lg + tilt + ícone rotate -5° scale 1.1x. `reveal--up`, stagger 70ms.

### 5.6 Depoimentos

`#depoimentos`. Scroll snap horizontal, autoplay 4s, drag, dots. Desktop 1280px+: grid 2x2. Card: glass, aspas decorativas, 5 estrelas. `reveal--up`, stagger 70ms.

---

### 5.7 Vídeos de Atendimento ★ ESPECIFICAÇÃO DETALHADA

`#atendimento-videos`. Background: `var(--bg-cream)`.

**Conteúdo:** 2–3 vídeos `.mp4`, aspect ratio 9:16 (vertical, estilo Reels/Stories).  
**Arquivos:** `public/videos/video-1.mp4`, `video-2.mp4`, `video-3.mp4`.

---

#### Layout Desktop (≥1024px) — Grid Centralizado, Sem Scroll

```
           [ Label: "Experiência" ]
           [ H2: "Nosso Atendimento" ]
           [ Subtítulo ]

     ┌──────────┐   ┌──────────┐   ┌──────────┐
     │          │   │          │   │          │
     │ [CAPA]   │   │ [CAPA]   │   │ [CAPA]   │
     │          │   │          │   │          │
     │   [▶]    │   │   [▶]    │   │   [▶]    │
     │          │   │          │   │          │
     └──────────┘   └──────────┘   └──────────┘
      VIDEO 1         VIDEO 2         VIDEO 3
```

**Regras desktop:**
- Grid de 3 colunas (2 se houver 2 vídeos), centralizado com `justify-content: center`
- Cada card tem largura fixa conforme breakpoint (ver tabela abaixo)
- Sem scroll horizontal — todos os cards visíveis simultaneamente
- Cards alinhados verticalmente no centro da seção

```css
/* Desktop grid centrado */
@media (min-width: 1024px) {
  .videos-grid {
    display: grid;
    grid-template-columns: repeat(3, var(--video-card-width));
    gap: var(--space-6);
    justify-content: center;
    align-items: start;
  }
}

/* Larguras por breakpoint */
@media (min-width: 1024px) { :root { --video-card-width: 260px; } }
@media (min-width: 1280px) { :root { --video-card-width: 280px; } }
@media (min-width: 1440px) { :root { --video-card-width: 320px; } }
```

---

#### Layout Mobile (<768px) — 1 Card Grande + Scroll Horizontal

```
  ┌────────────────────────┐
  │                        │
  │   [CAPA DO VÍDEO]      │  ← VIDEO 1 visível (~85vw da tela)
  │   frame fixo do mp4    │
  │                        │
  │         [▶]            │  ← botão play centralizado, 56px
  │                        │
  └────────────────────────┘
              ● ○ ○              ← dots indicadores
       ← arrastar pra mais →
```

**Regras mobile — obrigatórias:**
- O primeiro vídeo ocupa **~85% da largura da tela** — é o que o usuário vê ao entrar na seção
- Os vídeos 2 e 3 ficam **fora da tela**, acessíveis via scroll horizontal
- O bloco de vídeos começa **encostado na borda esquerda da tela** — sem centralização
- `scroll-snap-type: x mandatory` + `scroll-snap-align: start` em cada card
- O primeiro card já aparece colado à esquerda — o usuário arrasta pra direita pra ver os próximos
- **Nunca mostrar 3 thumbnails pequenos lado a lado no mobile**
- **Nunca centralizar o bloco no mobile** — o alinhamento à esquerda é intencional e sinaliza que há mais conteúdo fora da tela

```
  ┌─── borda esq. da tela
  │
  ┌────────────────────────┐
  │   [CAPA DO VÍDEO 1]    │  ← colado na esquerda, ocupa ~85vw
  │                        │
  │         [▶]            │
  │                        │
  └────────────────────────┘  ┌── (vídeo 2 cortado, dica de scroll →)
                               │...
```

```css
/* Container mobile — scroll horizontal, alinhado à esquerda */
@media (max-width: 767px) {
  .videos-section .container {
    padding-right: 0; /* remove padding direito — vídeos se estendem até a borda */
  }

  .videos-grid {
    display: flex;
    flex-direction: row;
    gap: var(--space-4);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    /* Alinhado à esquerda — sem margin/padding que centralize */
    padding-left: var(--space-4);  /* respiro mínimo da borda esquerda */
    padding-right: var(--space-4); /* espaço final após o último card */
    margin-left: 0;
    margin-right: 0;

    scrollbar-width: none;
  }
  .videos-grid::-webkit-scrollbar { display: none; }

  .video-card {
    flex: 0 0 85vw;
    max-width: 340px;
    scroll-snap-align: start; /* ← snap na borda esquerda, não no centro */
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .video-card { flex: 0 0 85vw; max-width: 300px; }
  .video-card__play-circle { width: 56px; height: 56px; }
}
```

**Por que `scroll-snap-align: start` e não `center`:**
- Com `center`, o browser tenta centralizar o card na viewport — o primeiro card ficaria com margem à esquerda, desalinhado do restante do conteúdo da página
- Com `start`, cada card encosta na borda esquerda ao fazer snap — o primeiro card alinha naturalmente com o texto acima
- O vídeo 2 cortado à direita indica visualmente que há mais conteúdo para arrastar

---

#### Dots Indicadores (Mobile)

```tsx
// State para controlar dot ativo
const [activeVideo, setActiveVideo] = useState(0)

// IntersectionObserver para detectar qual card está visível
useEffect(() => {
  const cards = containerRef.current?.querySelectorAll('.video-card')
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
}, [])

// Renderização dos dots
<div className="videos-dots" aria-hidden="true">
  {VIDEOS_ATENDIMENTO.map((_, i) => (
    <span
      key={i}
      className={`videos-dot ${i === activeVideo ? 'videos-dot--active' : ''}`}
    />
  ))}
</div>
```

```css
.videos-dots {
  display: none; /* oculto no desktop */
  gap: var(--space-2);
  justify-content: center;
  margin-top: var(--space-4);
}

@media (max-width: 767px) {
  .videos-dots { display: flex; }
}

.videos-dot {
  width: 6px; height: 6px;
  border-radius: var(--radius-full);
  background: var(--color-border-strong);
  transition: width var(--duration-base) var(--ease-out),
              background var(--duration-base) var(--ease-out);
}
.videos-dot--active {
  width: 20px; /* dot ativo se alonga */
  background: var(--color-gold);
}
```

---

#### VideoCard — 3 Estados + Poster Automático via Canvas

**Estado IDLE → LOADING → PLAYING:**

```
  ┌──────────┐  clique   ┌───────────┐  play()   ┌───────────┐
  │  IDLE    │ ────────→ │  LOADING  │ ────────→ │  PLAYING  │
  │  [capa]  │           │  [capa]   │           │  <video>  │
  │  [▶ 72px]│           │  [⟳ spin] │           │  controls │
  └──────────┘           └───────────┘           └───────────┘
       ↑                       │                       │
       └───────────────────────┴─── pausa / ended ─────┘
```

**IDLE:**
- Exibe poster (imagem gerada automaticamente do frame do vídeo)
- Botão play centralizado com glass-morphism (72px desktop, 56px small mobile)
- Cursor `pointer` na área do card

**LOADING:**
- Poster permanece visível (não pisca)
- Ícone do botão play substituído por spinner CSS (circle com border animado)
- Sem mudança de layout

**PLAYING:**
- Poster e botão play somem com `opacity: 0` + `pointer-events: none`
- `<video>` aparece com `controls` nativos do browser (inclui volume/mute)
- O vídeo **não usa `muted`** — reproduz com áudio
- Transition suave: `opacity 0.3s ease`

---

#### Poster Automático — Frame Fixo do Vídeo via Canvas

**Objetivo:** Ao carregar a página, cada vídeo exibe automaticamente um frame fixo extraído do próprio arquivo `.mp4` como capa (sem imagem externa).

```tsx
function useVideoPoster(src: string, posterTime = 0.5) {
  const [poster, setPoster] = useState<string>('')

  useEffect(() => {
    // Vídeo offscreen para gerar frame — sempre muted e sem autoplay
    const video = document.createElement('video')
    video.muted = true
    video.playsInline = true
    video.crossOrigin = 'anonymous'
    video.preload = 'metadata'

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    video.addEventListener('loadeddata', () => {
      video.currentTime = posterTime // seek para o frame desejado (default: 0.5s)
    })

    video.addEventListener('seeked', () => {
      // Capturar dimensões reais do vídeo
      canvas.width  = video.videoWidth  || 720
      canvas.height = video.videoHeight || 1280

      // Desenhar frame no canvas e exportar como JPEG 80%
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
      const dataURL = canvas.toDataURL('image/jpeg', 0.8)
      setPoster(dataURL)

      // Cleanup — remover listeners, parar vídeo, liberar memória
      video.pause()
      video.src = ''
      video.load()
    })

    video.src = src
    video.load()

    return () => {
      video.pause()
      video.src = ''
    }
  }, [src, posterTime])

  return poster
}
```

**Renderização do VideoCard:**

```tsx
function VideoCard({ src, title, posterTime = 0.5 }) {
  const poster = useVideoPoster(src, posterTime)
  const [state, setState] = useState<'idle' | 'loading' | 'playing'>('idle')
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = async () => {
    setState('loading')
    try {
      const vid = videoRef.current
      if (!vid) return
      vid.muted = false    // ⚠️ NUNCA muted — tocar com áudio
      await vid.play()
      setState('playing')
    } catch {
      setState('idle')     // fallback se autoplay bloqueado
    }
  }

  return (
    <div className={`video-card video-card--${state} reveal reveal--up`}>
      {/* Poster — frame fixo do vídeo */}
      {poster && state !== 'playing' && (
        <img
          className="video-card__poster"
          src={poster}
          alt={title}
          draggable={false}
        />
      )}

      {/* Overlay com botão play — só no estado IDLE e LOADING */}
      {state !== 'playing' && (
        <button
          className="video-card__play"
          onClick={handlePlay}
          aria-label={`Reproduzir vídeo: ${title}`}
        >
          <span className="video-card__play-circle">
            {state === 'idle'    && <PlayIcon size={28} />}
            {state === 'loading' && <span className="video-card__spinner" />}
          </span>
        </button>
      )}

      {/* Vídeo nativo — sempre no DOM, visível apenas no estado PLAYING */}
      <video
        ref={videoRef}
        className={`video-card__video ${state === 'playing' ? 'video-card__video--visible' : ''}`}
        src={src}
        playsInline
        controls={state === 'playing'}
        preload="none"  /* lazy — não carrega até clicar */
      />
    </div>
  )
}
```

---

#### CSS do VideoCard

```css
.video-card {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-black);
  aspect-ratio: 9 / 16;
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: transform var(--duration-base) var(--ease-out),
              box-shadow var(--duration-base) var(--ease-out);
}

/* Hover lift (desktop only) */
@media (hover: hover) {
  .video-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-xl); }
}

/* Poster — cobre todo o card */
.video-card__poster {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: opacity var(--duration-base) var(--ease-out);
}

/* Overlay escuro sobre o poster para o botão se destacar */
.video-card::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(
    to top,
    rgba(45, 41, 38, 0.4) 0%,
    transparent 50%,
    transparent 100%
  );
  z-index: 1;
  pointer-events: none;
}

/* Botão play centralizado */
.video-card__play {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: transparent; border: none; cursor: pointer;
  z-index: 2;
}

/* Círculo glassmorphism do play */
.video-card__play-circle {
  width: 72px; height: 72px;
  border-radius: var(--radius-full);
  background: rgba(201, 169, 166, 0.35);   /* secondary color — ajustar por marca */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-white);
  transition: transform var(--duration-base) var(--ease-spring),
              background var(--duration-base) var(--ease-out);
}

.video-card__play:hover .video-card__play-circle {
  transform: scale(1.1);
  background: rgba(201, 169, 166, 0.5);
}

/* Spinner de loading */
.video-card__spinner {
  width: 28px; height: 28px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: var(--color-white);
  border-radius: var(--radius-full);
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Vídeo nativo — oculto até PLAYING */
.video-card__video {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.video-card__video--visible {
  opacity: 1;
  pointer-events: auto;
}

/* Small mobile — botão play menor */
@media (max-width: 480px) {
  .video-card__play-circle { width: 56px; height: 56px; }
}
```

---

#### Lazy Load por IntersectionObserver

```tsx
// Cada VideoCard observa a si mesmo — só conecta o src quando próximo da viewport
function VideoCard({ src, ... }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isNearViewport, setIsNearViewport] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true)
          io.disconnect() // uma vez perto, não precisa mais observar
        }
      },
      { rootMargin: '200px' } // começa a gerar poster 200px antes de entrar na tela
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Só gera poster quando perto da viewport
  const poster = useVideoPoster(isNearViewport ? src : '', 0.5)
  ...
}
```

---

#### Tabela Responsiva dos Vídeos

| Breakpoint | Card width | Layout | Comportamento |
|---|---|---|---|
| ≤480px | `85vw` (max 300px) | 1 card grande | Scroll horizontal snap, botão play 56px |
| ≤767px | `85vw` (max 340px) | 1 card grande | Scroll horizontal snap, dots indicadores |
| ≥1024px | 260px fixo | Grid 3 colunas | Sem scroll, centrado |
| ≥1280px | 280px fixo | Grid 3 colunas | Mais espaço entre cards |
| ≥1440px | 320px fixo | Grid 3 colunas | Cards maiores |

---

### 5.8 Passos

`#passos`. `var(--bg-cream)`. 4 colunas + linha conectora (`:has(.revealed)` scaleX 1.2s). Ícone 88px spring bounce. Mobile: 2 colunas sem linha.

```css
/* Linha conectora entre os steps — desktop only */
.steps-grid { position: relative; }
.steps-grid::before {
  content: ''; position: absolute;
  top: 44px; left: 10%; right: 10%; height: 1px;
  background: var(--color-border-strong);
  transform: scaleX(0); transform-origin: left;
  transition: transform 1.2s var(--ease-out);
}
.steps-grid:has(.revealed)::before { transform: scaleX(1); }

@media (max-width: 767px) {
  .steps-grid::before { display: none; }
  .steps-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .steps-grid { grid-template-columns: 1fr; }
}
```

### 5.9 Bio

`#bio`. `var(--gradient-section)`. Grid `0.85fr 1.15fr`. Foto com borda offset `::after`. Stats com counter animation (rAF 2s, easing quadrático). Mobile: 1 coluna, foto centralizada 300px, sem borda decorativa.

---

### 5.10 Instagram ★ ESPECIFICAÇÃO DETALHADA

`#instagram`. `var(--bg-cream)`.

**Arquivos de foto:** `public/instagram/ig-1.webp` até `ig-6.webp` (400×400px cada).

#### Header da Seção

```
┌──────────────────────────────────────────────────┐
│   [ Label: "Redes Sociais" ]                     │
│   [ H2: "Siga no Instagram" ]                    │
│   [ Subtítulo ]                                  │
│                                                  │
│  ┌──────────┐                   ┌──────────────┐ │
│  │ [avatar] │ @handle           │ + Seguir     │ │
│  │  52px    │ Nome da clínica   │   (botão)    │ │
│  └──────────┘                   └──────────────┘ │
│  ← LOGO/PERFIL (esq.)         BOTÃO SEGUIR (dir)→│
└──────────────────────────────────────────────────┘
```

**Regras do header Instagram:**
- Avatar (52px, borda com gradient gold) + nome/handle à **esquerda**
- Botão "Seguir" (outline gold, border-radius-full) à **direita**
- `display: flex; justify-content: space-between; align-items: center`
- Responsivo: em telas <480px, o bloco do perfil comprime (handle pode quebrar linha), botão mantém tamanho mínimo

```tsx
<div className="instagram-header">
  <a
    className="instagram-profile"
    href={INSTAGRAM_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visitar perfil no Instagram"
  >
    <div className="instagram-avatar-wrap">
      <img
        className="instagram-avatar"
        src="/logo.webp"              /* logo da marca como avatar */
        alt="Logo"
        width={52}
        height={52}
      />
    </div>
    <div className="instagram-profile-info">
      <span className="instagram-handle">@{INSTAGRAM_HANDLE}</span>
      <span className="instagram-name">{CLINIC_NAME}</span>
    </div>
  </a>

  <a
    className="btn-instagram-follow"
    href={INSTAGRAM_URL}
    target="_blank"
    rel="noopener noreferrer"
  >
    Seguir
  </a>
</div>
```

```css
.instagram-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
  padding: var(--space-4) var(--space-6);
  background: var(--color-card-bg);
  border: var(--glass-border-warm);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}

.instagram-profile {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  flex: 1;
  min-width: 0; /* permite truncar handle em telas pequenas */
}

/* Avatar com borda gradient — Instagram style */
.instagram-avatar-wrap {
  flex-shrink: 0;
  width: 52px; height: 52px;
  border-radius: var(--radius-full);
  padding: 2px;
  background: linear-gradient(135deg, var(--color-gold-light), var(--color-gold-dark), var(--color-rose));
}

.instagram-avatar {
  width: 100%; height: 100%;
  border-radius: var(--radius-full);
  border: 2px solid var(--bg-cream);
  object-fit: cover;
}

.instagram-profile-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.instagram-handle {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.instagram-name {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Botão Seguir */
.btn-instagram-follow {
  flex-shrink: 0;
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-gold);
  color: var(--color-gold-dark);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-sm);
  text-decoration: none;
  background: transparent;
  transition: background var(--duration-base) var(--ease-out),
              color var(--duration-base) var(--ease-out),
              transform var(--duration-fast) var(--ease-spring);
  white-space: nowrap;
}

.btn-instagram-follow:hover {
  background: var(--color-gold);
  color: var(--color-white);
  transform: translateY(-1px);
}

.btn-instagram-follow:active {
  transform: translateY(1px) scale(0.97);
  transition-duration: 80ms;
}
```

#### Grid de Fotos

```
Desktop (3x2):               Mobile (2x3):
┌──────┐ ┌──────┐ ┌──────┐  ┌──────┐ ┌──────┐
│ ig-1 │ │ ig-2 │ │ ig-3 │  │ ig-1 │ │ ig-2 │
└──────┘ └──────┘ └──────┘  └──────┘ └──────┘
┌──────┐ ┌──────┐ ┌──────┐  ┌──────┐ ┌──────┐
│ ig-4 │ │ ig-5 │ │ ig-6 │  │ ig-3 │ │ ig-4 │
└──────┘ └──────┘ └──────┘  └──────┘ └──────┘
                             ┌──────┐ ┌──────┐
                             │ ig-5 │ │ ig-6 │
                             └──────┘ └──────┘
```

```tsx
const IG_POSTS = [
  { src: '/instagram/ig-1.webp', alt: 'Post Instagram 1' },
  { src: '/instagram/ig-2.webp', alt: 'Post Instagram 2' },
  { src: '/instagram/ig-3.webp', alt: 'Post Instagram 3' },
  { src: '/instagram/ig-4.webp', alt: 'Post Instagram 4' },
  { src: '/instagram/ig-5.webp', alt: 'Post Instagram 5' },
  { src: '/instagram/ig-6.webp', alt: 'Post Instagram 6' },
]

<div className="ig-grid">
  {IG_POSTS.map((post, i) => (
    <a
      key={i}
      className="ig-post reveal reveal--scale"
      style={{ transitionDelay: `${i * 0.05}s` }}
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={post.src} alt={post.alt} loading="lazy" width={400} height={400} />
      <div className="ig-post__overlay">
        <HeartIcon size={24} />
      </div>
    </a>
  ))}
</div>
```

```css
.ig-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

@media (max-width: 767px) {
  .ig-grid { grid-template-columns: repeat(2, 1fr); }
}

.ig-post {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  cursor: pointer;
}

.ig-post img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-out);
  display: block;
}

/* Overlay com coração — hover desktop */
.ig-post__overlay {
  position: absolute; inset: 0;
  background: rgba(45, 41, 38, 0.35);
  display: flex; align-items: center; justify-content: center;
  color: var(--color-white);
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
}

@media (hover: hover) {
  .ig-post:hover img { transform: scale(1.05); }
  .ig-post:hover .ig-post__overlay { opacity: 1; }
}

/* Touch: apenas active feedback */
@media (hover: none) {
  .ig-post:active img { transform: scale(0.98); }
}
```

---

### 5.11 Card CTA

`#agendamento`. Max-width 520px, centralizado. Background: `var(--gradient-aurora)`. Barra gold shimmer infinito na parte superior. Checklist com `reveal--up` stagger 60ms. CTA full-width com press effect + glow. `reveal--scale`.

### 5.12 Mapa ★ ESPECIFICAÇÃO DETALHADA

`#mapa`. Mostra a extensão completa do Google Maps com o mapa interativo.

**Implementação:** Iframe nativo do Google Maps Embed API — **não** uma imagem estática.

```tsx
const GOOGLE_MAPS_EMBED = `https://www.google.com/maps/embed?pb=!1m18!...` // URL do Maps Embed

function MapSection() {
  const [loaded, setLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  return (
    <section id="mapa" className="map-section">
      <div className="container">
        <SectionHeader label="Localização" title="Como Chegar" />

        <div className="map-address reveal reveal--up">
          <MapPinIcon size={20} color="var(--color-gold)" />
          <span>{ADDRESS}</span>
        </div>

        <div className="map-wrapper reveal reveal--scale">
          {/* Skeleton enquanto iframe carrega */}
          {!loaded && <div className="map-skeleton" aria-hidden="true" />}

          <iframe
            ref={iframeRef}
            className={`map-iframe ${loaded ? 'map-iframe--loaded' : ''}`}
            src={GOOGLE_MAPS_EMBED}
            title="Localização no Google Maps"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </section>
  )
}
```

**CSS do mapa — proporção 16:9, borda arredondada, sombra:**

```css
.map-section { background: var(--bg-ivory); }

.map-address {
  display: flex; align-items: center; gap: var(--space-2);
  font-family: var(--font-body);
  color: var(--color-text-body);
  margin-bottom: var(--space-6);
}

/* Wrapper com aspect-ratio 16:9 */
.map-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  background: var(--bg-warm);
}

/* Skeleton animado enquanto carrega */
.map-skeleton {
  position: absolute; inset: 0;
  background: linear-gradient(
    90deg,
    var(--bg-warm) 25%,
    var(--bg-warm-deep) 50%,
    var(--bg-warm) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Iframe — ocupa 100% do wrapper */
.map-iframe {
  width: 100%; height: 100%;
  border: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.map-iframe--loaded { opacity: 1; }

/* Mobile — proporção pode ser mais alta */
@media (max-width: 767px) {
  .map-wrapper { aspect-ratio: 4 / 3; }
}
@media (max-width: 480px) {
  .map-wrapper { aspect-ratio: 1 / 1; border-radius: var(--radius-lg); }
}
```

**URL do Embed:** Gerar via Google Maps → Compartilhar → Incorporar mapa → Copiar src do iframe. Substituir em `GOOGLE_MAPS_EMBED`.

### 5.13 FAQ ★ ESPECIFICAÇÃO DETALHADA

`#faq`. Background: `var(--bg-cream)`.

**Propósito:** Quebrar objeções restantes do visitante antes da conversão. Cada item responde uma dúvida real que impede o clique no WhatsApp.

---

#### Layout Geral

```
[ Label: "Dúvidas" ]
[ H2: "Perguntas Frequentes" ]
[ Subtítulo ]

  ┌──────────────────────────────────────────────┐
  │ Quanto tempo dura o procedimento?        [+] │  ← fechado
  └──────────────────────────────────────────────┘
  ┌──────────────────────────────────────────────┐
  │ O procedimento dói?                      [×] │  ← aberto (chevron rotacionado)
  │                                              │
  │  Lorem ipsum resposta completa aqui...        │
  │  Pode ter mais de uma linha.                  │
  │                                              │
  └──────────────────────────────────────────────┘
  ┌──────────────────────────────────────────────┐
  │ Quantas sessões são necessárias?         [+] │  ← fechado
  └──────────────────────────────────────────────┘
```

- **Max-width:** 800px, centralizado (`margin: 0 auto`)
- **Mobile:** full-width com padding lateral de 16px
- **Número de itens:** 6–10 perguntas (ideal: 8)

---

#### Estrutura de Dados

```tsx
interface FAQItem {
  question: string   // pergunta — texto curto, máx ~60 chars
  answer: string     // resposta — pode ter 1-4 parágrafos, até ~200 chars
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Quanto tempo dura o procedimento?',
    answer: 'A duração varia conforme o tratamento escolhido. A maioria das sessões dura entre 30 e 60 minutos...',
  },
  {
    question: 'O procedimento é doloroso?',
    answer: 'Não. Os procedimentos são pensados para máximo conforto...',
  },
  // ... mais 6 itens
]
```

---

#### Comportamento — Single-Open Accordion

**Regra fundamental:** apenas **um item pode estar aberto por vez**. Ao abrir um novo item, o anterior fecha automaticamente. Nunca dois items abertos simultaneamente.

**State:**

```tsx
const [openIndex, setOpenIndex] = useState<number | null>(null)

function toggleFAQ(index: number) {
  // Se clicar no item já aberto → fecha. Se clicar em outro → abre e fecha o anterior.
  setOpenIndex(prev => prev === index ? null : index)
}
```

**Renderização:**

```tsx
<section id="faq" className="faq-section">
  <div className="container faq-container">
    <SectionHeader label="Dúvidas" title="Perguntas Frequentes" />

    <div className="faq-list">
      {FAQ_ITEMS.map((item, i) => (
        <div
          key={i}
          className={`faq-item reveal reveal--up ${openIndex === i ? 'faq-item--open' : ''}`}
          style={{ transitionDelay: `${i * 0.04}s` }}
        >
          {/* Botão de pergunta — clicável */}
          <button
            className="faq-trigger"
            onClick={() => toggleFAQ(i)}
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
            id={`faq-trigger-${i}`}
          >
            <span className="faq-question">{item.question}</span>
            <span className="faq-icon" aria-hidden="true">
              <ChevronDownIcon size={20} />
            </span>
          </button>

          {/* Resposta — animada com grid-template-rows */}
          <div
            className="faq-answer"
            id={`faq-answer-${i}`}
            role="region"
            aria-labelledby={`faq-trigger-${i}`}
          >
            <div className="faq-answer-inner">
              <p className="faq-answer-text">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

#### Animação de Abertura — Grid Rows (não max-height)

**Por que `grid-template-rows` e não `max-height`:**
- `max-height` requer um valor arbitrário alto (ex: `max-height: 500px`) que faz a animação de fechamento parecer "lenta" — o elemento colapsa de 500px pra 0 mesmo tendo só 80px de conteúdo
- `grid-template-rows: 0fr → 1fr` anima do tamanho real do conteúdo, sem valores arbitrários
- Resultado: abertura e fechamento têm duração proporcional ao conteúdo — parece natural

```css
/* Wrapper da resposta — controla a animação de altura */
.faq-answer {
  display: grid;
  grid-template-rows: 0fr;       /* fechado: altura 0 */
  transition: grid-template-rows var(--duration-slow) var(--ease-out);
                                  /* var(--duration-slow) = 400ms */
}

/* Item aberto — altura total do conteúdo */
.faq-item--open .faq-answer {
  grid-template-rows: 1fr;       /* aberto: altura natural */
}

/* Inner precisa de overflow: hidden pra o grid funcionar */
.faq-answer-inner {
  overflow: hidden;
  /* Padding aqui — não no .faq-answer, senão vaza durante animação */
  padding: 0 var(--space-6) var(--space-5) var(--space-6);
}
```

**Detalhe crítico:** o `padding` vai no `.faq-answer-inner`, nunca no `.faq-answer`. Se o padding estiver no elemento que tem `overflow: hidden`, o espaço some durante a animação de fechamento.

---

#### Animação do Ícone Chevron

O chevron rotaciona 180° ao abrir — indica visualmente que "fechar" é a próxima ação.

```css
.faq-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px; height: 32px;
  border-radius: var(--radius-full);
  background: var(--bg-warm);
  color: var(--color-gold);
  transition: transform var(--duration-base) var(--ease-out),
              background var(--duration-base) var(--ease-out),
              color var(--duration-base) var(--ease-out);
}

/* Item aberto: chevron rotaciona 180° e muda de cor */
.faq-item--open .faq-icon {
  transform: rotate(180deg);
  background: var(--color-gold);
  color: var(--color-white);
}
```

---

#### CSS Completo do FAQ

```css
.faq-section {
  background: var(--bg-cream);
  padding: var(--space-24) 0;
}

.faq-container {
  max-width: var(--container-narrow); /* 800px */
  margin: 0 auto;
}

/* Lista de itens */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-12);
}

/* Card de cada item */
.faq-item {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color var(--duration-base) var(--ease-out),
              box-shadow var(--duration-base) var(--ease-out);
}

/* Item aberto — borda gold, sombra suave */
.faq-item--open {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-md);
}

/* Botão da pergunta */
.faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-6);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background var(--duration-fast) var(--ease-out);
}

/* Hover — feedback sutil de fundo */
@media (hover: hover) {
  .faq-trigger:hover { background: var(--bg-warm); }
}

/* Touch — feedback de press */
@media (hover: none) {
  .faq-trigger:active { background: var(--bg-warm-deep); }
}

/* Texto da pergunta */
.faq-question {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-base);
  color: var(--color-text-primary);
  line-height: 1.5;
}

/* Item aberto — pergunta fica gold */
.faq-item--open .faq-question {
  color: var(--color-gold-dark);
}

/* Texto da resposta */
.faq-answer-text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text-body);
  line-height: 1.7;
  margin: 0;
}

/* Separador entre pergunta e resposta */
.faq-item--open .faq-trigger {
  border-bottom: 1px solid var(--color-border);
}

/* Mobile */
@media (max-width: 767px) {
  .faq-section { padding: var(--space-16) 0; }
  .faq-trigger { padding: var(--space-4) var(--space-4); }
  .faq-answer-inner { padding: 0 var(--space-4) var(--space-4) var(--space-4); }
  .faq-question { font-size: var(--text-sm); }
}
```

---

#### Acessibilidade

- `<button>` nativo no trigger — focável por teclado, ativável com Enter/Space
- `aria-expanded="true/false"` no button — leitores de tela anunciam estado
- `aria-controls` liga o button à sua resposta
- `role="region"` + `aria-labelledby` na resposta — define a região semanticamente
- Foco visível: `outline: 2px solid var(--color-gold); outline-offset: 2px` no `:focus-visible` do trigger

```css
.faq-trigger:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: -2px;
  border-radius: var(--radius-lg);
}
```

---

#### Scroll Reveal dos Itens

Cada item usa `reveal--up` com stagger de **40ms** — delay pequeno porque são muitos itens e não pode demorar pra revelar todos.

```tsx
{FAQ_ITEMS.map((item, i) => (
  <div
    className={`faq-item reveal reveal--up ${openIndex === i ? 'faq-item--open' : ''}`}
    style={{ transitionDelay: `${i * 0.04}s` }}  /* 40ms entre cada item */
    key={i}
  >
    ...
  </div>
))}
```

Com 8 itens e 40ms de delay: o último item aparece em 280ms após o primeiro — o usuário ainda está vendo a animação quando chega no final da lista.

### 5.14 Footer

`#footer`. Bg `var(--color-text-primary)`. Grid `1.3fr 1fr 0.8fr 0.8fr`. Mobile: 1 coluna.

### 5.15 Elementos Fixos

| Elemento | z-index | Comportamento |
|---|---|---|
| Scroll Progress | 99999 | CSS scroll-driven, 3px |
| Navbar | 9999 | Glass on scroll |
| WhatsApp Float | 9998 | pulseRing + magnetic cursor |
| Scroll to Top | 9997 | Aparece >400px |

---

## 6. Componentes

- **useReveal()** — IntersectionObserver hook, threshold 0.15, disparo único
- **BeforeAfterSlider** — drag mouse+touch, clip-path, handle circular
- **VideoCard** — 3 estados (idle/loading/playing), poster via canvas JPEG 80%, play glass-morphism, com áudio
- **useVideoPoster()** — extrai frame do vídeo via canvas offscreen (muted), retorna dataURL
- **Testimonials Carousel** — autoplay 4s, drag, snap, dots
- **FAQ Accordion** — single-open, grid-rows animation
- **SectionHeader** — label→título→sub com stagger 80ms

---

## 7. Performance

- GPU only: `opacity` + `transform`
- `will-change` nos reveals
- 1 IntersectionObserver global
- CSS scroll-driven off-main-thread
- `backdrop-filter` blur ≤24px
- `requestAnimationFrame` pra counters
- `@media (prefers-reduced-motion)` desativa tudo
- Preact alias, Critical CSS inline, lazy loading, WebP, srcSet
- Vídeos: `preload="none"` + IntersectionObserver por card (rootMargin 200px)
- Mapa: `loading="lazy"` no iframe + skeleton enquanto carrega

---

## 8. SEO

Meta tags: title, description, canonical, OG, Twitter Cards.
JSON-LD: MedicalBusiness, Person, FAQPage, MedicalProcedure.
robots.txt + sitemap.xml.

---

## 9. CTAs

5 pontos: Navbar, Hero, Mobile Menu, Card CTA, Float. Todos → WhatsApp. Visitante nunca fica a >2 scrolls de um CTA.

---

## 10. Assets

```
public/
├── logo.webp                    → Logo da marca (navbar + avatar Instagram)
├── hero.webp + hero@2x.webp     → Foto hero 455w / 910w
├── before-after/                → Pares before/after 640×640
├── bio.webp                     → Foto da profissional 400×500
├── instagram/
│   ├── ig-1.webp
│   ├── ig-2.webp
│   ├── ig-3.webp
│   ├── ig-4.webp
│   ├── ig-5.webp
│   └── ig-6.webp                → Posts 400×400 cada
├── videos/
│   ├── video-1.mp4              → 9:16, max 50MB
│   ├── video-2.mp4
│   └── video-3.mp4
└── favicons/ + og-image.jpg
```

---

## 11. Constantes (App.tsx)

```tsx
const WHATSAPP_LINK     = 'https://wa.me/55XXXXXXXXXXX?text=Olá!'
const PHONE             = '(XX) XXXXX-XXXX'
const ADDRESS           = 'Endereço completo'
const INSTAGRAM_URL     = 'https://www.instagram.com/handle'
const INSTAGRAM_HANDLE  = 'handle'
const CLINIC_NAME       = 'Nome da Clínica'
const GOOGLE_MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!...'

// Arrays
const PROCEDURES[]            // tratamentos
const RESULTS[]               // pares before/after
const TESTIMONIALS[]          // depoimentos do Google
const VIDEOS_ATENDIMENTO[]    // { src, title, posterTime? }
const STEPS[]                 // 4 passos
const FAQ_ITEMS[]             // perguntas/respostas
const IG_POSTS[]              // { src, alt }
```

---

## 12. Checklist de Replicação

- [ ] Cores primárias/secundárias + RGB em borders, shadows, mesh gradients, glass tokens
- [ ] Fontes (heading + body) + Google Fonts URL
- [ ] Logo `.webp` (navbar + avatar do Instagram)
- [ ] Foto hero + srcSet 455w/910w
- [ ] Fotos before/after 640×640
- [ ] Foto bio 400×500
- [ ] 6 fotos Instagram em `public/instagram/ig-{1-6}.webp`
- [ ] 2–3 vídeos `.mp4` 9:16 em `public/videos/video-{1-3}.mp4`
- [ ] URL do Google Maps Embed (iframe src)
- [ ] Conteúdo (constantes, arrays, Hero, Bio, CTA, Footer)
- [ ] SEO (meta tags, JSON-LD, robots, sitemap)
- [ ] Testar desktop + mobile + Lighthouse + prefers-reduced-motion
- [ ] Testar geração de poster dos vídeos (canvas) em todos os browsers
- [ ] Verificar que vídeos reproduzem **com áudio** ao clicar play
- [ ] Verificar hero: texto+CTA à esquerda / foto à direita no desktop
- [ ] Verificar hero mobile: título → foto → subtítulo+CTA+badge
- [ ] Verificar Instagram: avatar+handle à esquerda / botão seguir à direita
- [ ] `history.scrollRestoration = 'manual'` em `index.html` (script inline), `main.tsx` e `App.tsx`
- [ ] `window.scrollTo({ top: 0, behavior: 'instant' })` nas 3 camadas
- [ ] Testar scroll to top: recarregar página no meio do scroll → deve voltar ao topo
- [ ] FAQ: single-open — abrir item 2 fecha item 1 automaticamente
- [ ] FAQ: animação `grid-template-rows: 0fr → 1fr` (não max-height)
- [ ] FAQ: chevron rotaciona 180° + muda para gold ao abrir
- [ ] FAQ: `aria-expanded`, `aria-controls`, `role="region"` presentes
- [ ] FAQ: `padding` no `.faq-answer-inner`, não no `.faq-answer`
