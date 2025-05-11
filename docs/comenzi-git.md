# Documentație Comenzi Git

Acest document conține o listă a comenzilor Git utilizate în proiectul WasteWise, împreună cu descrierea și exemple de utilizare.

## Cuprins

1. [Comenzi de bază](#comenzi-de-bază)
2. [Lucrul cu branch-uri](#lucrul-cu-branch-uri)
3. [Gestionarea modificărilor](#gestionarea-modificărilor)
4. [Lucrul cu remote repository](#lucrul-cu-remote-repository)
5. [Inspecția și compararea](#inspecția-și-compararea)
6. [Revenirea la versiuni anterioare](#revenirea-la-versiuni-anterioare)
7. [Configurare Git](#configurare-git)

## Comenzi de bază

### `git init`

**Descriere**: Inițializează un nou repository Git în directorul curent.
**Exemplu**: `git init`
**Utilizare în proiect**: Folosit pentru a crea repository-ul inițial WasteWise.

### `git clone`

**Descriere**: Clonează un repository existent într-un director nou.
**Exemplu**: `git clone https://github.com/sfsorin/wastewise.git`
**Utilizare în proiect**: Folosit pentru a obține o copie locală a repository-ului WasteWise.

### `git add`

**Descriere**: Adaugă fișiere în staging area pentru a fi incluse în următorul commit.
**Exemple**:

- `git add .` - adaugă toate fișierele modificate
- `git add frontend/src/index.css` - adaugă un fișier specific
- `git add frontend/` - adaugă toate fișierele modificate din directorul frontend
  **Utilizare în proiect**: Folosit pentru a pregăti fișierele modificate pentru commit.

### `git commit`

**Descriere**: Salvează modificările din staging area într-un commit.
**Exemple**:

- `git commit -m "Configurare Tailwind CSS"` - commit cu mesaj scurt
- `git commit -am "Actualizare configurație ESLint"` - adaugă toate fișierele modificate și face commit
  **Utilizare în proiect**: Folosit pentru a salva modificările în istoricul Git.

## Lucrul cu branch-uri

### `git branch`

**Descriere**: Listează, creează sau șterge branch-uri.
**Exemple**:

- `git branch` - listează branch-urile locale
- `git branch -a` - listează toate branch-urile (locale și remote)
- `git branch feature/tailwind-config` - creează un branch nou
  **Utilizare în proiect**: Folosit pentru a gestiona branch-urile proiectului.

### `git checkout`

**Descriere**: Comută între branch-uri sau restaurează fișiere.
**Exemple**:

- `git checkout develop` - comută la branch-ul develop
- `git checkout -b feature/react-router` - creează și comută la un branch nou
- `git checkout -- frontend/src/index.css` - restaurează un fișier la versiunea din ultimul commit
  **Utilizare în proiect**: Folosit pentru a comuta între branch-uri și a restaura fișiere.

### `git merge`

**Descriere**: Combină modificările din două branch-uri.
**Exemplu**: `git merge feature/tailwind-config`
**Utilizare în proiect**: Folosit pentru a integra modificările din branch-urile de feature în branch-ul develop.

## Gestionarea modificărilor

### `git status`

**Descriere**: Afișează starea fișierelor din directorul de lucru.
**Exemplu**: `git status`
**Utilizare în proiect**: Folosit frecvent pentru a verifica ce fișiere au fost modificate.

### `git diff`

**Descriere**: Afișează diferențele între directorul de lucru și staging area sau între commit-uri.
**Exemple**:

- `git diff` - afișează modificările care nu au fost adăugate în staging area
- `git diff --staged` - afișează modificările din staging area
- `git diff HEAD~1 HEAD` - afișează diferențele între ultimele două commit-uri
  **Utilizare în proiect**: Folosit pentru a verifica modificările înainte de commit.

### `git stash`

**Descriere**: Salvează temporar modificările care nu sunt gata pentru commit.
**Exemple**:

- `git stash` - salvează modificările curente
- `git stash pop` - aplică și elimină ultima salvare
- `git stash list` - listează toate salvările
  **Utilizare în proiect**: Folosit pentru a salva temporar modificările când trebuie să comutăm între branch-uri.

## Lucrul cu remote repository

### `git remote`

**Descriere**: Gestionează repository-urile remote.
**Exemple**:

- `git remote -v` - afișează repository-urile remote
- `git remote add origin https://github.com/sfsorin/wastewise.git` - adaugă un repository remote
  **Utilizare în proiect**: Folosit pentru a configura repository-ul remote.

### `git push`

**Descriere**: Trimite commit-urile locale la repository-ul remote.
**Exemple**:

- `git push origin develop` - trimite branch-ul develop la repository-ul remote
- `git push -u origin feature/tailwind-config` - trimite și setează upstream pentru un branch nou
  **Utilizare în proiect**: Folosit pentru a publica modificările în repository-ul remote.

### `git pull`

**Descriere**: Preia și integrează modificările din repository-ul remote.
**Exemplu**: `git pull origin develop`
**Utilizare în proiect**: Folosit pentru a actualiza repository-ul local cu modificările din repository-ul remote.

### `git fetch`

**Descriere**: Preia modificările din repository-ul remote fără a le integra.
**Exemplu**: `git fetch origin`
**Utilizare în proiect**: Folosit pentru a verifica modificările din repository-ul remote înainte de a le integra.

## Inspecția și compararea

### `git log`

**Descriere**: Afișează istoricul commit-urilor.
**Exemple**:

- `git log` - afișează istoricul complet
- `git log --oneline` - afișează istoricul în format compact
- `git log --graph --oneline` - afișează istoricul în format grafic
  **Utilizare în proiect**: Folosit pentru a vizualiza istoricul modificărilor.

### `git show`

**Descriere**: Afișează informații despre un commit.
**Exemplu**: `git show cc947fd`
**Utilizare în proiect**: Folosit pentru a examina detaliile unui commit specific.

## Revenirea la versiuni anterioare

### `git reset`

**Descriere**: Resetează HEAD la un commit specific.
**Exemple**:

- `git reset --hard f58a68f` - resetează complet la commit-ul specificat, eliminând toate modificările
- `git reset --soft HEAD~1` - anulează ultimul commit, păstrând modificările în staging area
  **Utilizare în proiect**: Folosit pentru a reveni la versiuni anterioare ale codului.

### `git revert`

**Descriere**: Creează un nou commit care anulează modificările dintr-un commit anterior.
**Exemplu**: `git revert cc947fd`
**Utilizare în proiect**: Folosit pentru a anula modificări într-un mod sigur, fără a modifica istoricul.

## Configurare Git

### `git config`

**Descriere**: Configurează opțiunile Git.
**Exemple**:

- `git config --global user.name "Sorin"` - setează numele utilizatorului
- `git config --global user.email "sf.stanciu@gmail.com"` - setează adresa de email
- `git config --list` - afișează configurația curentă
  **Utilizare în proiect**: Folosit pentru a configura Git pentru proiectul WasteWise.

## Comenzi avansate

### `git rebase`

**Descriere**: Reaplică commit-urile pe o bază nouă.
**Exemplu**: `git rebase develop`
**Utilizare în proiect**: Folosit pentru a menține un istoric curat și linear.

### `git cherry-pick`

**Descriere**: Aplică modificările dintr-un commit specific.
**Exemplu**: `git cherry-pick cc947fd`
**Utilizare în proiect**: Folosit pentru a aplica modificări specifice din alte branch-uri.

### `git tag`

**Descriere**: Creează, listează sau șterge tag-uri.
**Exemple**:

- `git tag v1.0.0` - creează un tag simplu
- `git tag -a v1.0.0 -m "Versiunea 1.0.0"` - creează un tag anotat
- `git tag -l` - listează toate tag-urile
  **Utilizare în proiect**: Folosit pentru a marca versiuni importante ale proiectului.

## Istoricul proiectului WasteWise

Aceasta este o listă a commit-urilor importante din proiect, care pot fi folosite ca puncte de referință pentru a reveni la o anumită versiune a codului folosind comanda `git reset --hard <hash_commit>`.

| Hash Commit | Descriere                                                                | Comandă pentru revenire    |
| ----------- | ------------------------------------------------------------------------ | -------------------------- |
| `cc947fd`   | Configurare Tailwind CSS cu suport pentru dark mode și container queries | `git reset --hard cc947fd` |
| `f58a68f`   | Configurare Vitest și React Testing Library pentru frontend              | `git reset --hard f58a68f` |
| `f37c06f`   | Redenumire director shared în common conform standardelor NestJS         | `git reset --hard f37c06f` |
| `9fd86c0`   | Redenumire director common în shared și actualizare nume bază de date    | `git reset --hard 9fd86c0` |
| `833843a`   | Configurare husky pre-commit hook pentru linting                         | `git reset --hard 833843a` |
| `d848ec1`   | Configurare ESLint și Prettier pentru frontend                           | `git reset --hard d848ec1` |
| `ad0692a`   | Corectarea discrepanțelor între configurațiile backend și frontend       | `git reset --hard ad0692a` |
| `3148bb1`   | Actualizare target ES la ES2023 pentru consistență cu backend            | `git reset --hard 3148bb1` |
| `3c04801`   | Configurare TypeScript și tsconfig.json pentru frontend                  | `git reset --hard 3c04801` |
| `fd1398b`   | Inițializare proiect React cu Vite                                       | `git reset --hard fd1398b` |

### Cum să folosiți acest istoric

Pentru a reveni la o versiune specifică a codului:

1. Verificați că nu aveți modificări necommit-uite folosind `git status`
2. Executați comanda `git reset --hard <hash_commit>` cu hash-ul commit-ului dorit
3. Codul va fi resetat la starea din commit-ul respectiv

**Notă**: Folosirea comenzii `git reset --hard` va șterge toate modificările necommit-uite. Dacă aveți modificări pe care doriți să le păstrați, folosiți `git stash` înainte de reset.

## Resurse suplimentare

- [Documentația oficială Git](https://git-scm.com/doc)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Pro Git Book](https://git-scm.com/book/en/v2)
