# Dockerfile pentru backend
# Multi-stage build pentru optimizare

# Etapa 1: Build
FROM node:22-alpine AS builder

# Setăm directorul de lucru
WORKDIR /app

# Copiem package.json și package-lock.json
COPY package*.json ./

# Instalăm dependențele
RUN npm ci

# Copiem restul codului sursă
COPY . .

# Construim aplicația
RUN npm run build

# Etapa 2: Producție
FROM node:22-alpine

# Setăm variabile de mediu pentru producție
ENV NODE_ENV=production

# Setăm directorul de lucru
WORKDIR /app

# Copiem package.json și package-lock.json
COPY package*.json ./

# Instalăm doar dependențele de producție
RUN npm ci --only=production

# Copiem codul compilat din etapa de build
COPY --from=builder /app/dist ./dist

# Copiem fișierele necesare pentru configurare
COPY --from=builder /app/.env.example ./.env.example

# Expunem portul pe care rulează aplicația
EXPOSE 3000

# Comanda pentru rularea aplicației
CMD ["node", "dist/main"]
