# Raport de Testare Containerizare

## Imagini Docker

```
wastewise-frontend        latest    b5916985cdf2   11 minutes ago   650MB
wastewise-backend         latest    5a141c0e0a32   12 minutes ago   1.17GB
wastewise-frontend-prod   latest    59d4b074f76e   40 minutes ago   76.4MB
wastewise-frontend-dev    latest    a61ac315d0a9   42 minutes ago   650MB
wastewise-backend-test    latest    6cd2f688e969   49 minutes ago   538MB
```

## Containere

```
cdd2987128d5   adminer:latest                  "entrypoint.sh docke…"   3 minutes ago       Up 45 seconds             0.0.0.0:8081->8080/tcp                                     wastewise-adminer-dev
185229fb3c7f   wastewise-frontend              "docker-entrypoint.s…"   3 minutes ago       Up 45 seconds             0.0.0.0:5173->5173/tcp                                     wastewise-frontend-dev
247ce4a6655d   postgres:latest                 "docker-entrypoint.s…"   3 minutes ago       Up 44 seconds (healthy)   0.0.0.0:5432->5432/tcp                                     wastewise-postgres-dev
a53db4af02cf   redis:alpine                    "docker-entrypoint.s…"   3 minutes ago       Up 44 seconds             0.0.0.0:6379->6379/tcp                                     wastewise-redis-dev
311e9b58382c   minio/minio:latest              "/usr/bin/docker-ent…"   3 minutes ago       Up 44 seconds             0.0.0.0:9090->9000/tcp, 0.0.0.0:9091->9001/tcp             wastewise-minio-dev
185a37d1da66   wastewise-backend               "docker-entrypoint.s…"   4 minutes ago       Up 44 seconds             0.0.0.0:3000->3000/tcp                                     wastewise-backend-dev
```

## Volume

```
local     wastewise_backend-node-modules
local     wastewise_frontend-node-modules
local     wastewise_minio-data-dev
local     wastewise_pgdata-dev
local     wastewise_redis-data-dev
```

## Rețele

```
5641f6c8bdca   wastewise_wastewise-network-dev   bridge    local
```

## Rezultate Teste

- Build: Succes
- Comunicare între containere: Succes
- Persistență date: Succes
- Performanță: Acceptabilă

## Recomandări

- Utilizați docker-compose.volumes.yml pentru persistența datelor
- Monitorizați utilizarea resurselor în producție
- Implementați backup regulat pentru volume
- Configurați un sistem de monitorizare pentru containere
