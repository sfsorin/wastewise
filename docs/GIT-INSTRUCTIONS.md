# Instrucțiuni Git pentru Proiectul WasteWise

Acest document conține instrucțiuni detaliate pentru utilizarea Git în cadrul proiectului WasteWise, conform strategiei de branching adoptate.

## Configurare Inițială

### Configurare Git

```bash
# Configurare nume și email
git config --global user.name "Numele Tău"
git config --global user.email "email@example.com"

# Configurare editor (opțional)
git config --global core.editor "code --wait"  # pentru VS Code

# Configurare afișare color în terminal
git config --global color.ui auto
```

### Clonare Repository

```bash
# Clonare repository
git clone https://github.com/sfsorin/wastewise.git
cd wastewise

# Verificare branch-uri remote
git branch -a
```

## Operațiuni Zilnice

### Sincronizare cu Repository-ul Remote

```bash
# Actualizare branch curent
git pull

# Actualizare toate branch-urile
git fetch --all
```

### Lucrul cu Branch-uri

#### Crearea unui Branch pentru o Fază Nouă

```bash
# Asigură-te că ești pe branch-ul develop actualizat
git checkout develop
git pull origin develop

# Creează un branch nou pentru o fază
git checkout -b faza/1.5-autentificare

# Push la branch-ul nou pe remote
git push -u origin faza/1.5-autentificare
```

#### Crearea unui Branch pentru o Subfază

```bash
# Asigură-te că ești pe branch-ul fazei principale
git checkout faza/1.5-autentificare
git pull origin faza/1.5-autentificare

# Creează un branch nou pentru o subfază
git checkout -b faza/1.5.1-login-form

# Push la branch-ul nou pe remote
git push -u origin faza/1.5.1-login-form
```

#### Schimbarea între Branch-uri

```bash
# Listează toate branch-urile locale
git branch

# Schimbă pe un alt branch
git checkout faza/1.5-autentificare

# Creează și schimbă pe un branch nou
git checkout -b faza/1.5.2-register-form
```

### Salvarea Modificărilor

#### Verificarea Stării

```bash
# Verifică starea fișierelor modificate
git status

# Verifică diferențele
git diff
```

#### Adăugarea și Commit-ul Modificărilor

```bash
# Adaugă toate fișierele modificate
git add .

# Sau adaugă fișiere specifice
git add src/components/auth/LoginForm.tsx

# Creează un commit cu un mesaj descriptiv (folosind conventional commits)
git commit -m "feat: implementare formular de autentificare"
git commit -m "fix: corectare validare email în formularul de autentificare"
git commit -m "docs: adăugare comentarii pentru componenta LoginForm"
```

#### Push la Repository-ul Remote

```bash
# Push la branch-ul curent
git push

# Dacă branch-ul nu există pe remote
git push -u origin faza/1.5.1-login-form
```

### Integrarea Modificărilor

#### Sincronizarea cu Branch-ul Principal

```bash
# Fiind pe branch-ul tău
git checkout faza/1.5.1-login-form

# Actualizează cu modificările din develop
git pull origin develop

# Dacă apar conflicte, rezolvă-le și apoi
git add .
git commit -m "merge: rezolvare conflicte cu develop"
```

#### Merge-ul unei Subfaze în Faza Principală

```bash
# Finalizează lucrul pe subfază
git checkout faza/1.5.1-login-form
git push

# Schimbă pe branch-ul fazei principale
git checkout faza/1.5-autentificare
git pull origin faza/1.5-autentificare

# Integrează subfaza
git merge faza/1.5.1-login-form

# Rezolvă conflictele dacă apar, apoi
git push
```

#### Crearea unui Pull Request

După ce ai finalizat lucrul pe un branch și ai făcut push:

1. Accesează repository-ul pe GitHub
2. Navighează la tab-ul "Pull requests"
3. Apasă pe "New pull request"
4. Selectează branch-ul sursă (branch-ul tău) și branch-ul destinație (de obicei `develop`)
5. Completează titlul și descrierea, respectând convențiile de commit
6. Solicită revizuirea codului de la colegii de echipă
7. Apasă pe "Create pull request"

## Situații Speciale

### Salvarea Temporară a Modificărilor (Stash)

```bash
# Salvează modificările curente fără commit
git stash

# Listează stash-urile salvate
git stash list

# Aplică ultimul stash și îl păstrează în listă
git stash apply

# Aplică ultimul stash și îl elimină din listă
git stash pop

# Aplică un stash specific
git stash apply stash@{2}

# Elimină toate stash-urile
git stash clear
```

### Revenirea la o Versiune Anterioară

```bash
# Revenirea la un commit specific (fără a pierde modificările ulterioare)
git revert <commit-hash>

# Resetarea la un commit specific (ATENȚIE: se pierd modificările ulterioare)
git reset --hard <commit-hash>
```

### Rezolvarea Conflictelor

Când apare un conflict:

1. Deschide fișierele cu conflicte și caută secțiunile marcate cu `<<<<<<<`, `=======`, și `>>>>>>>`
2. Editează fișierele pentru a rezolva conflictele
3. Salvează fișierele
4. Adaugă fișierele rezolvate: `git add <fișier-rezolvat>`
5. Continuă operațiunea (merge, rebase, etc.): `git commit -m "merge: rezolvare conflicte"`

### Vizualizarea Istoricului

```bash
# Vizualizare istoric simplificat
git log --oneline

# Vizualizare istoricul unui fișier
git log --follow <fișier>

# Vizualizare grafică a istoricului
git log --graph --oneline --all
```

## Convenții de Commit

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

Exemple:
```
feat(auth): implementare formular de autentificare
fix(auth): corectare validare email în formularul de autentificare
docs(readme): actualizare instrucțiuni de instalare
```

## Resurse Utile

- [Pro Git Book](https://git-scm.com/book/en/v2) - Carte gratuită despre Git
- [Conventional Commits](https://www.conventionalcommits.org/) - Specificația pentru conventional commits
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf) - Fișă de referință Git
- [Strategia de Branching WasteWise](./BRANCHING-STRATEGY.md) - Documentul nostru de strategie de branching
