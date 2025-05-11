# Store

Acest director conține store-urile Zustand pentru gestionarea stării globale a aplicației.

Zustand este o bibliotecă de gestionare a stării care oferă o API simplă și intuitivă pentru crearea și utilizarea store-urilor.

Structura recomandată pentru store-uri:

```
store/
  ├── index.ts                # Export-uri pentru toate store-urile
  ├── auth/
  │   ├── authStore.ts        # Store pentru autentificare
  │   └── types.ts            # Tipuri pentru store-ul de autentificare
  ├── waste/
  │   ├── wasteStore.ts       # Store pentru gestionarea deșeurilor
  │   └── types.ts            # Tipuri pentru store-ul de deșeuri
  ├── collection/
  │   ├── collectionStore.ts  # Store pentru puncte de colectare
  │   └── types.ts            # Tipuri pentru store-ul de colectare
  └── ui/
      ├── uiStore.ts          # Store pentru starea UI (teme, modals, etc.)
      └── types.ts            # Tipuri pentru store-ul UI
```

Fiecare store ar trebui să fie într-un director separat care conține:
- Fișierul principal al store-ului (ex: authStore.ts)
- Un fișier de tipuri pentru store (ex: types.ts)
