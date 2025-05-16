# Git Hooks pentru WasteWise

Acest document descrie configurarea și utilizarea Git Hooks în proiectul WasteWise.

## Prezentare generală

Git Hooks sunt scripturi care rulează automat înainte sau după anumite comenzi Git. În proiectul WasteWise, utilizăm Husky pentru a gestiona Git Hooks și lint-staged pentru a rula verificări doar pe fișierele modificate.

## Hooks configurate

### pre-commit

Acest hook rulează înainte de a face un commit și verifică:

1. Linting și formatare pentru fișierele modificate (folosind lint-staged)
2. Verificarea tipurilor TypeScript pentru backend
3. Verificarea tipurilor TypeScript pentru frontend

### commit-msg

Acest hook verifică formatul mesajului de commit pentru a se asigura că respectă convențiile de commit.

## Instalare

Pentru a instala și configura Git Hooks, urmați acești pași:

1. Clonați repository-ul:
   ```bash
   git clone https://github.com/sfsorin/wastewise.git
   cd wastewise
   ```

2. Instalați dependențele:
   ```bash
   npm install
   ```

3. Husky ar trebui să se instaleze automat datorită script-ului `prepare` din package.json.

4. Verificați că hooks-urile sunt instalate:
   ```bash
   ls -la .husky
   ```

   Ar trebui să vedeți fișierele `pre-commit` și `commit-msg`.

## Configurare

### lint-staged

Configurația pentru lint-staged se găsește în fișierul `.lintstagedrc.js` din rădăcina proiectului. Aceasta definește ce comenzi să ruleze pentru diferite tipuri de fișiere.

```javascript
module.exports = {
  // Backend
  'backend/**/*.{js,ts}': [
    'cd backend && npm run lint:fix',
    'cd backend && npm run format',
    'cd backend && npm run test:affected',
  ],
  
  // Frontend
  'frontend/**/*.{js,ts,vue}': [
    'cd frontend && npm run lint:fix',
    'cd frontend && npm run format',
    'cd frontend && npm run test:affected',
  ],
  
  // Documentație și alte fișiere
  '**/*.{md,json,yml,yaml}': [
    'prettier --write',
  ],
};
```

### commitlint

Configurația pentru commitlint se găsește în fișierul `commitlint.config.js` din rădăcina proiectului. Aceasta definește regulile pentru mesajele de commit.

## Adăugarea de noi hooks

Pentru a adăuga un nou hook, utilizați comanda Husky:

```bash
npx husky add .husky/hook-name "comanda"
```

De exemplu, pentru a adăuga un hook pre-push:

```bash
npx husky add .husky/pre-push "cd backend && npm run test"
```

## Dezactivarea temporară a hooks

Dacă aveți nevoie să dezactivați temporar hooks-urile (nu este recomandat), puteți utiliza flag-ul `--no-verify`:

```bash
git commit --no-verify -m "Mesaj de commit"
```

## Troubleshooting

### Permisiuni de execuție

Dacă întâmpinați probleme cu permisiunile de execuție pentru hooks, rulați:

```bash
chmod +x .husky/*
```

### Hooks nu rulează

Dacă hooks-urile nu rulează, verificați:

1. Dacă Husky este instalat corect:
   ```bash
   npm list husky
   ```

2. Dacă directorul `.git/hooks` conține symlink-uri către hooks-urile Husky:
   ```bash
   ls -la .git/hooks
   ```

3. Dacă script-ul `prepare` a fost executat:
   ```bash
   npm run prepare
   ```

## Bune practici

1. **Nu dezactivați hooks-urile**: Hooks-urile sunt acolo pentru a preveni introducerea de cod de calitate slabă în repository.

2. **Faceți commit-uri mici și frecvente**: Acest lucru face ca verificările să fie mai rapide și mai ușor de gestionat.

3. **Rulați verificările local înainte de commit**: Puteți rula manual comenzile de verificare pentru a vă asigura că totul este în regulă înainte de a face commit.

4. **Actualizați configurația după necesități**: Dacă adăugați noi tipuri de fișiere sau schimbați structura proiectului, actualizați configurația lint-staged.
