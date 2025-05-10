# Documentație API WasteWise

Acest document descrie API-urile disponibile în aplicația WasteWise. API-urile sunt organizate pe module funcționale și respectă principiile REST.

## Informații Generale

### URL de Bază

```
https://api.wastewise.com/v1
```

### Autentificare

Toate endpoint-urile, cu excepția celor pentru autentificare, necesită un token JWT valid în header-ul Authorization:

```
Authorization: Bearer <token>
```

### Format Răspuns

Toate răspunsurile sunt în format JSON și au următoarea structură:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operație realizată cu succes"
}
```

În caz de eroare:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Descriere eroare"
  }
}
```

### Paginare

Endpoint-urile care returnează liste de obiecte suportă paginare prin parametrii:

- `page`: Numărul paginii (începe de la 1)
- `limit`: Numărul de elemente per pagină (implicit 10, maxim 100)

Răspunsul include informații despre paginare:

```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 100,
    "totalPages": 10
  }
}
```

### Filtrare

Endpoint-urile care returnează liste de obiecte suportă filtrare prin parametrii query:

- `filter[field]`: Filtrare după câmp (ex: `filter[name]=Test`)
- `sort`: Sortare după câmp (ex: `sort=name`, `sort=-name` pentru descrescător)
- `search`: Căutare text în câmpurile relevante

## Module API

### Autentificare

#### POST /auth/register

Înregistrare utilizator nou.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  "message": "Utilizator înregistrat cu succes"
}
```

#### POST /auth/login

Autentificare utilizator.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin"
    }
  },
  "message": "Autentificare reușită"
}
```

#### POST /auth/refresh-token

Reîmprospătare token.

**Request Body:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Token reîmprospătat cu succes"
}
```

#### POST /auth/forgot-password

Solicitare recuperare parolă.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Email de recuperare trimis cu succes"
}
```

#### POST /auth/reset-password

Resetare parolă.

**Request Body:**

```json
{
  "token": "reset-token",
  "password": "new-password"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Parolă resetată cu succes"
}
```

### Utilizatori

#### GET /users

Obținere listă utilizatori.

**Query Parameters:**
- `page`: Numărul paginii
- `limit`: Numărul de elemente per pagină
- `filter[role]`: Filtrare după rol
- `search`: Căutare în nume și email

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin",
      "createdAt": "2023-01-01T00:00:00Z"
    },
    ...
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 100,
    "totalPages": 10
  }
}
```

#### GET /users/{id}

Obținere detalii utilizator.

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "admin",
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z"
  }
}
```

#### POST /users

Creare utilizator nou.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "admin"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "admin",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  "message": "Utilizator creat cu succes"
}
```

#### PUT /users/{id}

Actualizare utilizator.

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "role": "manager"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Smith",
    "role": "manager",
    "updatedAt": "2023-01-02T00:00:00Z"
  },
  "message": "Utilizator actualizat cu succes"
}
```

#### DELETE /users/{id}

Ștergere utilizator.

**Response:**

```json
{
  "success": true,
  "message": "Utilizator șters cu succes"
}
```

### Module Geografice

#### GET /judete

Obținere listă județe.

**Query Parameters:**
- `page`: Numărul paginii
- `limit`: Numărul de elemente per pagină
- `search`: Căutare în nume și cod

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nume": "Alba",
      "cod": "AB",
      "createdAt": "2023-01-01T00:00:00Z"
    },
    ...
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 42,
    "totalPages": 5
  }
}
```

#### GET /judete/{id}

Obținere detalii județ.

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nume": "Alba",
    "cod": "AB",
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z"
  }
}
```

#### POST /judete

Creare județ nou.

**Request Body:**

```json
{
  "nume": "Alba",
  "cod": "AB"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nume": "Alba",
    "cod": "AB",
    "createdAt": "2023-01-01T00:00:00Z"
  },
  "message": "Județ creat cu succes"
}
```

#### PUT /judete/{id}

Actualizare județ.

**Request Body:**

```json
{
  "nume": "Alba Iulia",
  "cod": "AB"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nume": "Alba Iulia",
    "cod": "AB",
    "updatedAt": "2023-01-02T00:00:00Z"
  },
  "message": "Județ actualizat cu succes"
}
```

#### DELETE /judete/{id}

Ștergere județ.

**Response:**

```json
{
  "success": true,
  "message": "Județ șters cu succes"
}
```

#### GET /judete/{id}/localitati

Obținere localități din județ.

**Query Parameters:**
- `page`: Numărul paginii
- `limit`: Numărul de elemente per pagină
- `filter[tip]`: Filtrare după tip (municipiu, oraș, comună, sat)
- `search`: Căutare în nume

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "judetId": 1,
      "nume": "Alba Iulia",
      "tip": "municipiu",
      "codPostal": "510000",
      "createdAt": "2023-01-01T00:00:00Z"
    },
    ...
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 78,
    "totalPages": 8
  }
}
```

### Documentație Completă

Pentru documentația completă a API-ului, accesați Swagger UI la adresa:

```
https://api.wastewise.com/docs
```

Documentația Swagger include toate endpoint-urile, parametrii, request/response bodies și exemple.
