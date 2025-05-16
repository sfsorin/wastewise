# Convenții de Branching și Merge pentru WasteWise

Acest document definește convențiile de branching și merge pentru proiectul WasteWise, cu scopul de a minimiza conflictele între ramuri și de a menține un flux de lucru eficient.

## Structura ramurilor

Proiectul WasteWise utilizează o strategie de branching bazată pe Git Flow, cu următoarea structură:

```
main
  └── develop
       ├── feature/*
       ├── bugfix/*
       ├── hotfix/*
       └── release/*
```

### Ramuri principale

- **main**: Conține codul stabil, de producție. Această ramură este protejată și nu permite push-uri directe.
- **develop**: Ramura principală de dezvoltare. Toate funcționalitățile și corectările sunt integrate mai întâi în această ramură.

### Ramuri temporare

- **feature/\***: Ramuri pentru dezvoltarea de funcționalități noi.
- **bugfix/\***: Ramuri pentru rezolvarea bug-urilor identificate în develop.
- **hotfix/\***: Ramuri pentru rezolvarea urgentă a problemelor critice din producție (din main).
- **release/\***: Ramuri pentru pregătirea versiunilor de lansare.

## Convenții de denumire

### Ramuri feature

Format: `feature/<id-ticket>-<descriere-scurta>`

Exemple:

- `feature/WW-123-implementare-autentificare-jwt`
- `feature/WW-124-adaugare-guards-autorizare`

### Ramuri bugfix

Format: `bugfix/<id-ticket>-<descriere-scurta>`

Exemple:

- `bugfix/WW-125-corectare-functie-duplicata`
- `bugfix/WW-126-rezolvare-eroare-validare`

### Ramuri hotfix

Format: `hotfix/<id-ticket>-<descriere-scurta>`

Exemple:

- `hotfix/WW-127-corectare-vulnerabilitate-securitate`
- `hotfix/WW-128-rezolvare-crash-productie`

### Ramuri release

Format: `release/v<versiune-majora>.<versiune-minora>.<patch>`

Exemple:

- `release/v1.0.0`
- `release/v1.1.0`

## Procesul de creare și integrare a ramurilor

### Crearea unei ramuri feature

```bash
# Asigurați-vă că sunteți pe develop și că este actualizat
git checkout develop
git pull

# Creați ramura feature
git checkout -b feature/WW-123-implementare-autentificare-jwt

# Lucrați la funcționalitate și faceți commit-uri frecvente
git add .
git commit -m "WW-123: Implementare serviciu autentificare"

# Actualizați ramura feature cu ultimele modificări din develop (rebase)
git checkout develop
git pull
git checkout feature/WW-123-implementare-autentificare-jwt
git rebase develop

# Rezolvați eventualele conflicte și continuați rebase-ul
git rebase --continue

# Push la ramura feature
git push -u origin feature/WW-123-implementare-autentificare-jwt
```

### Crearea unui Pull Request

1. Accesați GitHub și navigați la repository-ul WasteWise
2. Creați un nou Pull Request din ramura feature către develop
3. Completați template-ul de PR cu informațiile necesare:
   - Descrierea modificărilor
   - Link către ticket-ul asociat
   - Pași pentru testare
   - Screenshot-uri (dacă este cazul)
4. Atribuiți PR-ul către un reviewer
5. Adăugați etichete relevante

### Procesul de review

1. Reviewerul verifică codul și lasă comentarii
2. Autorul face modificările necesare și răspunde la comentarii
3. Când toate comentariile sunt rezolvate, reviewerul aprobă PR-ul
4. Autorul face merge-ul PR-ului în develop

### Procesul de merge

```bash
# Opțiunea 1: Merge prin GitHub UI (recomandată)
# Utilizați butonul "Merge pull request" din interfața GitHub

# Opțiunea 2: Merge local (doar în cazuri speciale)
git checkout develop
git merge --no-ff feature/WW-123-implementare-autentificare-jwt
git push origin develop
```

## Reguli pentru commit-uri

### Format

Format: `<id-ticket>: <descriere-scurta>`

Exemple:

- `WW-123: Implementare serviciu autentificare`
- `WW-124: Adăugare guards pentru autorizare`

### Dimensiune și frecvență

- Faceți commit-uri mici și frecvente
- Fiecare commit ar trebui să reprezinte o modificare logică și completă
- Evitați commit-uri care conțin modificări necorelate
- Limitați dimensiunea commit-urilor la maxim 300 de linii modificate

### Mesaje de commit

- Utilizați timpul prezent ("Adaugă", nu "A adăugat")
- Prima linie nu trebuie să depășească 72 de caractere
- Dacă este necesar, adăugați detalii suplimentare după prima linie, separate printr-o linie goală

## Proceduri pentru rezolvarea conflictelor

### Prevenirea conflictelor

- Comunicați cu echipa despre fișierele la care lucrați
- Faceți rebase frecvent din develop în ramura feature
- Împărțiți funcționalitățile mari în mai multe ramuri mici
- Evitați modificarea acelorași fișiere în ramuri diferite

### Rezolvarea conflictelor la rebase

