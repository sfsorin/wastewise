# Documentație Securitate Autentificare

## Introducere

Acest document descrie măsurile de securitate implementate pentru sistemul de autentificare al aplicației WasteWise. Scopul acestor măsuri este de a proteja datele utilizatorilor și de a preveni accesul neautorizat la sistem.

## Măsuri de securitate implementate

### 1. Rate Limiting

Rate limiting-ul este implementat pentru a preveni atacurile de tip brute force și pentru a limita numărul de cereri pe care un client le poate face într-un interval de timp.

**Implementare:**
- Utilizează modulul `@nestjs/throttler` pentru a limita numărul de cereri
- Configurabil prin variabile de mediu:
  - `RATE_LIMIT_TTL`: Timpul în secunde pentru care se aplică limita (implicit: 60)
  - `RATE_LIMIT_LIMIT`: Numărul maxim de cereri permise în intervalul de timp (implicit: 10)

**Exemplu de configurare:**
```env
RATE_LIMIT_TTL=60
RATE_LIMIT_LIMIT=10
```

### 2. Validarea complexă a parolelor

Validarea parolelor a fost îmbunătățită pentru a asigura că utilizatorii folosesc parole puternice și sigure.

**Cerințe pentru parole:**
- Minim 10 caractere
- Cel puțin o literă mică
- Cel puțin o literă mare
- Cel puțin o cifră
- Cel puțin un caracter special
- Nu poate conține același caracter repetat de mai mult de 2 ori consecutiv
- Nu poate conține cuvinte comune precum "password", "123456", "qwerty" sau "admin"

**Implementare:**
- Utilizează decoratoarele `@Matches` din class-validator pentru a valida parolele
- Validarea este aplicată atât la înregistrare, cât și la resetarea parolei

### 3. Mecanismul de invalidare a token-urilor JWT

A fost implementat un mecanism pentru invalidarea token-urilor JWT înainte de expirarea lor, util în cazul deconectării utilizatorilor sau compromiterii token-urilor.

**Implementare:**
- Utilizează un serviciu de blacklist pentru token-urile JWT
- Token-urile invalidate sunt stocate în cache cu TTL egal cu timpul rămas până la expirare
- Configurabil prin variabile de mediu:
  - `JWT_BLACKLIST_ENABLED`: Activează sau dezactivează lista neagră (implicit: false)
  - `JWT_BLACKLIST_TTL`: Durata de viață a token-urilor în lista neagră (implicit: 86400 secunde)

**Exemplu de configurare:**
```env
JWT_BLACKLIST_ENABLED=true
JWT_BLACKLIST_TTL=86400
```

### 4. Protecția CSRF

Protecția CSRF (Cross-Site Request Forgery) a fost implementată pentru a preveni atacurile de tip CSRF.

**Implementare:**
- Utilizează modulul `csurf` pentru a genera și valida token-uri CSRF
- Token-urile CSRF sunt transmise prin cookie-uri și header-e
- Configurabil prin variabile de mediu:
  - `CSRF_ENABLED`: Activează sau dezactivează protecția CSRF (implicit: false)
  - `CSRF_SECRET`: Secretul utilizat pentru generarea token-urilor CSRF
  - `CSRF_COOKIE_NAME`: Numele cookie-ului (implicit: XSRF-TOKEN)
  - `CSRF_COOKIE_MAX_AGE`: Durata de viață a cookie-ului (implicit: 86400 secunde)
  - `CSRF_COOKIE_SECURE`: Indică dacă cookie-ul este transmis doar prin HTTPS (implicit: true)
  - `CSRF_COOKIE_SAME_SITE`: Politica SameSite pentru cookie (implicit: strict)

**Exemplu de configurare:**
```env
CSRF_ENABLED=true
CSRF_SECRET=wastewise_csrf_secret
CSRF_COOKIE_NAME=XSRF-TOKEN
CSRF_COOKIE_MAX_AGE=86400
CSRF_COOKIE_SECURE=true
CSRF_COOKIE_SAME_SITE=strict
```

### 5. Teste de securitate

Au fost implementate teste de securitate pentru a verifica vulnerabilitățile comune de securitate pentru autentificare.

**Teste implementate:**
- Teste pentru SQL Injection
- Teste pentru XSS (Cross-Site Scripting)
- Teste pentru protecția CSRF
- Teste pentru securitatea JWT
- Teste pentru securitatea parolelor
- Teste pentru rate limiting

**Rularea testelor:**
```bash
npm run test:security
```

## Recomandări pentru configurare în producție

Pentru a asigura securitatea maximă în mediul de producție, se recomandă următoarele configurări:

1. **Activați toate măsurile de securitate:**
```env
RATE_LIMIT_ENABLED=true
RATE_LIMIT_TTL=60
RATE_LIMIT_LIMIT=5
JWT_BLACKLIST_ENABLED=true
CSRF_ENABLED=true
CSRF_COOKIE_SECURE=true
CSRF_COOKIE_SAME_SITE=strict
```

2. **Configurați durate de viață scurte pentru token-urile JWT:**
```env
JWT_EXPIRES_IN=15m
```

3. **Utilizați HTTPS pentru toate comunicațiile:**
```env
FRONTEND_URL=https://wastewise.example.com
```

4. **Configurați politici de securitate pentru header-e HTTP:**
- Content-Security-Policy
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

5. **Implementați monitorizarea și alertarea pentru activități suspecte:**
- Monitorizați încercările eșuate de autentificare
- Alertați administratorii în cazul unui număr mare de încercări eșuate
- Monitorizați utilizarea token-urilor invalidate

## Concluzie

Implementarea acestor măsuri de securitate îmbunătățește semnificativ securitatea sistemului de autentificare al aplicației WasteWise. Este important să mențineți aceste măsuri actualizate și să monitorizați constant pentru potențiale vulnerabilități noi.
