# Configurare Tailwind CSS în WasteWise

Acest document descrie configurarea și utilizarea Tailwind CSS în aplicația WasteWise.

## Configurare

Tailwind CSS este configurat cu următoarele funcționalități:

- **Dark Mode**: Suport pentru temă întunecată folosind clasa `dark`
- **Container Queries**: Suport pentru stilizare bazată pe dimensiunea containerului
- **Typography Plugin**: Suport pentru stilizarea conținutului bogat în text
- **Forms Plugin**: Stiluri îmbunătățite pentru elemente de formular
- **Aspect Ratio Plugin**: Suport pentru menținerea raportului de aspect
- **Culori personalizate**: Scheme de culori pentru primary, secondary și accent

## Fișiere de configurare

### tailwind.config.js

Fișierul principal de configurare pentru Tailwind CSS:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          // Nuanțe de verde
          500: '#22c55e',
          600: '#16a34a',
          // ...
        },
        secondary: {
          // Nuanțe de albastru
          500: '#0ea5e9',
          600: '#0284c7',
          // ...
        },
        accent: {
          // Nuanțe de galben
          500: '#f59e0b',
          600: '#d97706',
          // ...
        },
      },
      // Alte extensii de temă...
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
};
```

### postcss.config.js

Configurarea PostCSS pentru procesarea CSS:

```javascript
export default {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'default' } } : {}),
  },
};
```

### src/index.css

Fișierul CSS principal care importă Tailwind și definește stiluri personalizate:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Stiluri de bază */
}

@layer components {
  /* Componente personalizate */
  .btn {
    @apply inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors;
  }

  .btn-primary {
    @apply btn bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
  }

  /* Alte componente... */
}

/* Dark mode */
.dark {
  @apply bg-gray-900 text-gray-100;
}
```

## Utilizare

### Clase utilitare

Tailwind CSS oferă clase utilitare pentru stilizare rapidă:

```jsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-800">Titlu</h2>
  <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
    Acțiune
  </button>
</div>
```

### Componente predefinite

Am creat componente reutilizabile care folosesc clasele Tailwind:

```jsx
<Button 
  label="Trimite" 
  variant="primary" 
  size="md" 
  onClick={handleSubmit} 
/>

<Card 
  title="Informații" 
  withShadow={true} 
  padding="large"
>
  Conținut card
</Card>
```

### Dark Mode

Modul întunecat este implementat folosind clasa `dark` pe elementul `html`:

```jsx
// ThemeToggle.tsx
const toggleTheme = () => {
  if (isDarkMode) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
  setIsDarkMode(!isDarkMode);
};
```

Stilurile pentru dark mode sunt definite folosind prefixul `dark:`:

```jsx
<div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
  Conținut care se adaptează la tema curentă
</div>
```

## Bune practici

1. **Folosiți clasele predefinite** pentru consistență: `btn`, `btn-primary`, `card`, etc.
2. **Evitați stilurile inline** și folosiți clasele Tailwind
3. **Grupați clasele logice** pentru lizibilitate:
   ```jsx
   <div className={`
     flex items-center p-4 rounded-lg 
     bg-white dark:bg-gray-800 
     shadow-md hover:shadow-lg transition-shadow
   `}>
   ```
4. **Folosiți @apply** în CSS pentru componente reutilizabile
5. **Testați în ambele moduri** (light și dark) pentru a asigura contrast și lizibilitate

## Resurse

- [Documentație oficială Tailwind CSS](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/) - Componente premium
- [Heroicons](https://heroicons.com/) - Iconițe SVG compatibile cu Tailwind