```bash
# În timpul unui rebase, pot apărea conflicte
git rebase develop

# Dacă apar conflicte, rezolvați-le manual în fișierele afectate
# După rezolvare, adăugați fișierele și continuați rebase-ul
git add <fisiere-rezolvate>
git rebase --continue

# Dacă doriți să anulați rebase-ul
git rebase --abort
```

### Rezolvarea conflictelor la merge

```bash
# În timpul unui merge, pot apărea conflicte
git merge feature/WW-123-implementare-autentificare-jwt

# Dacă apar conflicte, rezolvați-le manual în fișierele afectate
# După rezolvare, adăugați fișierele și finalizați merge-ul
git add <fisiere-rezolvate>
git merge --continue

# Dacă doriți să anulați merge-ul
git merge --abort
```

## Responsabilitățile membrilor echipei

### Dezvoltatori

- Creează ramuri feature/bugfix conform convențiilor
- Face commit-uri frecvente și respectă formatul de mesaje
- Face rebase frecvent din develop
- Rezolvă conflictele în ramurile proprii
- Creează PR-uri complete și bine documentate
- Răspunde prompt la comentariile de review

### Revieweri

- Verifică codul în termen de maxim 24 de ore
- Oferă feedback constructiv și clar
- Verifică respectarea standardelor de cod
- Verifică funcționalitatea conform specificațiilor
- Aprobă PR-ul doar când toate problemele sunt rezolvate

### Tech Lead

- Menține acest document actualizat
- Asigură respectarea convențiilor de către toți membrii echipei
- Rezolvă disputele legate de procesul de dezvoltare
- Aprobă și face merge pentru PR-urile complexe sau cu impact major
- Gestionează ramurile release și hotfix

## Configurare Branch Protection Rules pe GitHub

### Pentru Branch-ul `main`

1. Accesează repository-ul pe GitHub
2. Navighează la `Settings` > `Branches`
3. Apasă pe `Add rule` sau `Add branch protection rule`
4. La `Branch name pattern`, introdu `main`
5. Configurează următoarele setări:
   - ✅ `Require pull request reviews before merging`
     - ✅ `Require approvals` (setează la 1 sau mai multe)
     - ✅ `Dismiss stale pull request approvals when new commits are pushed`
     - ✅ `Require review from Code Owners` (dacă folosiți CODEOWNERS)
   - ✅ `Require status checks to pass before merging`
     - ✅ `Require branches to be up to date before merging`
     - Adaugă status checks relevante (ex: teste, linting)
   - ✅ `Require linear history`
   - ✅ `Include administrators`
   - ✅ `Restrict who can push to matching branches` (opțional, dacă doriți să limitați accesul)
6. Apasă pe `Create` sau `Save changes`

### Pentru Branch-ul `develop`

1. Accesează repository-ul pe GitHub
2. Navighează la `Settings` > `Branches`
3. Apasă pe `Add rule` sau `Add branch protection rule`
4. La `Branch name pattern`, introdu `develop`
5. Configurează următoarele setări:
   - ✅ `Require pull request reviews before merging`
     - ✅ `Require approvals` (setează la 1)
     - ✅ `Dismiss stale pull request approvals when new commits are pushed`
   - ✅ `Require status checks to pass before merging`
     - ✅ `Require branches to be up to date before merging`
     - Adaugă status checks relevante (ex: teste, linting)
6. Apasă pe `Create` sau `Save changes`

## Configurare CODEOWNERS

Creați un fișier `.github/CODEOWNERS` pentru a desemna responsabili pentru diferite părți ale codului:

```
# Exemplu de fișier CODEOWNERS

# Responsabili pentru tot codul implicit
*       @tech-lead

# Responsabili pentru backend
/backend/  @backend-team-lead

# Responsabili pentru frontend
/frontend/ @frontend-team-lead

# Responsabili pentru documentație
/docs/     @project-manager @tech-lead

# Responsabili pentru configurația CI/CD
/.github/  @devops-engineer
```

## Fluxuri de lucru specifice

### Flux de lucru pentru funcționalități noi

1. Creați o ramură feature din develop
2. Implementați funcționalitatea
3. Faceți rebase frecvent din develop
4. Creați un PR către develop
5. După aprobare, faceți merge în develop

### Flux de lucru pentru bug-uri

1. Creați o ramură bugfix din develop
2. Implementați corectarea
3. Faceți rebase frecvent din develop
4. Creați un PR către develop
5. După aprobare, faceți merge în develop

### Flux de lucru pentru hotfix-uri

1. Creați o ramură hotfix din main
2. Implementați corectarea
3. Creați un PR către main
4. După aprobare, faceți merge în main
5. Faceți merge și în develop pentru a păstra modificările

### Flux de lucru pentru release

1. Creați o ramură release din develop
2. Faceți ajustările finale și pregătirile pentru lansare
3. Creați un PR către main
4. După aprobare, faceți merge în main
5. Creați un tag pentru versiune
6. Faceți merge și în develop pentru a păstra modificările

## Bune practici

- Utilizați `git rebase` în loc de `git merge` pentru a menține un istoric linear
- Faceți push frecvent la ramurile feature pentru a evita pierderea muncii
- Utilizați `git pull --rebase` pentru a evita commit-uri de merge inutile
- Testați codul înainte de a crea PR-ul
- Actualizați documentația odată cu codul
- Utilizați pre-commit hooks pentru verificarea stilului și a calității codului
