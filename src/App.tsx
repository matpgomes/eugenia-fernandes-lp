import { useState, useEffect, useRef } from 'react'
import {
  Menu, X, Phone, MapPin, Star, ChevronDown,
  Play, Heart, CheckCircle, ArrowUp, MessageCircle,
  Camera, Mail, Sparkles, CalendarCheck,
  Droplets, Zap, Gem, Sun, Eye
} from 'lucide-react'

// ── Constants ──
const WHATSAPP_NUMBER = '351XXXXXXXXX'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%21%20Gostaria%20de%20agendar%20uma%20consulta.`
const PHONE_DISPLAY = '+351 XXX XXX XXX'
const ADDRESS = 'Rua XXXXX, Lisboa, Portugal'
const INSTAGRAM_URL = 'https://www.instagram.com/ef.estetica.makeup'
const INSTAGRAM_HANDLE = 'ef.estetica.makeup'
const CLINIC_NAME = 'Eugenia Fernandes Estética & Makeup'
const GOOGLE_MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3113!2d-9.15!3d38.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ0JzI0LjAiTiA5wrAwOScwMC4wIlc!5e0!3m2!1spt-PT!2spt!4v1'

const PROCEDURES = [
  { icon: Eye, title: 'Design de Sobrancelha', desc: 'Threading com linha para um olhar perfeito e natural.' },
  { icon: Sparkles, title: 'Dermaplaning', desc: 'Esfoliação com lâmina para pele lisa e luminosa.' },
  { icon: Zap, title: 'Radiofrequência Indiba', desc: 'Tecnologia avançada para firmeza e rejuvenescimento.' },
  { icon: Droplets, title: 'Tratamentos Faciais', desc: 'Limpeza profunda, hidratação e revitalização.' },
  { icon: Sun, title: 'Lifting Facial', desc: 'Efeito lifting não invasivo com resultados visíveis.' },
  { icon: Gem, title: 'Makeup Profissional', desc: 'Maquilhagem para noivas, eventos e editoriais.' },
]

const RESULTS = [
  { src: '/before-after/ba-1.webp', title: 'Ondas Acústicas + Indiba' },
  { src: '/before-after/ba-2.webp', title: 'Design de Sobrancelha' },
  { src: '/before-after/ba-3.webp', title: 'Tratamento Facial' },
]

const TESTIMONIALS = [
  { name: 'Ana S.', text: 'Profissional incrível! Resultado superou as expectativas. Recomendo a todas.', rating: 5 },
  { name: 'Maria L.', text: 'O espaço é lindo e acolhedor. A Eugénia é muito atenciosa e competente.', rating: 5 },
  { name: 'Joana R.', text: 'Fiz o design de sobrancelha e amei! Finalmente encontrei alguém de confiança.', rating: 5 },
  { name: 'Patrícia M.', text: 'Resultados visíveis desde a primeira sessão de Indiba. Estou muito satisfeita!', rating: 5 },
]

const VIDEOS_ATENDIMENTO = [
  { src: '/videos/video-1.mp4', title: 'Atendimento Personalizado' },
  { src: '/videos/video-2.mp4', title: 'Espaço e Equipamentos' },
  { src: '/videos/video-3.mp4', title: 'Tratamento em Ação' },
]

const STEPS_DATA = [
  { icon: Phone, title: 'Contacte-nos', desc: 'Envie uma mensagem pelo WhatsApp' },
  { icon: CalendarCheck, title: 'Agende', desc: 'Escolha o melhor dia e horário' },
  { icon: Sparkles, title: 'Consulta', desc: 'Avaliação personalizada gratuita' },
  { icon: Heart, title: 'Resultados', desc: 'Transformação visível e duradoura' },
]

const FAQ_ITEMS = [
  { question: 'Quanto tempo dura cada sessão?', answer: 'A duração varia conforme o tratamento. A maioria das sessões dura entre 30 e 60 minutos. Na primeira consulta, fazemos uma avaliação completa para definir o plano ideal.' },
  { question: 'Os procedimentos são dolorosos?', answer: 'Não. Os nossos procedimentos são pensados para máximo conforto. Utilizamos técnicas suaves e equipamentos de última geração que minimizam qualquer desconforto.' },
  { question: 'Quantas sessões são necessárias?', answer: 'Depende do tratamento e dos objetivos. Em geral, recomendamos entre 4 a 8 sessões para resultados ótimos. Na consulta inicial definimos um protocolo personalizado.' },
  { question: 'Posso fazer tratamentos durante a gravidez?', answer: 'Alguns tratamentos são seguros durante a gravidez, mas outros não são recomendados. Informe-nos sobre a sua situação e adaptaremos o protocolo.' },
  { question: 'Como funciona o agendamento?', answer: 'Basta enviar uma mensagem pelo WhatsApp. Respondemos rapidamente e encontramos o melhor horário para si. Também pode ligar diretamente.' },
  { question: 'Qual o método de pagamento?', answer: 'Aceitamos dinheiro, Multibanco, MBWay e transferência bancária. O pagamento é feito no dia da sessão.' },
  { question: 'É necessário preparação antes do tratamento?', answer: 'Para a maioria dos tratamentos, não é necessária preparação especial. Enviamos instruções específicas por WhatsApp antes da sua sessão, caso necessário.' },
  { question: 'Os resultados são permanentes?', answer: 'Os resultados variam conforme o tratamento. Tratamentos como threading duram 3-4 semanas. Tratamentos corporais com Indiba têm resultados progressivos e duradouros com manutenção.' },
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

  // Scroll listener
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

  // Counter animation
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

  // Bio stats counter
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
            <span className="hero-brand">Eugenia Fernandes</span>
            <h1 className="hero-title">
              Realce a sua <em>beleza natural</em> com tratamentos de excelência
            </h1>
            <div className="hero-image-mobile-slot">
              <img className="hero-image" src="/hero.jpg" alt="Eugenia Fernandes" width={260} height={260} />
            </div>
            <p className="hero-subtitle">
              Estética facial, corporal e maquilhagem profissional em Lisboa. Resultados visíveis desde a primeira sessão.
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
            <img className="hero-image" src="/hero.jpg" alt="Eugenia Fernandes" width={460} height={460} />
          </div>
        </div>
      </section>

      {/* ══════ RESULTADOS ══════ */}
      <section id="resultados" className="results-section">
        <div className="container">
          <SectionHeader label="Transformações" title="Resultados Reais" subtitle="Veja as transformações das nossas clientes" />
          <div className="results-grid">
            {RESULTS.map((r, i) => (
              <div key={i} className="result-card reveal reveal--scale" style={{ transitionDelay: `${i * 0.07}s` }}>
                <img src={r.src} alt={r.title} loading="lazy" />
                <span className="result-card__label">{r.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PROCEDIMENTOS ══════ */}
      <section id="procedimentos" className="procedures-section">
        <div className="container">
          <SectionHeader label="Serviços" title="Nossos Procedimentos" subtitle="Tratamentos personalizados para cada necessidade" />
          <div className="procedures-grid">
            {PROCEDURES.map((p, i) => (
              <div key={i} className="procedure-card reveal reveal--up" style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="procedure-icon"><p.icon size={28} /></div>
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
          <SectionHeader label="Avaliações" title="O Que Dizem as Clientes" />
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
          <SectionHeader label="Experiência" title="Nosso Atendimento" subtitle="Conheça o nosso espaço e forma de trabalhar" />
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
          <SectionHeader label="Como Funciona" title="4 Passos Simples" subtitle="Agendar é fácil e rápido" />
          <div className="steps-grid">
            {STEPS_DATA.map((s, i) => (
              <div key={i} className="step-card reveal reveal--up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="step-icon"><s.icon size={32} /></div>
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
            <img src="/about.jpg" alt="Eugenia Fernandes" className="bio-image" width={400} height={500} />
          </div>
          <div className="bio-content reveal reveal--right" style={{ transitionDelay: '0.1s' }}>
            <span className="section-label">Sobre</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Eugénia Fernandes</h2>
            <p className="bio-text">
              Com mais de 10 anos de experiência em estética e maquilhagem profissional, a Eugénia combina técnica e sensibilidade para realçar a beleza única de cada cliente. Formação internacional e atualização constante nas mais recentes tecnologias e tendências.
            </p>
            <div className="bio-stats">
              <div className="bio-stat reveal reveal--scale" style={{ transitionDelay: '0.2s' }}>
                <span className="bio-stat-number" data-counter="10">0</span>
                <span className="bio-stat-suffix">+</span>
                <span className="bio-stat-label">Anos de Experiência</span>
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
            <h2 className="cta-title">Pronta para a sua transformação?</h2>
            <ul className="cta-checklist">
              {['Consulta de avaliação gratuita', 'Atendimento personalizado', 'Equipamentos de última geração', 'Resultados comprovados', 'Agendamento fácil pelo WhatsApp'].map((item, i) => (
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
          <SectionHeader label="Localização" title="Como Chegar" />
          <div className="map-address reveal reveal--up">
            <MapPin size={20} color="var(--color-gold)" />
            <span>{ADDRESS}</span>
          </div>
          <div className="map-wrapper reveal reveal--scale">
            <iframe
              className="map-iframe"
              src={GOOGLE_MAPS_EMBED}
              title="Localização no Google Maps"
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
          <SectionHeader label="Dúvidas" title="Perguntas Frequentes" />
          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={`faq-item reveal reveal--up ${openFaq === i ? 'faq-item--open' : ''}`} style={{ transitionDelay: `${i * 0.04}s` }}>
                <button className="faq-trigger" onClick={() => setOpenFaq(prev => prev === i ? null : i)} aria-expanded={openFaq === i} aria-controls={`faq-answer-${i}`} id={`faq-trigger-${i}`}>
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
            <p className="footer-desc">Estética & Makeup profissional em Lisboa. Beleza, confiança e bem-estar.</p>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Navegação</h4>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="footer-link">{link.label}</a>
            ))}
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Contacto</h4>
            <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`} className="footer-link"><Phone size={14} /> {PHONE_DISPLAY}</a>
            <a href="mailto:info@eugeniafernandes.pt" className="footer-link"><Mail size={14} /> info@eugeniafernandes.pt</a>
            <span className="footer-link"><MapPin size={14} /> {ADDRESS}</span>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Redes Sociais</h4>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer-link"><Camera size={14} /> Instagram</a>
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
