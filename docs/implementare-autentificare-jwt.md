# Implementare Autentificare cu JWT

## Descriere

Acest document descrie implementarea autentificării cu JWT (JSON Web Tokens) în aplicația WasteWise. Autentificarea cu JWT permite utilizatorilor să se autentifice și să acceseze resurse protejate folosind token-uri JWT.

## Componente Implementate

### 1. Configurare JWT

- Creare fișier de configurare `jwt.config.ts` în directorul `backend/src/config`
- Configurare parametri JWT (secret, durată de viață, algoritm)
- Integrare configurare în modulul de autentificare

### 2. Entități

- Implementare entitate `RefreshToken` pentru stocarea token-urilor de refresh
- Creare migrare pentru tabelul `refresh_tokens`

### 3. DTO-uri

- Actualizare `LoginDto` pentru autentificare
- Actualizare `RegisterDto` pentru înregistrare
- Creare `RefreshTokenDto` pentru reînnoirea token-urilor

### 4. Servicii

- Implementare metode în `AuthService` pentru:
  - Validarea utilizatorilor
  - Generarea token-urilor JWT
  - Generarea token-urilor de refresh
  - Reînnoirea token-urilor
  - Revocarea token-urilor

### 5. Controller

- Implementare endpoint-uri în `AuthController`:
  - `/auth/login` - Autentificare utilizator
  - `/auth/register` - Înregistrare utilizator nou
  - `/auth/refresh-token` - Reîmprospătare token
  - `/auth/logout` - Deconectare utilizator
  - `/auth/profile` - Obținere profil utilizator autentificat

### 6. Strategii

- Implementare `JwtStrategy` pentru validarea token-urilor JWT
- Implementare `LocalStrategy` pentru autentificare cu username și parolă

### 7. Guards

- Implementare `JwtAuthGuard` pentru protejarea rutelor

## Flux de Autentificare

### Înregistrare Utilizator

1. Utilizatorul trimite datele de înregistrare (username, email, parolă)
2. Serverul validează datele și creează un utilizator nou
3. Serverul generează un token JWT și un token de refresh
4. Serverul returnează token-urile și datele utilizatorului

### Autentificare Utilizator

1. Utilizatorul trimite credențialele (username/email și parolă)
2. Serverul validează credențialele
3. Serverul generează un token JWT și un token de refresh
4. Serverul returnează token-urile și datele utilizatorului

### Reîmprospătare Token

1. Utilizatorul trimite token-ul de refresh
2. Serverul validează token-ul de refresh
3. Serverul generează un nou token JWT și un nou token de refresh
4. Serverul returnează noile token-uri

### Deconectare Utilizator

1. Utilizatorul trimite token-ul de refresh
2. Serverul revocă token-ul de refresh
3. Serverul confirmă deconectarea

## Securitate

- Token-urile JWT sunt semnate cu un secret configurat în `.env`
- Token-urile de refresh sunt stocate în baza de date cu informații despre client
- Token-urile de refresh sunt revocate la deconectare sau reîmprospătare
- Token-urile expirate sunt automat invalidate

## Configurare

### Variabile de Mediu

```
# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=24h
JWT_REFRESH_EXPIRATION=7d
JWT_ALGORITHM=HS256
```

## Utilizare în Frontend

### Stocare Token-uri

Token-urile trebuie stocate în localStorage sau în cookie-uri securizate:

```typescript
// Stocare token-uri
localStorage.setItem('access_token', response.data.access_token);
localStorage.setItem('refresh_token', response.data.refresh_token);

// Obținere token-uri
const accessToken = localStorage.getItem('access_token');
const refreshToken = localStorage.getItem('refresh_token');
```

### Adăugare Token în Request-uri

Token-ul de acces trebuie adăugat în header-ul Authorization pentru request-urile către API:

```typescript
axios.get('/api/v1/resource', {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

### Reîmprospătare Automată Token

Implementare interceptor pentru reîmprospătarea automată a token-ului expirat:

```typescript
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('/api/v1/auth/refresh-token', {
          refreshToken,
        });
        
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        
        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
        return axios(originalRequest);
      } catch (error) {
        // Redirecționare către pagina de login
      }
    }
    
    return Promise.reject(error);
  }
);
```

## Testare

Pentru a testa funcționalitatea de autentificare, puteți utiliza Postman sau curl:

### Autentificare

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "test@example.com", "password": "password123"}'
```

### Reîmprospătare Token

```bash
curl -X POST http://localhost:3000/api/v1/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "your_refresh_token"}'
```

### Obținere Profil

```bash
curl -X GET http://localhost:3000/api/v1/auth/profile \
  -H "Authorization: Bearer your_access_token"
```

## Concluzii

Implementarea autentificării cu JWT oferă o soluție securizată și scalabilă pentru gestionarea autentificării și autorizării în aplicația WasteWise. Utilizarea token-urilor de refresh permite o experiență mai bună pentru utilizatori, fără a compromite securitatea.
