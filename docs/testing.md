# Testarea aplicației WasteWise

Acest document descrie procesul de testare a aplicației WasteWise, inclusiv testele unitare, de integrare și end-to-end.

## Structura testelor

Testele sunt organizate în următoarele categorii:

1. **Teste unitare backend** - Testează componentele individuale din backend (servicii, controllere, etc.)
2. **Teste unitare frontend** - Testează componentele individuale din frontend (componente, servicii, store-uri, etc.)
3. **Teste de integrare backend** - Testează interacțiunea între componentele backend
4. **Teste end-to-end** - Testează fluxurile complete ale aplicației

## Rularea testelor

### Backend

Pentru a rula toate testele backend:

```bash
cd backend
npm test
```

Pentru a rula testele cu watch mode (util în timpul dezvoltării):

```bash
cd backend
npm run test:watch
```

Pentru a rula testele cu coverage:

```bash
cd backend
npm run test:cov
```

Pentru a rula doar testele pentru modulul de autentificare:

```bash
cd backend
npm run test:auth
```

Pentru a rula testele end-to-end:

```bash
cd backend
npm run test:e2e
```

Pentru a rula doar testele end-to-end pentru autentificare:

```bash
cd backend
npm run test:auth:e2e
```

### Frontend

Pentru a rula toate testele frontend:

```bash
cd frontend
npm test
```

Pentru a rula testele cu watch mode (util în timpul dezvoltării):

```bash
cd frontend
npm run test:watch
```

Pentru a rula testele cu coverage:

```bash
cd frontend
npm run test:coverage
```

Pentru a rula doar testele pentru autentificare:

```bash
cd frontend
npm run test:auth
```

Pentru a rula testele end-to-end cu Cypress în modul interactiv:

```bash
cd frontend
npm run cypress:open
```

Pentru a rula testele end-to-end cu Cypress în modul headless:

```bash
cd frontend
npm run cypress:run
```

## Testarea modulului de autentificare

### Backend

Testele unitare pentru modulul de autentificare verifică:

1. **AuthService** - Testează funcționalitățile de autentificare, înregistrare, validare utilizator, resetare parolă, etc.
2. **UsersService** - Testează funcționalitățile de gestionare a utilizatorilor, creare token de resetare parolă, etc.
3. **AuthController** - Testează endpoint-urile API pentru autentificare, înregistrare, profil utilizator, etc.

Testele de integrare verifică fluxurile complete:

1. **Înregistrare utilizator** - Testează înregistrarea unui utilizator nou
2. **Autentificare utilizator** - Testează autentificarea unui utilizator existent
3. **Resetare parolă** - Testează fluxul complet de resetare a parolei

### Frontend

Testele unitare pentru modulul de autentificare verifică:

1. **authService** - Testează funcționalitățile de comunicare cu API-ul de autentificare
2. **authStore** - Testează gestionarea stării de autentificare
3. **Componente** - Testează componentele de autentificare (LoginPage, RegisterPage, etc.)

Testele end-to-end verifică fluxurile complete:

1. **Înregistrare utilizator** - Testează înregistrarea unui utilizator nou
2. **Autentificare utilizator** - Testează autentificarea unui utilizator existent
3. **Resetare parolă** - Testează fluxul complet de resetare a parolei
4. **Protecție rute** - Testează protecția rutelor care necesită autentificare

## Acoperire teste

Obiectivul este să menținem o acoperire de cel puțin:

- 70% pentru linii de cod
- 60% pentru ramuri (branches)
- 70% pentru funcții
- 70% pentru statements

Rapoartele de acoperire pot fi generate cu:

```bash
# Backend
cd backend
npm run test:cov

# Frontend
cd frontend
npm run test:coverage
```

## Bune practici pentru testare

1. **Testați comportamentul, nu implementarea** - Testele ar trebui să verifice ce face codul, nu cum face.
2. **Folosiți mocks pentru dependențe externe** - Izolați componentele testate folosind mocks pentru dependențele externe.
3. **Testați cazurile de eroare** - Nu testați doar cazurile de succes, ci și cazurile de eroare.
4. **Păstrați testele independente** - Fiecare test ar trebui să fie independent de celelalte teste.
5. **Folosiți setup și teardown** - Folosiți funcțiile beforeEach, afterEach, beforeAll și afterAll pentru a pregăti și curăța mediul de testare.
6. **Scrieți teste clare și concise** - Testele ar trebui să fie ușor de înțeles și să aibă un scop clar.
7. **Rulați testele frecvent** - Rulați testele frecvent pentru a detecta problemele devreme.

## Troubleshooting

### Probleme comune și soluții

1. **Testele eșuează din cauza dependențelor externe** - Asigurați-vă că toate dependențele externe sunt mock-uite corect.
2. **Testele sunt lente** - Folosiți mocks pentru a evita apelurile reale la API sau baza de date.
3. **Testele sunt instabile** - Asigurați-vă că testele sunt independente și nu depind de starea altor teste.
4. **Testele end-to-end eșuează** - Verificați că aplicația rulează corect și că selectorii CSS sunt corecți.

### Resurse utile

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Vitest Documentation](https://vitest.dev/guide/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress Documentation](https://docs.cypress.io/guides/overview/why-cypress)
