# Autentificare și Autorizare

## Descriere

Modulul de autentificare și autorizare oferă funcționalități pentru gestionarea utilizatorilor, autentificare, autorizare și recuperare parolă.

## Funcționalități

### Autentificare

- Înregistrare utilizator nou
- Autentificare utilizator existent
- Obținere profil utilizator autentificat

### Autorizare

- Protejarea rutelor API cu gardieni de autentificare
- Restricționarea accesului la anumite rute în funcție de rolul utilizatorului

### Recuperare parolă

- Solicitare resetare parolă
- Validare token de resetare parolă
- Resetare parolă

## Endpoint-uri API

### Autentificare

- `POST /auth/register` - Înregistrare utilizator nou
- `POST /auth/login` - Autentificare utilizator
- `GET /auth/profile` - Obținere profil utilizator autentificat

### Recuperare parolă

- `POST /auth/forgot-password` - Solicitare resetare parolă
- `GET /auth/validate-reset-token?token=...` - Validare token de resetare parolă
- `POST /auth/reset-password` - Resetare parolă

## Configurare

### Configurare JWT

```
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1d
```

### Configurare email pentru recuperare parolă

```
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=your-email@example.com
MAIL_PASSWORD=your-email-password
MAIL_FROM=your-email@example.com
```

### Configurare frontend URL

```
FRONTEND_URL=http://localhost:5173
```

## Exemple de utilizare

### Înregistrare utilizator

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john.doe",
    "email": "john.doe@example.com",
    "password": "Password123!",
    "fullName": "John Doe"
  }'
```

### Autentificare utilizator

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john.doe",
    "password": "Password123!"
  }'
```

### Solicitare resetare parolă

```bash
curl -X POST http://localhost:3000/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com"
  }'
```

### Resetare parolă

```bash
curl -X POST http://localhost:3000/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "token_primit_pe_email",
    "password": "NewPassword123!",
    "passwordConfirmation": "NewPassword123!"
  }'
```
