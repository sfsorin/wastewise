# Workflow Git și Reguli de Protecție Branch-uri

Acest document descrie workflow-ul Git utilizat în proiectul WasteWise și configurarea regulilor de protecție pentru branch-urile principale.

## Structură Branch-uri (GitFlow)

Proiectul utilizează o variantă a workflow-ului GitFlow cu următoarele branch-uri principale:

- `main`: Branch-ul principal pentru versiuni stabile, gata de producție
- `develop`: Branch-ul de dezvoltare, conține ultimele funcționalități implementate

Și următoarele branch-uri temporare:

- `feature/*`: Branch-uri pentru dezvoltarea de funcționalități noi
- `bugfix/*`: Branch-uri pentru rezolvarea bug-urilor
- `release/*`: Branch-uri pentru pregătirea versiunilor
- `hotfix/*`: Branch-uri pentru rezolvarea urgentă a bug-urilor în producție

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

## Configurare Branch Protection Rules pe GitLab

### Pentru Branch-ul `main`

1. Accesează repository-ul pe GitLab
2. Navighează la `Settings` > `Repository` > `Protected Branches`
3. La `Branch`, selectează `main`
4. Configurează următoarele setări:
   - `Allowed to merge`: Selectează rolurile care pot face merge (ex: Maintainers)
   - `Allowed to push`: Selectează "No one" pentru a preveni push-uri directe
   - ✅ `Require approval from code owners` (dacă folosiți CODEOWNERS)
   - ✅ `Code owner approval required` (dacă folosiți CODEOWNERS)
5. Apasă pe `Protect`

### Pentru Branch-ul `develop`

1. Accesează repository-ul pe GitLab
2. Navighează la `Settings` > `Repository` > `Protected Branches`
3. La `Branch`, selectează `develop`
4. Configurează următoarele setări:
   - `Allowed to merge`: Selectează rolurile care pot face merge (ex: Developers + Maintainers)
   - `Allowed to push`: Selectează "No one" pentru a preveni push-uri directe
5. Apasă pe `Protect`

## Workflow Git

### Dezvoltare Funcționalități Noi

1. Sincronizează branch-ul develop:
   ```
   git checkout develop
   git pull origin develop
   ```

2. Creează un branch nou pentru funcționalitate:
   ```
   git checkout -b feature/nume-functionalitate
   ```

3. Lucrează pe branch-ul tău și fă commit-uri regulate.

4. Sincronizează periodic cu develop:
   ```
   git checkout develop
   git pull origin develop
   git checkout feature/nume-functionalitate
   git merge develop
   ```

5. Când funcționalitatea este gata, creează un Pull Request către develop.

### Rezolvare Bug-uri

1. Sincronizează branch-ul develop:
   ```
   git checkout develop
   git pull origin develop
   ```

2. Creează un branch nou pentru bug fix:
   ```
   git checkout -b bugfix/descriere-bug
   ```

3. Rezolvă bug-ul și fă commit.

4. Creează un Pull Request către develop.

### Pregătire Release

1. Creează un branch de release din develop:
   ```
   git checkout develop
   git pull origin develop
   git checkout -b release/v1.0.0
   ```

2. Fă ajustările necesare pentru release (versiune, documentație, etc.).

3. Creează un Pull Request către main.

4. După merge în main, creează un tag pentru versiune:
   ```
   git checkout main
   git pull origin main
   git tag -a v1.0.0 -m "Versiunea 1.0.0"
   git push origin v1.0.0
   ```

5. Sincronizează develop cu main:
   ```
   git checkout develop
   git merge main
   git push origin develop
   ```

### Hotfix-uri

1. Creează un branch de hotfix din main:
   ```
   git checkout main
   git pull origin main
   git checkout -b hotfix/descriere-problema
   ```

2. Rezolvă problema și fă commit.

3. Creează un Pull Request către main.

4. După merge în main, creează un tag pentru versiune:
   ```
   git checkout main
   git pull origin main
   git tag -a v1.0.1 -m "Versiunea 1.0.1"
   git push origin v1.0.1
   ```

5. Sincronizează develop cu main:
   ```
   git checkout develop
   git merge main
   git push origin develop
   ```
