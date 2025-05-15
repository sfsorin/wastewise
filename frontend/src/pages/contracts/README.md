# Pagini Module Contracte

Acest director conține paginile pentru modulele de contracte ale aplicației WasteWise.

## Structură

```
contracts/
├── Contracte/             # Pagini pentru gestionarea contractelor
│   ├── ContracteList.tsx  # Pagina cu lista contractelor
│   ├── ContractDetails.tsx # Pagina cu detalii contract
│   └── ContractForm.tsx   # Formular pentru creare/editare contract
├── ServiciiContractate/   # Pagini pentru gestionarea serviciilor contractate
│   ├── ServiciiContractateList.tsx # Pagina cu lista serviciilor contractate
│   ├── ServiciuContractatDetails.tsx # Pagina cu detalii serviciu contractat
│   └── ServiciuContractatForm.tsx # Formular pentru creare/editare serviciu contractat
├── TipuriContracte/       # Pagini pentru gestionarea tipurilor de contracte
│   ├── TipuriContracteList.tsx # Pagina cu lista tipurilor de contracte
│   ├── TipContractDetails.tsx # Pagina cu detalii tip contract
│   └── TipContractForm.tsx # Formular pentru creare/editare tip contract
└── index.ts               # Export-uri pentru toate paginile de contracte
```

## Utilizare

Paginile din acest director sunt utilizate pentru gestionarea contractelor și a serviciilor contractate:

- Contracte
- Servicii contractate
- Tipuri de contracte

Aceste pagini permit utilizatorilor să vizualizeze, să creeze, să editeze și să șteargă entități legate de contracte, precum și să vizualizeze relațiile dintre ele.

## Funcționalități

### Contracte

- Listare contracte cu filtrare și paginare
- Vizualizare detalii contract
- Creare contract nou
- Editare contract existent
- Ștergere contract
- Vizualizare client asociat unui contract
- Vizualizare servicii contractate pentru un contract
- Generare documente contract (PDF)
- Trimitere contract pe email

### Servicii Contractate

- Listare servicii contractate cu filtrare și paginare
- Vizualizare detalii serviciu contractat
- Creare serviciu contractat nou
- Editare serviciu contractat existent
- Ștergere serviciu contractat
- Vizualizare contract asociat unui serviciu contractat
- Vizualizare serviciu asociat unui serviciu contractat

### Tipuri de Contracte

- Listare tipuri de contracte
- Vizualizare detalii tip contract
- Creare tip contract nou
- Editare tip contract existent
- Ștergere tip contract
- Vizualizare contracte asociate unui tip de contract
