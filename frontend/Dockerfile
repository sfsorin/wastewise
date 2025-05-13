# Dockerfile pentru mediul de producție
# Etapa 1: Build
FROM node:20-alpine AS build

# Setăm directorul de lucru
WORKDIR /app

# Instalăm dependențele necesare pentru build și curățăm cache-ul
RUN apk add --no-cache git && \
    rm -rf /var/cache/apk/*

# Crearea unui utilizator non-root
RUN addgroup -g 1001 -S appuser && \
    adduser -u 1001 -S appuser -G appuser && \
    chown -R appuser /app

# Copiem package.json și package-lock.json pentru a instala dependențele
COPY --chown=appuser:appuser package*.json ./

# Instalăm dependențele cu flag-ul legacy-peer-deps pentru a rezolva conflictele
RUN npm ci --legacy-peer-deps && \
    npm cache clean --force

# Copiem restul codului sursă
COPY --chown=appuser:appuser . .

# Construim aplicația pentru producție
RUN npm run build

# Etapa 2: Servire cu Nginx
FROM nginx:stable-alpine

# Instalăm dependențele necesare și curățăm cache-ul
RUN apk add --no-cache curl && \
    rm -rf /var/cache/apk/*

# Copiem fișierele de configurare Nginx
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copiem fișierele statice generate în etapa de build
COPY --from=build /app/dist /usr/share/nginx/html

# Crearea unui utilizator non-root
RUN addgroup -g 1001 -S appuser && \
    adduser -u 1001 -S appuser -G appuser && \
    chown -R appuser:appuser /var/cache/nginx /var/run /var/log/nginx /etc/nginx/conf.d

# Expunem portul standard pentru HTTP
EXPOSE 80

# Comanda pentru pornirea Nginx
CMD ["nginx", "-g", "daemon off;"]
