# Pagini Module Facturare

Acest director conține paginile pentru modulele de facturare ale aplicației WasteWise.

## Structură

```
invoicing/
├── Facturi/               # Pagini pentru gestionarea facturilor
│   ├── FacturiList.tsx    # Pagina cu lista facturilor
│   ├── FacturaDetails.tsx # Pagina cu detalii factură
│   └── FacturaForm.tsx    # Formular pentru creare/editare factură
├── LiniiFactura/          # Pagini pentru gestionarea liniilor de factură
│   ├── LiniiFacturaList.tsx # Pagina cu lista liniilor de factură
│   ├── LinieFacturaDetails.tsx # Pagina cu detalii linie factură
│   └── LinieFacturaForm.tsx # Formular pentru creare/editare linie factură
├── Plati/                 # Pagini pentru gestionarea plăților
│   ├── PlatiList.tsx      # Pagina cu lista plăților
│   ├── PlataDetails.tsx   # Pagina cu detalii plată
│   └── PlataForm.tsx      # Formular pentru creare/editare plată
├── GenerareFacturi/       # Pagini pentru generarea facturilor
│   ├── GenerareFacturiForm.tsx # Formular pentru generare facturi
│   └── GenerareFacturiResults.tsx # Rezultate generare facturi
└── index.ts               # Export-uri pentru toate paginile de facturare
```

## Utilizare

Paginile din acest director sunt utilizate pentru gestionarea facturilor și a plăților:

- Facturi
- Linii de factură
- Plăți
- Generare facturi

Aceste pagini permit utilizatorilor să vizualizeze, să creeze, să editeze și să șteargă entități legate de facturare, precum și să vizualizeze relațiile dintre ele.

## Funcționalități

### Facturi

- Listare facturi cu filtrare și paginare
- Vizualizare detalii factură
- Creare factură nouă
- Editare factură existentă
- Ștergere factură
- Vizualizare client asociat unei facturi
- Vizualizare linii de factură pentru o factură
- Vizualizare plăți pentru o factură
- Generare factură în format PDF
- Trimitere factură pe email
- Marcare factură ca plătită

### Linii de Factură

- Listare linii de factură cu filtrare și paginare
- Vizualizare detalii linie factură
- Creare linie factură nouă
- Editare linie factură existentă
- Ștergere linie factură
- Vizualizare factură asociată unei linii de factură
- Vizualizare serviciu asociat unei linii de factură

### Plăți

- Listare plăți cu filtrare și paginare
- Vizualizare detalii plată
- Creare plată nouă
- Editare plată existentă
- Ștergere plată
- Vizualizare factură asociată unei plăți
- Vizualizare client asociat unei plăți
- Generare chitanță în format PDF
- Trimitere chitanță pe email

### Generare Facturi

- Generare facturi în masă pentru un interval de timp
- Generare facturi pentru un client specific
- Generare facturi pentru un grup de clienți
- Vizualizare rezultate generare facturi
- Trimitere facturi generate pe email
