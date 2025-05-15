# Stiluri Globale

Acest director conține stilurile globale pentru aplicația WasteWise.

## Structură

```
styles/
├── index.css          # Stiluri globale și import Tailwind
└── README.md          # Acest fișier
```

## Utilizare

Stilurile globale sunt importate în `main.tsx` și aplicate întregii aplicații. Acestea includ:

- Configurarea Tailwind CSS
- Variabile CSS pentru teme (light/dark)
- Stiluri de bază pentru elemente HTML
- Stiluri de utilitate globale

## Convenții

### Variabile CSS

Variabilele CSS sunt definite în `:root` și sunt utilizate pentru a defini culorile, spațierile și alte valori reutilizabile:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #10b981;
  --color-accent: #8b5cf6;
  --color-background: #ffffff;
  --color-text: #1f2937;
  /* ... */
}

.dark {
  --color-primary: #60a5fa;
  --color-secondary: #34d399;
  --color-accent: #a78bfa;
  --color-background: #111827;
  --color-text: #f9fafb;
  /* ... */
}
```

### Clase Utilitare

Pe lângă clasele Tailwind, avem câteva clase utilitare personalizate:

```css
.container-fluid {
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: auto;
  margin-left: auto;
}

.container {
  max-width: 1280px;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-right: auto;
  margin-left: auto;
}

/* ... */
```

### Stiluri pentru Componente

Stilurile specifice componentelor ar trebui definite în fișierele componentelor, nu în stilurile globale. Utilizați Tailwind CSS sau CSS Modules pentru stilurile specifice componentelor.
