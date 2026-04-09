# Design System — Eugenia Fernandes | Estetica & Makeup

## Brand Identity

- **Nome:** Eugenia Fernandes
- **Tagline:** Estetica & Makeup
- **Logo:** Monograma "EF" em serif dourado com nome completo abaixo
- **Tom:** Elegante, sofisticado, feminino, luxo acessivel, acolhedor

---

## Color Palette

```json
{
  "colors": {
    "primary": {
      "gold": "#B8932B",
      "goldDark": "#9A7B1F",
      "goldLight": "#D4AD3C"
    },
    "secondary": {
      "brown": "#5C3D2E",
      "brownDark": "#3E2A1E",
      "brownLight": "#8B6E5A"
    },
    "neutral": {
      "white": "#FFFFFF",
      "cream": "#FDF8F0",
      "beige": "#E8DDD1",
      "sand": "#D4C4A8",
      "warmGray": "#9C9080"
    },
    "background": {
      "hero": "#C9A45C",
      "card": "#FFFFFF",
      "page": "#FDF8F0",
      "section": "#F5EDE1",
      "overlay": "rgba(62, 42, 30, 0.6)"
    },
    "text": {
      "heading": "#3E2A1E",
      "body": "#5C3D2E",
      "muted": "#9C9080",
      "onDark": "#FFFFFF",
      "onGold": "#FFFFFF",
      "accent": "#B8932B"
    },
    "ui": {
      "border": "#E8DDD1",
      "divider": "#D4C4A8",
      "selected": "#B8932B",
      "hover": "#9A7B1F",
      "success": "#6B8E5A",
      "shadow": "rgba(92, 61, 46, 0.08)"
    }
  }
}
```

---

## Typography

```json
{
  "typography": {
    "fontFamilies": {
      "heading": "'Playfair Display', 'Georgia', serif",
      "body": "'Lato', 'Helvetica Neue', sans-serif",
      "accent": "'Cormorant Garamond', 'Georgia', serif",
      "logo": "'Playfair Display', serif"
    },
    "fontSizes": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "md": "1.125rem",
      "lg": "1.25rem",
      "xl": "1.5rem",
      "2xl": "2rem",
      "3xl": "2.5rem",
      "4xl": "3rem",
      "hero": "3.5rem"
    },
    "fontWeights": {
      "light": 300,
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700
    },
    "lineHeights": {
      "tight": 1.2,
      "normal": 1.5,
      "relaxed": 1.75
    },
    "letterSpacing": {
      "tight": "-0.01em",
      "normal": "0",
      "wide": "0.05em",
      "extraWide": "0.15em"
    }
  }
}
```

---

## Spacing & Layout

```json
{
  "spacing": {
    "unit": "0.25rem",
    "scale": {
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "0.75rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "8": "2rem",
      "10": "2.5rem",
      "12": "3rem",
      "16": "4rem",
      "20": "5rem",
      "24": "6rem"
    }
  },
  "layout": {
    "maxWidth": "1200px",
    "contentWidth": "800px",
    "cardWidth": "620px",
    "gutter": "1.5rem",
    "sectionPadding": {
      "mobile": "3rem 1rem",
      "desktop": "5rem 2rem"
    }
  }
}
```

---

## Border Radius

```json
{
  "borderRadius": {
    "none": "0",
    "sm": "0.25rem",
    "md": "0.5rem",
    "lg": "1rem",
    "xl": "1.5rem",
    "full": "9999px",
    "card": "0.75rem",
    "button": "9999px",
    "avatar": "50%"
  }
}
```

---

## Shadows

```json
{
  "shadows": {
    "sm": "0 1px 3px rgba(92, 61, 46, 0.06)",
    "md": "0 4px 12px rgba(92, 61, 46, 0.08)",
    "lg": "0 8px 24px rgba(92, 61, 46, 0.1)",
    "xl": "0 16px 48px rgba(92, 61, 46, 0.12)",
    "card": "0 2px 16px rgba(92, 61, 46, 0.06)",
    "cardHover": "0 8px 32px rgba(92, 61, 46, 0.12)",
    "button": "0 2px 8px rgba(184, 147, 43, 0.25)"
  }
}
```

---

## Components

### Buttons

```json
{
  "buttons": {
    "primary": {
      "background": "#B8932B",
      "color": "#FFFFFF",
      "borderRadius": "9999px",
      "padding": "0.875rem 2.5rem",
      "fontSize": "0.9375rem",
      "fontWeight": 600,
      "fontFamily": "body",
      "letterSpacing": "0.05em",
      "textTransform": "uppercase",
      "hover": {
        "background": "#9A7B1F",
        "shadow": "0 4px 16px rgba(184, 147, 43, 0.3)"
      }
    },
    "secondary": {
      "background": "transparent",
      "color": "#5C3D2E",
      "border": "1.5px solid #D4C4A8",
      "borderRadius": "9999px",
      "padding": "0.875rem 2.5rem",
      "hover": {
        "borderColor": "#B8932B",
        "color": "#B8932B"
      }
    },
    "ghost": {
      "background": "transparent",
      "color": "#B8932B",
      "padding": "0.5rem 1rem",
      "hover": {
        "background": "rgba(184, 147, 43, 0.08)"
      }
    }
  }
}
```

### Cards

