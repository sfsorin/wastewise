# Pagini Module Entități

Acest director conține paginile pentru modulele de entități ale aplicației WasteWise.

## Structură

```
entities/
├── Clients/               # Pagini pentru gestionarea clienților
│   ├── ClientsList.tsx    # Pagina cu lista clienților
│   ├── ClientDetails.tsx  # Pagina cu detalii client
│   └── ClientForm.tsx     # Formular pentru creare/editare client
├── PuncteColectare/       # Pagini pentru gestionarea punctelor de colectare
│   ├── PuncteColectareList.tsx # Pagina cu lista punctelor de colectare
│   ├── PunctColectareDetails.tsx # Pagina cu detalii punct de colectare
│   └── PunctColectareForm.tsx # Formular pentru creare/editare punct de colectare
├── TipuriClient/          # Pagini pentru gestionarea tipurilor de client
│   ├── TipuriClientList.tsx # Pagina cu lista tipurilor de client
│   ├── TipClientDetails.tsx # Pagina cu detalii tip client
│   └── TipClientForm.tsx  # Formular pentru creare/editare tip client
└── index.ts               # Export-uri pentru toate paginile de entități
```

## Utilizare

Paginile din acest director sunt utilizate pentru gestionarea entităților principale din aplicație:

- Clienți
- Puncte de colectare
- Tipuri de client

Aceste pagini permit utilizatorilor să vizualizeze, să creeze, să editeze și să șteargă entități, precum și să vizualizeze relațiile dintre ele.

## Funcționalități

### Clienți

- Listare clienți cu filtrare și paginare
- Vizualizare detalii client
- Creare client nou
- Editare client existent
- Ștergere client
- Vizualizare puncte de colectare asociate unui client

### Puncte de Colectare

- Listare puncte de colectare cu filtrare și paginare
- Vizualizare detalii punct de colectare
- Creare punct de colectare nou
- Editare punct de colectare existent
- Ștergere punct de colectare
- Vizualizare client asociat unui punct de colectare

### Tipuri de Client

- Listare tipuri de client
- Vizualizare detalii tip client
- Creare tip client nou
- Editare tip client existent
- Ștergere tip client
