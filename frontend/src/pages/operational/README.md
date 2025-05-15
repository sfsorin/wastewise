# Pagini Module Operaționale

Acest director conține paginile pentru modulele operaționale ale aplicației WasteWise.

## Structură

```
operational/
├── CategoriiDeseuri/      # Pagini pentru gestionarea categoriilor de deșeuri
│   ├── CategoriiDeseuriList.tsx # Pagina cu lista categoriilor de deșeuri
│   ├── CategorieDeseuDetails.tsx # Pagina cu detalii categorie deșeu
│   └── CategorieDeseuForm.tsx # Formular pentru creare/editare categorie deșeu
├── Servicii/              # Pagini pentru gestionarea serviciilor
│   ├── ServiciiList.tsx   # Pagina cu lista serviciilor
│   ├── ServiciuDetails.tsx # Pagina cu detalii serviciu
│   └── ServiciuForm.tsx   # Formular pentru creare/editare serviciu
├── Colectari/             # Pagini pentru gestionarea colectărilor
│   ├── ColectariList.tsx  # Pagina cu lista colectărilor
│   ├── ColectareDetails.tsx # Pagina cu detalii colectare
│   └── ColectareForm.tsx  # Formular pentru creare/editare colectare
└── index.ts               # Export-uri pentru toate paginile operaționale
```

## Utilizare

Paginile din acest director sunt utilizate pentru gestionarea operațiunilor de bază din aplicație:

- Categorii de deșeuri
- Servicii
- Colectări

Aceste pagini permit utilizatorilor să vizualizeze, să creeze, să editeze și să șteargă entități operaționale, precum și să vizualizeze relațiile dintre ele.

## Funcționalități

### Categorii de Deșeuri

- Listare categorii de deșeuri
- Vizualizare detalii categorie deșeu
- Creare categorie deșeu nouă
- Editare categorie deșeu existentă
- Ștergere categorie deșeu
- Vizualizare servicii asociate unei categorii de deșeuri

### Servicii

- Listare servicii cu filtrare și paginare
- Vizualizare detalii serviciu
- Creare serviciu nou
- Editare serviciu existent
- Ștergere serviciu
- Vizualizare categorie de deșeuri asociată unui serviciu

### Colectări

- Listare colectări cu filtrare și paginare
- Vizualizare detalii colectare
- Creare colectare nouă
- Editare colectare existentă
- Ștergere colectare
- Vizualizare client și punct de colectare asociate unei colectări
