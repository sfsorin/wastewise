# Components

Acest director conține toate componentele reutilizabile ale aplicației.

Structura recomandată pentru componente:

```
components/
  ├── common/           # Componente comune utilizate în întreaga aplicație
  │   ├── Button/
  │   ├── Input/
  │   ├── Modal/
  │   └── ...
  ├── forms/            # Componente specifice formularelor
  │   ├── LoginForm/
  │   ├── RegisterForm/
  │   └── ...
  ├── layout/           # Componente de layout
  │   ├── Header/
  │   ├── Footer/
  │   ├── Sidebar/
  │   └── ...
  └── specific/         # Componente specifice anumitor funcționalități
      ├── WasteItem/
      ├── CollectionPoint/
      └── ...
```

Fiecare componentă ar trebui să fie într-un director separat care conține:
- Fișierul principal al componentei (ex: Button.tsx)
- Stilurile componentei (ex: Button.module.css)
- Testele componentei (ex: Button.test.tsx)
- Un fișier index.ts pentru export