```json
{
  "cards": {
    "service": {
      "background": "#FFFFFF",
      "borderRadius": "0.75rem",
      "padding": "1.5rem",
      "shadow": "0 2px 16px rgba(92, 61, 46, 0.06)",
      "border": "none",
      "hover": {
        "shadow": "0 8px 32px rgba(92, 61, 46, 0.12)",
        "transform": "translateY(-2px)"
      }
    },
    "category": {
      "background": "#F5EDE1",
      "borderRadius": "0.5rem",
      "padding": "1rem 1.5rem",
      "borderLeft": "3px solid #B8932B"
    },
    "pricing": {
      "background": "#FFFFFF",
      "borderRadius": "0.75rem",
      "padding": "1.25rem 1.5rem",
      "borderBottom": "1px solid #E8DDD1"
    }
  }
}
```

### Service List Item

```json
{
  "serviceItem": {
    "layout": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "padding": "1rem 0",
    "borderBottom": "1px solid #E8DDD1",
    "icon": {
      "type": "checkCircle",
      "color": "#B8932B",
      "size": "1.25rem"
    },
    "name": {
      "fontFamily": "body",
      "fontSize": "1rem",
      "fontWeight": 400,
      "color": "#3E2A1E"
    },
    "description": {
      "fontFamily": "body",
      "fontSize": "0.875rem",
      "color": "#9C9080",
      "marginTop": "0.25rem"
    },
    "price": {
      "fontFamily": "body",
      "fontSize": "1rem",
      "fontWeight": 600,
      "color": "#5C3D2E",
      "whiteSpace": "nowrap"
    }
  }
}
```

### Category Accordion

```json
{
  "categoryAccordion": {
    "header": {
      "fontFamily": "heading",
      "fontSize": "0.9375rem",
      "fontWeight": 700,
      "letterSpacing": "0.05em",
      "textTransform": "uppercase",
      "color": "#3E2A1E",
      "padding": "1rem 0",
      "borderBottom": "1px solid #E8DDD1"
    },
    "chevron": {
      "color": "#9C9080",
      "size": "1.25rem",
      "transition": "transform 0.2s"
    }
  }
}
```

---

## Hero / Header

```json
{
  "hero": {
    "background": "linear-gradient(to bottom, rgba(62, 42, 30, 0.3), rgba(62, 42, 30, 0.5)), url('hero.jpg')",
    "backgroundSize": "cover",
    "backgroundPosition": "center",
    "minHeight": "320px",
    "textAlign": "center",
    "logo": {
      "width": "120px",
      "height": "120px",
      "borderRadius": "50%",
      "border": "3px solid rgba(255,255,255,0.3)",
      "marginBottom": "1rem"
    },
    "title": {
      "fontFamily": "heading",
      "fontSize": "2rem",
      "fontWeight": 400,
      "color": "#FFFFFF",
      "letterSpacing": "0.02em",
      "textShadow": "0 2px 8px rgba(0,0,0,0.3)"
    }
  }
}
```

---

## Instagram Highlights Style

```json
{
  "highlights": {
    "circle": {
      "size": "72px",
      "borderRadius": "50%",
      "border": "2px solid #D4C4A8",
      "background": "#E8DDD1",
      "padding": "3px"
    },
    "label": {
      "fontFamily": "body",
      "fontSize": "0.75rem",
      "fontWeight": 400,
      "color": "#5C3D2E",
      "textAlign": "center",
      "marginTop": "0.5rem"
    },
    "categories": [
      "Makeup",
      "Espaco",
      "SPA",
      "Destaques",
      "Noivas",
      "Indiba",
      "Lifting"
    ]
  }
}
```

---

## Image Treatment

```json
{
  "images": {
    "beforeAfter": {
      "layout": "sideBySide",
      "borderRadius": "0.5rem",
      "labelStyle": {
        "fontFamily": "body",
        "fontSize": "0.75rem",
        "fontWeight": 700,
        "letterSpacing": "0.1em",
        "textTransform": "uppercase",
        "color": "#FFFFFF",
        "background": "rgba(62, 42, 30, 0.7)",
        "padding": "0.25rem 0.75rem",
        "borderRadius": "9999px"
      }
    },
    "gallery": {
      "borderRadius": "0",
      "gap": "3px",
      "columns": 3,
      "aspectRatio": "1/1",
      "objectFit": "cover"
    }
  }
}
```

---

## Animations & Transitions

```json
{
  "transitions": {
    "fast": "150ms ease",
    "normal": "250ms ease",
    "slow": "400ms ease",
    "spring": "300ms cubic-bezier(0.34, 1.56, 0.64, 1)"
  },
  "animations": {
    "fadeIn": {
      "from": { "opacity": 0, "transform": "translateY(8px)" },
      "to": { "opacity": 1, "transform": "translateY(0)" },
      "duration": "400ms",
      "easing": "ease-out"
    },
    "scaleUp": {
      "from": { "transform": "scale(0.97)" },
      "to": { "transform": "scale(1)" },
      "duration": "250ms"
    }
  }
}
```

---

## Breakpoints

```json
{
  "breakpoints": {
    "sm": "480px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px"
  }
}
```

---

## Service Categories (from booking system)

```json
{
  "serviceCategories": [
    {
      "name": "Threading | Epilacao Linha",
      "services": [
        { "name": "Design de Sobrancelha 1a vez", "price": "15 EUR" },
        { "name": "Sobrancelha", "price": "10.50 EUR" },
        { "name": "Sobrancelha + Buco", "price": "15 EUR" },
        { "name": "Queixo", "price": "5 EUR" },
        { "name": "Dermaplaning", "price": "25 EUR", "description": "Esfoliacao da pele com lamina para remover celulas mortas e penugem, deixando a pele mais lisa e luminosa." },
        { "name": "Rosto Completo", "price": "23 EUR" }
      ]
    }
  ]
}
```

---

## Brand Keywords

- Elegancia natural
- Sofisticacao acessivel
- Tons quentes e terrosos
- Feminino sem ser infantil
- Confianca e bem-estar
- Profissionalismo com proximidade
