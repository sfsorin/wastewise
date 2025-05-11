# Strategia de Branching pentru Proiectul WasteWise

Acest document descrie strategia de branching folosită pentru dezvoltarea proiectului WasteWise.

## Structura Branch-urilor

### Branch-uri Principale

- **main/master**: Conține codul stabil, gata de producție
- **develop**: Branch-ul principal pentru integrarea continuă, toate fazele finalizate sunt integrate aici

### Branch-uri pentru Faze

Fiecare fază majoră are propriul branch, cu următoarea convenție de denumire:

- `faza/X.Y-nume-faza`

Exemple:
- `faza/1.1-configurare-git`
- `faza/1.2-setup-backend`
- `faza/1.3-setup-frontend`
- `faza/1.4-structura-directoare`

### Branch-uri pentru Subfaze

Pentru faze mai complexe, sunt create branch-uri pentru subfaze:

- `faza/X.Y.Z-nume-subfaza`

Exemple:
- `faza/1.3.1-initializare-react`
- `faza/1.3.2-typescript-config`
- `faza/1.3.3-eslint-prettier`
- `faza/1.3.4-testing-config`
- `faza/1.3.5-tailwind-css`

### Branch-uri pentru Bugfix-uri

Pentru rezolvarea problemelor identificate:

- `fix/nume-problema`

## Fluxul de Lucru

1. **Crearea unui branch nou**:
   ```bash
   git checkout develop
   git checkout -b faza/X.Y-nume-faza
   ```

2. **Dezvoltarea funcționalității**:
   - Faceți modificările necesare
   - Testați modificările
   - Actualizați documentația

3. **Commit-uri**:
   - Folosiți conventional commits pentru mesajele de commit:
     ```bash
     git commit -m "feat: adăugare funcționalitate X"
     git commit -m "fix: rezolvare problemă Y"
     git commit -m "docs: actualizare documentație Z"
     ```

4. **Push la branch-ul remote**:
   ```bash
   git push -u origin faza/X.Y-nume-faza
   ```

5. **Crearea unui Pull Request**:
   - Creați un PR de la branch-ul vostru către `develop`
   - Adăugați o descriere clară a modificărilor
   - Solicitați revizuirea codului

6. **Merge în develop**:
   - După aprobarea PR-ului, faceți merge în `develop`
   - Actualizați checklist-ul pentru a marca faza ca finalizată

7. **Sincronizarea cu develop**:
   - Mențineți branch-urile sincronizate cu `develop` pentru a evita conflicte mari:
     ```bash
     git checkout faza/X.Y-nume-faza
     git pull origin develop
     git push
     ```

## Gestionarea Subfazelor

Pentru faze complexe care necesită subfaze:

1. **Crearea branch-urilor pentru subfaze**:
   ```bash
   git checkout faza/X.Y-nume-faza
   git checkout -b faza/X.Y.Z-nume-subfaza
   ```

2. **Dezvoltarea subfazei**:
   - Implementați funcționalitatea specifică subfazei
   - Faceți commit-uri și push

3. **Merge în branch-ul fazei principale**:
   ```bash
   git checkout faza/X.Y-nume-faza
   git merge faza/X.Y.Z-nume-subfaza
   git push
   ```

4. **Merge în develop**:
   - După finalizarea tuturor subfazelor, faceți merge în `develop`

## Convenții de Denumire

- Folosiți nume descriptive și scurte pentru branch-uri
- Separați cuvintele cu cratimă (`-`)
- Folosiți litere mici
- Includeți numărul fazei/subfazei în numele branch-ului

## Exemple de Comenzi Git

### Crearea unui branch nou
```bash
git checkout develop
git checkout -b faza/1.5-autentificare
```

### Sincronizarea cu develop
```bash
git checkout faza/1.5-autentificare
git pull origin develop
```

### Rezolvarea conflictelor
```bash
git checkout faza/1.5-autentificare
git pull origin develop
# Rezolvați conflictele
git add .
git commit -m "merge: rezolvare conflicte cu develop"
git push
```

### Crearea unui branch de bugfix
```bash
git checkout develop
git checkout -b fix/eroare-autentificare
```

## Beneficii ale Acestei Strategii

1. **Izolarea modificărilor**: Fiecare fază are un scop specific și modificări asociate
2. **Revizuire mai ușoară**: Pull request-urile sunt mai mici și mai concentrate
3. **Trasabilitate mai bună**: Puteți urmări mai ușor progresul și istoricul fiecărei faze
4. **Posibilitatea de a lucra în paralel**: Mai mulți dezvoltatori pot lucra simultan pe faze diferite
5. **Rollback mai ușor**: Este mai ușor să reveniți la o stare funcțională fără a afecta alte părți ale proiectului
