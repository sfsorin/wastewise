# Raport de Testare Containerizare

## Imagini Docker

```
wastewise-frontend         latest    2fd3384cb711   2 minutes ago   549MB
wastewise-backend          latest    b04ada1a6dc5   3 hours ago     902MB
wastewise-frontend-prod    latest    59d4b074f76e   4 hours ago     76.4MB
wastewise-frontend-dev     latest    a61ac315d0a9   4 hours ago     650MB
wastewise-backend-test     latest    6cd2f688e969   4 hours ago     538MB
```

## Containere

```
393158e323e9   wastewise-frontend                "docker-entrypoint.s…"   About a minute ago   Up 36 seconds             0.0.0.0:5173->5173/tcp                                     wastewise-frontend-dev
1e42e55cc23c   wastewise-backend                 "docker-entrypoint.s…"   About a minute ago   Up 36 seconds             0.0.0.0:3000->3000/tcp, 9229/tcp                           wastewise-backend-dev
a6429d07f7a7   postgres:latest                   "docker-entrypoint.s…"   About a minute ago   Up 36 seconds (healthy)   0.0.0.0:5432->5432/tcp                                     wastewise-postgres-dev
24f5c2c22edc   adminer:latest                    "entrypoint.sh docke…"   2 hours ago          Up 37 seconds             0.0.0.0:8081->8080/tcp                                     wastewise-adminer-dev
1c3dcac4f4ea   grafana/grafana:latest            "/run.sh"                2 hours ago          Up 36 seconds             0.0.0.0:3001->3000/tcp                                     wastewise-grafana-1
24f5c6f91119   grafana/promtail:latest           "/usr/bin/promtail -…"   2 hours ago          Up 30 seconds                                                                        wastewise-promtail-1
83f8d4f9d42b   redis:alpine                      "docker-entrypoint.s…"   2 hours ago          Up 35 seconds             0.0.0.0:6379->6379/tcp                                     wastewise-redis-dev
b05373b7198b   prom/prometheus:latest            "/bin/prometheus --c…"   2 hours ago          Up 36 seconds             0.0.0.0:9092->9090/tcp                                     wastewise-prometheus-1
b38fc6d6763a   grafana/loki:latest               "/usr/bin/loki -conf…"   2 hours ago          Up 35 seconds             0.0.0.0:3100->3100/tcp                                     wastewise-loki-1
505f9be0f595   minio/minio:latest                "/usr/bin/docker-ent…"   2 hours ago          Up 35 seconds             0.0.0.0:9090->9000/tcp, 0.0.0.0:9091->9001/tcp             wastewise-minio-dev
55fc4a321e4f   gcr.io/cadvisor/cadvisor:latest   "/usr/bin/cadvisor -…"   2 hours ago          Up 38 seconds (healthy)   8080/tcp                                                   wastewise-cadvisor-1
33c7492d8d8c   prom/node-exporter:latest         "/bin/node_exporter …"   2 hours ago          Up 38 seconds             9100/tcp                                                   wastewise-node-exporter-1
```

## Volume

```
local     wastewise_backend-node-modules
local     wastewise_frontend-node-modules
local     wastewise_grafana-data-dev
local     wastewise_loki-data-dev
local     wastewise_minio-data-dev
local     wastewise_pgdata-dev
local     wastewise_prometheus-data-dev
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
