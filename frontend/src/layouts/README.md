# Layouts

Acest director conține layout-urile aplicației.

Layout-urile sunt componente care definesc structura generală a paginilor și sunt reutilizate în întreaga aplicație.

Exemple de layout-uri:
- `MainLayout.tsx` - Layout-ul principal al aplicației (cu header, footer, sidebar)
- `AuthLayout.tsx` - Layout pentru paginile de autentificare/înregistrare
- `DashboardLayout.tsx` - Layout pentru paginile de dashboard
- `AdminLayout.tsx` - Layout pentru paginile de administrare

Fiecare layout ar trebui să fie într-un director separat care conține:
- Fișierul principal al layout-ului (ex: MainLayout.tsx)
- Stilurile layout-ului (ex: MainLayout.module.css)
- Un fișier index.ts pentru export
