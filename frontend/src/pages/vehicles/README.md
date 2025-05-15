# Pagini Module Autospeciale

Acest director conține paginile pentru modulele de autospeciale ale aplicației WasteWise.

## Structură

```
vehicles/
├── Autospeciale/          # Pagini pentru gestionarea autospecialelor
│   ├── AutospecialeList.tsx # Pagina cu lista autospecialelor
│   ├── AutospecialaDetails.tsx # Pagina cu detalii autospecială
│   └── AutospecialaForm.tsx # Formular pentru creare/editare autospecială
├── TipuriAutospeciale/    # Pagini pentru gestionarea tipurilor de autospeciale
│   ├── TipuriAutospecialeList.tsx # Pagina cu lista tipurilor de autospeciale
│   ├── TipAutospecialaDetails.tsx # Pagina cu detalii tip autospecială
│   └── TipAutospecialaForm.tsx # Formular pentru creare/editare tip autospecială
├── Soferi/                # Pagini pentru gestionarea șoferilor
│   ├── SoferiList.tsx     # Pagina cu lista șoferilor
│   ├── SoferDetails.tsx   # Pagina cu detalii șofer
│   └── SoferForm.tsx      # Formular pentru creare/editare șofer
├── Rute/                  # Pagini pentru gestionarea rutelor
│   ├── RuteList.tsx       # Pagina cu lista rutelor
│   ├── RutaDetails.tsx    # Pagina cu detalii rută
│   └── RutaForm.tsx       # Formular pentru creare/editare rută
└── index.ts               # Export-uri pentru toate paginile de autospeciale
```

## Utilizare

Paginile din acest director sunt utilizate pentru gestionarea autospecialelor și a resurselor asociate:

- Autospeciale
- Tipuri de autospeciale
- Șoferi
- Rute

Aceste pagini permit utilizatorilor să vizualizeze, să creeze, să editeze și să șteargă entități legate de autospeciale, precum și să vizualizeze relațiile dintre ele.

## Funcționalități

### Autospeciale

- Listare autospeciale cu filtrare și paginare
- Vizualizare detalii autospecială
- Creare autospecială nouă
- Editare autospecială existentă
- Ștergere autospecială
- Vizualizare istoric rute pentru o autospecială
- Vizualizare șoferi asociați unei autospeciale

### Tipuri de Autospeciale

- Listare tipuri de autospeciale
- Vizualizare detalii tip autospecială
- Creare tip autospecială nou
- Editare tip autospecială existent
- Ștergere tip autospecială

### Șoferi

- Listare șoferi cu filtrare și paginare
- Vizualizare detalii șofer
- Creare șofer nou
- Editare șofer existent
- Ștergere șofer
- Vizualizare autospeciale asociate unui șofer
- Vizualizare istoric rute pentru un șofer

### Rute

- Listare rute cu filtrare și paginare
- Vizualizare detalii rută
- Creare rută nouă
- Editare rută existentă
- Ștergere rută
- Vizualizare autospecială și șofer asociați unei rute
- Vizualizare puncte de colectare incluse într-o rută
