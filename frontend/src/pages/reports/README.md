# Pagini Module Rapoarte

Acest director conține paginile pentru modulele de rapoarte ale aplicației WasteWise.

## Structură

```
reports/
├── RapoarteClienti/       # Pagini pentru rapoarte clienți
│   ├── RaportClienti.tsx  # Raport general clienți
│   ├── RaportClientDetaliat.tsx # Raport detaliat pentru un client
│   └── RaportClientiForm.tsx # Formular pentru generare raport clienți
├── RapoarteColectari/     # Pagini pentru rapoarte colectări
│   ├── RaportColectari.tsx # Raport general colectări
│   ├── RaportColectariDetaliat.tsx # Raport detaliat pentru colectări
│   └── RaportColectariForm.tsx # Formular pentru generare raport colectări
├── RapoarteFacturare/     # Pagini pentru rapoarte facturare
│   ├── RaportFacturare.tsx # Raport general facturare
│   ├── RaportFacturareDetaliat.tsx # Raport detaliat pentru facturare
│   └── RaportFacturareForm.tsx # Formular pentru generare raport facturare
├── RapoarteOperationale/  # Pagini pentru rapoarte operaționale
│   ├── RaportOperational.tsx # Raport general operațional
│   ├── RaportOperationalDetaliat.tsx # Raport detaliat operațional
│   └── RaportOperationalForm.tsx # Formular pentru generare raport operațional
├── Dashboard/             # Pagini pentru dashboard
│   ├── DashboardGeneral.tsx # Dashboard general
│   ├── DashboardClienti.tsx # Dashboard clienți
│   ├── DashboardColectari.tsx # Dashboard colectări
│   └── DashboardFacturare.tsx # Dashboard facturare
└── index.ts               # Export-uri pentru toate paginile de rapoarte
```

## Utilizare

Paginile din acest director sunt utilizate pentru generarea și vizualizarea rapoartelor:

- Rapoarte clienți
- Rapoarte colectări
- Rapoarte facturare
- Rapoarte operaționale
- Dashboard-uri

Aceste pagini permit utilizatorilor să genereze, să vizualizeze și să exporte rapoarte cu diverse filtre și opțiuni de personalizare.

## Funcționalități

### Rapoarte Clienți

- Generare raport general clienți
- Generare raport detaliat pentru un client specific
- Filtrare rapoarte după diverse criterii (județ, localitate, tip client, etc.)
- Vizualizare grafice și statistici
- Export rapoarte în diverse formate (PDF, Excel, CSV)

### Rapoarte Colectări

- Generare raport general colectări
- Generare raport detaliat pentru colectări
- Filtrare rapoarte după diverse criterii (perioadă, client, categorie deșeu, etc.)
- Vizualizare grafice și statistici
- Export rapoarte în diverse formate (PDF, Excel, CSV)

### Rapoarte Facturare

- Generare raport general facturare
- Generare raport detaliat pentru facturare
- Filtrare rapoarte după diverse criterii (perioadă, client, status plată, etc.)
- Vizualizare grafice și statistici
- Export rapoarte în diverse formate (PDF, Excel, CSV)

### Rapoarte Operaționale

- Generare raport general operațional
- Generare raport detaliat operațional
- Filtrare rapoarte după diverse criterii (perioadă, autospecială, șofer, etc.)
- Vizualizare grafice și statistici
- Export rapoarte în diverse formate (PDF, Excel, CSV)

### Dashboard

- Vizualizare dashboard general cu indicatori cheie de performanță
- Vizualizare dashboard clienți cu statistici despre clienți
- Vizualizare dashboard colectări cu statistici despre colectări
- Vizualizare dashboard facturare cu statistici despre facturare
- Personalizare dashboard cu widget-uri configurabile
- Filtrare dashboard după diverse criterii (perioadă, client, etc.)
