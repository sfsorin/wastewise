# Pagini Module Geografice

Acest director conține paginile pentru modulele geografice ale aplicației WasteWise.

## Structură

```
geographic/
├── Judete/                # Pagini pentru gestionarea județelor
│   ├── JudeteList.tsx     # Pagina cu lista județelor
│   ├── JudetDetails.tsx   # Pagina cu detalii județ
│   └── JudetForm.tsx      # Formular pentru creare/editare județ
├── Localitati/            # Pagini pentru gestionarea localităților
│   ├── LocalitatiList.tsx # Pagina cu lista localităților
│   ├── LocalitateDetails.tsx # Pagina cu detalii localitate
│   └── LocalitateForm.tsx # Formular pentru creare/editare localitate
├── UAT/                   # Pagini pentru gestionarea UAT-urilor
│   ├── UATList.tsx        # Pagina cu lista UAT-urilor
│   ├── UATDetails.tsx     # Pagina cu detalii UAT
│   └── UATForm.tsx        # Formular pentru creare/editare UAT
├── ZoneADI/               # Pagini pentru gestionarea zonelor ADI
│   ├── ZoneADIList.tsx    # Pagina cu lista zonelor ADI
│   ├── ZonaADIDetails.tsx # Pagina cu detalii zonă ADI
│   └── ZonaADIForm.tsx    # Formular pentru creare/editare zonă ADI
├── ZoneIridex/            # Pagini pentru gestionarea zonelor Iridex
│   ├── ZoneIridexList.tsx # Pagina cu lista zonelor Iridex
│   ├── ZonaIridexDetails.tsx # Pagina cu detalii zonă Iridex
│   └── ZonaIridexForm.tsx # Formular pentru creare/editare zonă Iridex
└── index.ts               # Export-uri pentru toate paginile geografice
```

## Utilizare

Paginile din acest director sunt utilizate pentru gestionarea entităților geografice din aplicație:

- Județe
- Localități
- UAT-uri (Unități Administrativ-Teritoriale)
- Zone ADI
- Zone Iridex

Aceste pagini permit utilizatorilor să vizualizeze, să creeze, să editeze și să șteargă entități geografice, precum și să vizualizeze relațiile dintre ele.
