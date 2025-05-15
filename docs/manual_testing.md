# Ghid de Testare Manuală WasteWise

Acest document descrie pașii pentru testarea manuală a aplicației WasteWise după modificările structurale.

## Pregătirea Mediului

1. Asigurați-vă că aveți toate dependențele instalate:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   cd ../ml-service && pip install -r requirements.txt
   ```

2. Porniți aplicația folosind scriptul `startapp`:
   ```bash
   ./startapp
   ```

## Testarea Backend-ului

### 1. Verificarea Serviciului de Autentificare

1. Accesați Swagger UI la adresa `http://localhost:3000/api/docs`
2. Testați endpoint-ul `/auth/login` cu credențialele:
   ```json
   {
     "email": "admin@example.com",
     "password": "password123"
   }
   ```
3. Verificați dacă primiți un token JWT valid

### 2. Verificarea Modulelor Geografice

1. Accesați endpoint-ul `/geographic/judete` pentru a lista toate județele
2. Accesați endpoint-ul `/geographic/localitati` pentru a lista toate localitățile
3. Verificați dacă relațiile între entități funcționează corect accesând `/geographic/judete/{id}/localitati`

### 3. Verificarea Modulului Entități

1. Accesați endpoint-ul `/entities/clients` pentru a lista toți clienții
2. Accesați endpoint-ul `/entities/tip-client` pentru a lista toate tipurile de clienți
3. Verificați dacă relațiile între entități funcționează corect accesând `/entities/clients/{id}`

## Testarea Frontend-ului

### 1. Verificarea Autentificării

1. Accesați aplicația la adresa `http://localhost:5173`
2. Încercați să vă autentificați cu credențialele:
   - Email: admin@example.com
   - Parolă: password123
3. Verificați dacă sunteți redirecționat către dashboard după autentificare

### 2. Verificarea Temei (Light/Dark)

1. Verificați dacă butonul de comutare a temei este vizibil în header
2. Apăsați butonul pentru a comuta între temele light și dark
3. Verificați dacă tema se schimbă corect și dacă preferința este salvată în localStorage

### 3. Verificarea Modulelor

1. Navigați la secțiunea "Județe" și verificați dacă lista de județe se încarcă corect
2. Navigați la secțiunea "Localități" și verificați dacă lista de localități se încarcă corect
3. Navigați la secțiunea "Clienți" și verificați dacă lista de clienți se încarcă corect

## Testarea Integrării

### 1. Verificarea Fluxului Complet

1. Creați un nou client folosind formularul din secțiunea "Clienți"
2. Verificați dacă clientul apare în lista de clienți
3. Editați clientul și verificați dacă modificările sunt salvate
4. Ștergeți clientul și verificați dacă este eliminat din listă

### 2. Verificarea Relațiilor între Entități

1. Creați un nou client și asociați-l cu un județ și o localitate
2. Verificați dacă relațiile sunt salvate corect accesând detaliile clientului
3. Verificați dacă clientul apare în lista de clienți pentru județul și localitatea respective

## Probleme Cunoscute și Soluții

### Probleme cu Testele

Testele automate pot eșua din cauza modificărilor structurale. Acestea vor fi actualizate în etape ulterioare. Pentru moment, concentrați-vă pe testarea manuală a funcționalităților principale.

### Probleme cu Importurile

Dacă întâmpinați erori legate de importuri, rulați scriptul `fix-imports.sh` pentru a actualiza căile de import:

```bash
./fix-imports.sh
```

### Probleme cu Migrările

Dacă întâmpinați erori legate de migrări, verificați dacă directorul `migration` există și conține fișierele de migrare. Dacă nu, creați-l și copiați fișierele din directorul `migrations` (dacă există):

```bash
mkdir -p backend/migration
cp backend/migrations/* backend/migration/
```

## Raportarea Problemelor

Dacă descoperiți probleme în timpul testării, documentați-le cu următoarele informații:
1. Descrierea problemei
2. Pașii pentru reproducere
3. Comportamentul așteptat vs. comportamentul actual
4. Capturi de ecran (dacă este posibil)

Raportați problemele în secțiunea Issues a repository-ului GitHub.
