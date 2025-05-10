# Pages

Acest director conține toate paginile aplicației.

Paginile sunt componente care reprezintă rute distincte în aplicație și sunt de obicei compuse din mai multe componente.

Structura recomandată pentru pagini:

```
pages/
  ├── Home/
  │   ├── Home.tsx
  │   ├── Home.module.css
  │   └── index.ts
  ├── Auth/
  │   ├── Login/
  │   ├── Register/
  │   └── ForgotPassword/
  ├── Dashboard/
  │   ├── Dashboard.tsx
  │   ├── Dashboard.module.css
  │   └── index.ts
  ├── WasteManagement/
  │   ├── WasteList/
  │   ├── WasteDetails/
  │   ├── AddWaste/
  │   └── EditWaste/
  └── NotFound/
      ├── NotFound.tsx
      ├── NotFound.module.css
      └── index.ts
```

Fiecare pagină ar trebui să fie într-un director separat care conține:
- Fișierul principal al paginii (ex: Home.tsx)
- Stilurile paginii (ex: Home.module.css)
- Un fișier index.ts pentru export
- Componente specifice paginii (opțional)
