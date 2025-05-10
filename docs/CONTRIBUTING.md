# Ghid de Contribuție pentru WasteWise

Mulțumim pentru interesul de a contribui la proiectul WasteWise! Acest document oferă informații despre cum puteți contribui eficient la dezvoltarea aplicației.

## Cuprins

- [Cod de Conduită](#cod-de-conduită)
- [Cum să Contribui](#cum-să-contribui)
- [Raportarea Bug-urilor](#raportarea-bug-urilor)
- [Sugestii de Îmbunătățiri](#sugestii-de-îmbunătățiri)
- [Procesul de Dezvoltare](#procesul-de-dezvoltare)
- [Convenții de Cod](#convenții-de-cod)
- [Procesul de Pull Request](#procesul-de-pull-request)
- [Structura Proiectului](#structura-proiectului)

## Cod de Conduită

Acest proiect aderă la un cod de conduită care promovează un mediu deschis și primitor. Participanții trebuie să respecte următoarele principii:

- Folosiți un limbaj incluziv și respectuos
- Respectați diferite puncte de vedere și experiențe
- Acceptați cu grație critica constructivă
- Concentrați-vă pe ceea ce este mai bun pentru comunitate
- Arătați empatie față de ceilalți membri ai comunității

## Cum să Contribui

Există mai multe modalități prin care puteți contribui la WasteWise:

1. **Raportarea bug-urilor**: Raportați probleme sau erori pe care le-ați identificat
2. **Sugestii de îmbunătățiri**: Propuneți noi funcționalități sau îmbunătățiri
3. **Contribuții de cod**: Implementați funcționalități noi sau rezolvați bug-uri existente
4. **Îmbunătățirea documentației**: Ajutați la îmbunătățirea sau traducerea documentației
5. **Testare**: Testați aplicația și raportați rezultatele

## Raportarea Bug-urilor

Bug-urile sunt raportate prin intermediul sistemului de issue-uri. Când raportați un bug, vă rugăm să includeți:

- Un titlu clar și descriptiv
- Pași detaliați pentru a reproduce problema
- Comportamentul așteptat vs. comportamentul observat
- Capturi de ecran (dacă este cazul)
- Informații despre mediul de execuție (browser, sistem de operare, etc.)
- Orice alte informații relevante

## Sugestii de Îmbunătățiri

Sugestiile de îmbunătățiri sunt, de asemenea, gestionate prin sistemul de issue-uri. Când propuneți o îmbunătățire, vă rugăm să includeți:

- O descriere clară a funcționalității propuse
- Justificarea necesității acestei funcționalități
- Descrierea comportamentului așteptat
- Exemple de utilizare (dacă este cazul)
- Mockup-uri sau wireframe-uri (dacă este cazul)

## Procesul de Dezvoltare

Procesul nostru de dezvoltare urmează modelul GitFlow:

1. `master` - Ramura principală care conține codul stabil, gata de producție
2. `develop` - Ramura de dezvoltare, unde sunt integrate toate funcționalitățile
3. `feature/*` - Ramuri pentru dezvoltarea de noi funcționalități
4. `bugfix/*` - Ramuri pentru rezolvarea bug-urilor
5. `release/*` - Ramuri pentru pregătirea versiunilor de lansare
6. `hotfix/*` - Ramuri pentru rezolvarea urgentă a bug-urilor critice din producție

### Workflow

1. Creați un fork al repository-ului
2. Creați o ramură din `develop` pentru funcționalitatea sau bug-ul la care lucrați
3. Implementați modificările
4. Asigurați-vă că toate testele trec
5. Creați un Pull Request către ramura `develop`

## Convenții de Cod

### Convenții Generale

- Folosiți indentare de 2 spații
- Folosiți line endings LF (Unix-style)
- Eliminați spațiile albe de la sfârșitul liniilor
- Adăugați o linie nouă la sfârșitul fișierelor
- Limitați lungimea liniilor la 100 de caractere

### Backend (NestJS/TypeScript)

- Urmați [Ghidul de Stil TypeScript](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md)
- Folosiți decoratori NestJS conform documentației oficiale
- Organizați codul în module, controllers, services, etc.
- Scrieți teste unitare pentru toate componentele
- Documentați API-urile folosind decoratori Swagger

### Frontend (React/TypeScript)

- Urmați [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- Folosiți componente funcționale și hooks
- Organizați codul în componente, hooks, stores, etc.
- Scrieți teste unitare pentru toate componentele
- Folosiți Tailwind CSS pentru stilizare

### Convenții de Commit

Folosim [Conventional Commits](https://www.conventionalcommits.org/) pentru mesajele de commit:

```
<tip>(<scop>): <descriere>

[corp opțional]

[footer opțional]
```

Tipuri de commit:

- `feat`: O nouă funcționalitate
- `fix`: Rezolvarea unui bug
- `docs`: Modificări doar în documentație
- `style`: Modificări care nu afectează sensul codului (spații, formatare, etc.)
- `refactor`: Modificări de cod care nu rezolvă bug-uri și nu adaugă funcționalități
- `perf`: Modificări care îmbunătățesc performanța
- `test`: Adăugarea sau corectarea testelor
- `chore`: Modificări în procesul de build sau în unelte auxiliare

## Procesul de Pull Request

1. Asigurați-vă că codul respectă convențiile de cod
2. Asigurați-vă că toate testele trec
3. Actualizați documentația, dacă este necesar
4. Creați un Pull Request cu o descriere clară a modificărilor
5. Așteptați review-ul și adresați feedback-ul primit
6. După aprobare, un maintainer va face merge-ul modificărilor

## Structura Proiectului

```
wastewise/
├── backend/               # Codul backend (NestJS)
│   ├── src/
│   │   ├── config/        # Configurații
│   │   ├── modules/       # Module NestJS
│   │   ├── common/        # Componente comune (guards, filters, etc.)
│   │   └── main.ts        # Punct de intrare
│   ├── test/              # Teste
│   └── package.json
├── frontend/              # Codul frontend (React)
│   ├── public/            # Fișiere statice
│   ├── src/
│   │   ├── components/    # Componente React
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Pagini
│   │   ├── stores/        # State management (Zustand)
│   │   └── App.tsx        # Componenta principală
│   └── package.json
├── ml-service/            # Serviciul de Machine Learning (Python)
│   ├── app/
│   │   ├── models/        # Modele ML
│   │   ├── api/           # API FastAPI
│   │   └── utils/         # Utilități
│   └── requirements.txt
├── docs/                  # Documentație
│   ├── checklist-faza*.md # Checklist-uri pentru faze
│   ├── architecture/      # Diagrame de arhitectură
│   ├── api/               # Documentație API
│   └── CONTRIBUTING.md    # Ghid de contribuție
├── docker-compose.yml     # Configurație Docker Compose
└── README.md              # Documentație principală
```

Mulțumim pentru contribuția dumneavoastră la WasteWise!
