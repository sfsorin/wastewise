# Documentație Script Unificat WasteWise (startapp)

Acest document descrie scriptul unificat pentru aplicația WasteWise.

## Descriere

Scriptul `startapp` (pentru Linux/macOS) și `startapp.bat` (pentru Windows) oferă o interfață unificată pentru gestionarea aplicației WasteWise. Acesta integrează toate funcționalitățile din scripturile anterioare într-un singur script cu meniu interactiv.

## Funcționalități

Scriptul oferă următoarele funcționalități:

1. **Instalare dependențe**

   - Instalare dependențe backend
   - Instalare dependențe frontend
   - Instalare toate dependențele

2. **Rulare teste**

   - Rulare teste backend
   - Rulare teste frontend
   - Rulare toate testele
   - Rulare teste cu coverage

3. **Pornire servicii**

   - Verificare bază de date
   - Rulare migrări (opțional)
   - Pornire backend
   - Pornire frontend
   - Deschidere browser (opțional)

4. **Verificare bază de date**

   - Verificare conexiune la baza de date
   - Creare bază de date (dacă nu există)

5. **Rulare migrări**
   - Rulare migrări pentru baza de date

## Cerințe

Pentru a utiliza acest script, trebuie să aveți instalate:

- Node.js (v22.13.1 sau mai recent)
- npm
- PostgreSQL (sau acces la un server PostgreSQL)
- curl (pentru verificarea disponibilității serviciilor)
- Pentru Linux/macOS: bash, lsof
- Pentru Windows: Command Prompt cu suport pentru comenzi batch

## Utilizare

### Linux/macOS

```bash
# Acordă permisiuni de execuție (doar prima dată)
chmod +x startapp

# Rulează scriptul
./startapp
```

### Windows

```
# Rulează scriptul
startapp.bat
```

## Meniul Principal

Scriptul afișează un meniu principal cu următoarele opțiuni:

1. **Instalare dependențe** - Deschide meniul de instalare a dependențelor
2. **Rulare teste** - Deschide meniul de rulare a testelor
3. **Pornire servicii** - Pornește serviciile backend și frontend
4. **Verificare bază de date** - Verifică disponibilitatea bazei de date
5. **Rulare migrări** - Rulează migrările pentru baza de date
6. **Ieșire** - Închide scriptul

## Meniul de Instalare Dependențe

Acest meniu oferă următoarele opțiuni:

1. **Instalare dependențe backend** - Instalează dependențele pentru backend
2. **Instalare dependențe frontend** - Instalează dependențele pentru frontend
3. **Instalare toate dependențele** - Instalează dependențele pentru ambele proiecte
4. **Înapoi la meniul principal** - Revine la meniul principal

## Meniul de Rulare Teste

Acest meniu oferă următoarele opțiuni:

1. **Rulare teste backend** - Rulează testele pentru backend
2. **Rulare teste frontend** - Rulează testele pentru frontend
3. **Rulare toate testele** - Rulează testele pentru ambele proiecte
4. **Rulare teste backend cu coverage** - Rulează testele pentru backend cu coverage
5. **Rulare teste frontend cu coverage** - Rulează testele pentru frontend cu coverage
6. **Rulare toate testele cu coverage** - Rulează testele pentru ambele proiecte cu coverage
7. **Înapoi la meniul principal** - Revine la meniul principal

## Pornirea Serviciilor

Când alegeți opțiunea de pornire a serviciilor, scriptul va efectua următoarele operațiuni automat, fără a necesita interacțiune din partea utilizatorului:

1. Verifică disponibilitatea bazei de date
2. Rulează migrările automat
3. Pornește serverul backend
4. Așteaptă până când backend-ul este disponibil
5. Pornește serverul frontend
6. Așteaptă până când frontend-ul este disponibil
7. Afișează informații despre cum să accesați aplicația
8. Așteaptă până când utilizatorul dorește să oprească serviciile

## Verificarea Bazei de Date

Această opțiune verifică disponibilitatea bazei de date PostgreSQL și oferă opțiunea de a crea baza de date dacă aceasta nu există.

## Rularea Migrărilor

Această opțiune rulează migrările TypeORM pentru a crea sau actualiza schema bazei de date. Migrările pot fi rulate în două moduri:

1. **Din meniul principal** - Selectând opțiunea 5, migrările vor fi rulate și apoi veți reveni la meniul principal
2. **În timpul pornirii serviciilor** - Când porniți serviciile (opțiunea 3), migrările vor fi rulate automat înainte de pornirea serviciilor

Migrările sunt esențiale pentru a menține structura bazei de date sincronizată cu modelele de date definite în aplicație. Acestea creează sau actualizează tabelele, coloanele, relațiile și indexurile necesare pentru funcționarea corectă a aplicației.

## Configurare

Scriptul utilizează următoarele valori implicite, care pot fi modificate direct în script:

```
DB_HOST=10.10.10.116
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=wastewise
BACKEND_PORT=3000
FRONTEND_PORT=5173
MAX_RETRIES=10
RETRY_INTERVAL=2
```

## Depanare

### Baza de Date Nu Este Disponibilă

Dacă scriptul nu poate accesa baza de date, verificați:

- Dacă serverul PostgreSQL rulează
- Dacă credențialele sunt corecte
- Dacă baza de date există
- Dacă există restricții de firewall

### Porturile Sunt Deja în Uz

Dacă porturile 3000 (backend) sau 5173 (frontend) sunt deja în uz, scriptul va afișa un avertisment și va oferi opțiunea de a continua oricum. Dacă alegeți să nu continuați, puteți:

- Opri serviciile care utilizează aceste porturi
- Modifica porturile în script și în fișierele de configurare ale aplicației

### Serviciile Nu Pornesc în Timpul Alocat

Dacă serviciile nu pornesc în timpul alocat (MAX_RETRIES \* RETRY_INTERVAL secunde), verificați:

- Logurile serviciilor pentru a identifica eventualele erori
- Dacă toate dependențele sunt instalate
- Dacă configurările sunt corecte

## Personalizare

Puteți personaliza scriptul modificând codul sursă pentru a adăuga opțiuni suplimentare sau pentru a modifica comportamentul existent.
