# Pagini Module Documente

Acest director conține paginile pentru modulele de gestionare a documentelor ale aplicației WasteWise.

## Structură

```
documents/
├── Documente/             # Pagini pentru gestionarea documentelor
│   ├── DocumenteList.tsx  # Pagina cu lista documentelor
│   ├── DocumentDetails.tsx # Pagina cu detalii document
│   └── DocumentForm.tsx   # Formular pentru încărcare/editare document
├── CategoriiDocumente/    # Pagini pentru gestionarea categoriilor de documente
│   ├── CategoriiDocumenteList.tsx # Pagina cu lista categoriilor de documente
│   ├── CategorieDocumentDetails.tsx # Pagina cu detalii categorie document
│   └── CategorieDocumentForm.tsx # Formular pentru creare/editare categorie document
├── SabloanePDF/           # Pagini pentru gestionarea șabloanelor PDF
│   ├── SabloanePDFList.tsx # Pagina cu lista șabloanelor PDF
│   ├── SablonPDFDetails.tsx # Pagina cu detalii șablon PDF
│   └── SablonPDFForm.tsx  # Formular pentru creare/editare șablon PDF
├── GenerareDocumente/     # Pagini pentru generarea documentelor
│   ├── GenerareDocumenteForm.tsx # Formular pentru generare documente
│   └── GenerareDocumenteResults.tsx # Rezultate generare documente
└── index.ts               # Export-uri pentru toate paginile de documente
```

## Utilizare

Paginile din acest director sunt utilizate pentru gestionarea documentelor:

- Documente
- Categorii de documente
- Șabloane PDF
- Generare documente

Aceste pagini permit utilizatorilor să vizualizeze, să încarce, să editeze și să șteargă documente, precum și să vizualizeze relațiile dintre ele.

## Funcționalități

### Documente

- Listare documente cu filtrare și paginare
- Vizualizare detalii document
- Încărcare document nou
- Editare metadate document existent
- Ștergere document
- Vizualizare entitate asociată unui document (client, contract, etc.)
- Descărcare document
- Previzualizare document
- Trimitere document pe email
- Scanare OCR pentru extragere metadate

### Categorii de Documente

- Listare categorii de documente
- Vizualizare detalii categorie document
- Creare categorie document nouă
- Editare categorie document existentă
- Ștergere categorie document
- Vizualizare documente asociate unei categorii

### Șabloane PDF

- Listare șabloane PDF
- Vizualizare detalii șablon PDF
- Creare șablon PDF nou
- Editare șablon PDF existent
- Ștergere șablon PDF
- Previzualizare șablon PDF
- Testare șablon PDF cu date de test

### Generare Documente

- Generare documente în masă folosind șabloane
- Generare documente pentru un client specific
- Generare documente pentru un grup de clienți
- Vizualizare rezultate generare documente
- Trimitere documente generate pe email
