# Documentație Implementare Înregistrare Utilizatori

## Descriere

Această documentație descrie implementarea funcționalității de înregistrare a utilizatorilor în aplicația WasteWise. Funcționalitatea permite utilizatorilor să își creeze conturi noi în aplicație, cu validare de date și securizare a parolelor.

## Componente Implementate

### Backend

1. **DTO pentru înregistrare (RegisterDto)**
   - Validare pentru numele de utilizator, email și parolă
   - Validare pentru confirmarea parolei
   - Câmpuri opționale pentru prenume, nume și nume complet

2. **Service pentru înregistrare (AuthService)**
   - Verificare dacă parolele coincid
   - Creare utilizator nou în baza de date
   - Generare token JWT pentru autentificare automată după înregistrare
   - Includere permisiuni utilizator în token-ul JWT

3. **Controller pentru înregistrare (AuthController)**
   - Endpoint POST /auth/register
   - Validare date de înregistrare
   - Răspuns cu token JWT și date utilizator

4. **Entitate User**
   - Hashare automată a parolei înainte de salvare
   - Validare parolă la autentificare
   - Relații cu roluri și permisiuni

### Frontend

1. **Formular de înregistrare (RegisterPage)**
   - Câmpuri pentru nume utilizator, prenume, nume, email, parolă și confirmare parolă
   - Validare date formular
   - Afișare erori de validare
   - Redirecționare automată după înregistrare reușită

2. **Serviciu pentru autentificare (authService)**
   - Metode pentru înregistrare și autentificare
   - Stocare token JWT și date utilizator în localStorage

3. **Store pentru gestionarea stării (authStore)**
   - Gestionare stare autentificare
   - Gestionare erori
   - Persistență stare între reîncărcări pagină

## Flux de Înregistrare

1. Utilizatorul accesează pagina de înregistrare
2. Utilizatorul completează formularul cu datele personale
3. La trimiterea formularului, datele sunt validate pe frontend
4. Dacă validarea reușește, datele sunt trimise la backend
5. Backend-ul validează din nou datele și verifică dacă utilizatorul există deja
6. Dacă totul este în regulă, se creează un utilizator nou în baza de date
7. Parola este hashată automat înainte de salvare
8. Se generează un token JWT pentru autentificare
9. Se returnează token-ul și datele utilizatorului către frontend
10. Frontend-ul stochează token-ul și datele utilizatorului
11. Utilizatorul este redirecționat către pagina de dashboard

## Validări Implementate

### Backend

- Numele de utilizator trebuie să aibă între 3 și 50 de caractere și să conțină doar litere, cifre, puncte, underscore și liniuțe
- Email-ul trebuie să fie valid și să aibă maxim 255 de caractere
- Parola trebuie să aibă între 8 și 50 de caractere și să conțină cel puțin o literă mică, o literă mare, o cifră și un caracter special
- Parolele trebuie să coincidă
- Verificare dacă există deja un utilizator cu același nume sau email

### Frontend

- Verificare câmpuri obligatorii
- Verificare coincidență parole
- Verificare lungime minimă parolă
- Verificare complexitate parolă (litere mici, mari, cifre, caractere speciale)

## Securitate

- Parolele sunt hashate folosind bcrypt înainte de a fi stocate în baza de date
- Token-urile JWT au o durată de viață limitată (24 ore)
- Permisiunile utilizatorului sunt incluse în token-ul JWT pentru autorizare
- Validare strictă a datelor de înregistrare atât pe frontend cât și pe backend

## Teste

- Teste unitare pentru serviciul de autentificare
- Teste pentru validarea datelor de înregistrare
- Teste pentru verificarea coincidențelor parolelor
- Teste pentru gestionarea erorilor (utilizator existent, date invalide)

## Îmbunătățiri Viitoare

- Implementare confirmare email pentru activare cont
- Implementare captcha pentru prevenirea înregistrărilor automate
- Implementare verificare complexitate parolă mai avansată
- Implementare limitare număr de încercări de înregistrare per IP
- Implementare logging detaliat pentru activități de înregistrare

## Endpoint API

### POST /auth/register

**Request Body:**

```json
{
  "username": "john.doe",
  "email": "john.doe@example.com",
  "password": "Password123!",
  "passwordConfirmation": "Password123!",
  "firstName": "John",
  "lastName": "Doe",
  "fullName": "John Doe"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "username": "john.doe",
    "email": "john.doe@example.com",
    "fullName": "John Doe",
    "role": "user",
    "permissions": ["read:users", "read:profile"]
  }
}
```

**Coduri de Eroare:**

- 400 Bad Request: Date invalide sau parolele nu coincid
- 409 Conflict: Există deja un utilizator cu același nume sau email
