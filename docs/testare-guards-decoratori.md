# Testarea Guards și Decoratorilor pentru Autorizare

Acest document descrie cum se pot testa guards și decoratorii pentru autorizare implementați în aplicația WasteWise.

## Testare automată

### 1. Rularea testelor unitare

Pentru a rula toate testele unitare pentru guards și decoratori, executați următoarea comandă:

```bash
cd backend
npm test -- --testPathPattern="auth/(guards|decorators)"
```

Această comandă va rula toate testele pentru:
- JwtAuthGuard
- RolesGuard
- PermissionsGuard
- Decoratorul Roles
- Decoratorul Permissions
- Decoratorul Public

### 2. Rularea testelor pentru controller-ul RbacController

Pentru a rula testele pentru controller-ul RbacController, executați următoarea comandă:

```bash
cd backend
npm test -- --testPathPattern="auth/controllers/rbac"
```

## Testare manuală

Pentru testarea manuală a guards și decoratorilor, aplicația include un controller special (RbacController) care oferă endpoint-uri pentru testarea diferitelor scenarii de autorizare.

### Pornirea aplicației

```bash
cd backend
npm run start:dev
```

### Endpoint-uri disponibile pentru testare

#### 1. Endpoint public

Acest endpoint este accesibil fără autentificare.

```
GET /rbac/public
```

Exemplu de request cu curl:

```bash
curl http://localhost:3030/rbac/public
```

Răspuns așteptat:

```json
{
  "message": "Acesta este un endpoint public care nu necesită autentificare"
}
```

#### 2. Endpoint care necesită autentificare

Acest endpoint necesită autentificare, dar nu necesită roluri sau permisiuni specifice.

```
GET /rbac/authenticated
```

Exemplu de request cu curl:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3030/rbac/authenticated
```

Răspuns așteptat:

```json
{
  "message": "Acesta este un endpoint care necesită autentificare"
}
```

#### 3. Endpoint care necesită rolul de admin

Acest endpoint necesită autentificare și rolul de admin.

```
GET /rbac/admin
```

Exemplu de request cu curl:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3030/rbac/admin
```

Răspuns așteptat pentru un utilizator cu rolul de admin:

```json
{
  "message": "Acesta este un endpoint care necesită rolul de admin"
}
```

Răspuns așteptat pentru un utilizator fără rolul de admin:

```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

#### 4. Endpoint care necesită permisiunea create:users

Acest endpoint necesită autentificare și permisiunea create:users.

```
GET /rbac/permissions/create-users
```

Exemplu de request cu curl:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3030/rbac/permissions/create-users
```

Răspuns așteptat pentru un utilizator cu permisiunea create:users:

```json
{
  "message": "Acesta este un endpoint care necesită permisiunea create:users"
}
```

Răspuns așteptat pentru un utilizator fără permisiunea create:users:

```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

#### 5. Verificarea permisiunilor unui utilizator

Acest endpoint necesită autentificare și rolul de admin.

```
GET /rbac/check-permission/:userId/:permissionName
```

Exemplu de request cu curl:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3030/rbac/check-permission/123/create:users
```

Răspuns așteptat:

```json
{
  "userId": "123",
  "permissionName": "create:users",
  "hasPermission": true
}
```

#### 6. Obținerea tuturor permisiunilor unui utilizator

Acest endpoint necesită autentificare și rolul de admin.

```
GET /rbac/user-permissions/:userId
```

Exemplu de request cu curl:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3030/rbac/user-permissions/123
```

Răspuns așteptat:

```json
{
  "userId": "123",
  "permissions": ["create:users", "read:users", "update:users"]
}
```

## Obținerea unui token JWT pentru testare

Pentru a obține un token JWT pentru testare, puteți utiliza endpoint-ul de login:

```
POST /auth/login
```

Exemplu de request cu curl:

```bash
curl -X POST http://localhost:3030/auth/login -H "Content-Type: application/json" -d '{"username": "admin", "password": "admin"}'
```

Răspuns așteptat:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "abc123...",
  "user": {
    "id": "123",
    "username": "admin",
    "email": "admin@example.com",
    "fullName": "Admin User",
    "role": "admin",
    "permissions": ["create:users", "read:users", "update:users", "delete:users"]
  }
}
```

Utilizați valoarea din câmpul `access_token` pentru a autentifica requesturile la endpoint-urile protejate.

## Scenarii de testare

### Scenariul 1: Utilizator neautentificat

1. Accesați endpoint-ul public `/rbac/public` - ar trebui să funcționeze
2. Accesați endpoint-ul autentificat `/rbac/authenticated` - ar trebui să primiți eroare 401 Unauthorized
3. Accesați endpoint-ul admin `/rbac/admin` - ar trebui să primiți eroare 401 Unauthorized
4. Accesați endpoint-ul cu permisiuni `/rbac/permissions/create-users` - ar trebui să primiți eroare 401 Unauthorized

### Scenariul 2: Utilizator autentificat cu rol de user

1. Obțineți un token JWT pentru un utilizator cu rol de user
2. Accesați endpoint-ul public `/rbac/public` - ar trebui să funcționeze
3. Accesați endpoint-ul autentificat `/rbac/authenticated` - ar trebui să funcționeze
4. Accesați endpoint-ul admin `/rbac/admin` - ar trebui să primiți eroare 403 Forbidden
5. Accesați endpoint-ul cu permisiuni `/rbac/permissions/create-users` - ar trebui să primiți eroare 403 Forbidden dacă utilizatorul nu are permisiunea create:users

### Scenariul 3: Utilizator autentificat cu rol de admin

1. Obțineți un token JWT pentru un utilizator cu rol de admin
2. Accesați endpoint-ul public `/rbac/public` - ar trebui să funcționeze
3. Accesați endpoint-ul autentificat `/rbac/authenticated` - ar trebui să funcționeze
4. Accesați endpoint-ul admin `/rbac/admin` - ar trebui să funcționeze
5. Accesați endpoint-ul cu permisiuni `/rbac/permissions/create-users` - ar trebui să funcționeze dacă utilizatorul are permisiunea create:users
6. Accesați endpoint-ul de verificare permisiuni `/rbac/check-permission/123/create:users` - ar trebui să funcționeze
7. Accesați endpoint-ul de obținere permisiuni `/rbac/user-permissions/123` - ar trebui să funcționeze
