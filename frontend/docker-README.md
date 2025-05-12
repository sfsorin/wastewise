# Docker pentru Frontend WasteWise

Acest document descrie configurarea Docker pentru frontend-ul aplicației WasteWise.

## Structură

Configurarea Docker pentru frontend include:

- `Dockerfile.dev` - Pentru mediul de dezvoltare
- `Dockerfile.prod` - Pentru mediul de producție (multi-stage build)
- `nginx/nginx.conf` - Configurare Nginx pentru servirea aplicației
- `.dockerignore` - Fișiere excluse din container

## Utilizare

### Mediu de Dezvoltare

Pentru a construi și rula containerul în mediul de dezvoltare:

```bash
# Construire imagine
docker build -t wastewise-frontend-dev -f Dockerfile.dev .

# Rulare container
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules --name wastewise-frontend-dev wastewise-frontend-dev
```

Acest container va:
- Expune aplicația pe portul 5173
- Montează directorul curent în container pentru dezvoltare live
- Păstrează node_modules din container

### Mediu de Producție

Pentru a construi și rula containerul în mediul de producție:

```bash
# Construire imagine
docker build -t wastewise-frontend-prod -f Dockerfile.prod .

# Rulare container
docker run -p 80:80 --name wastewise-frontend-prod wastewise-frontend-prod
```

Acest container va:
- Construi aplicația pentru producție
- Servi fișierele statice folosind Nginx
- Expune aplicația pe portul 80

## Configurare Nginx

Configurarea Nginx include:

- Servirea fișierelor statice
- Compresie gzip pentru îmbunătățirea performanței
- Configurare cache pentru fișiere statice
- Suport pentru React Router (SPA)
- Proxy pentru API (opțional)
- Configurări de securitate de bază

## Note

- Pentru a utiliza variabile de mediu în timpul build-ului, folosiți argumentele `--build-arg` la construirea imaginii
- Pentru a modifica configurarea Nginx, editați fișierul `nginx/nginx.conf`
- Pentru a adăuga volume suplimentare, folosiți opțiunea `-v` la rularea containerului
