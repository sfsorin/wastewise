# Services

Acest director conține serviciile aplicației, care sunt responsabile pentru comunicarea cu API-urile externe și alte operațiuni asincrone.

Serviciile sunt organizate pe domenii funcționale și oferă o interfață pentru interacțiunea cu API-urile.

Exemple de servicii:
- `api.service.ts` - Serviciu de bază pentru comunicarea cu API-ul
- `auth.service.ts` - Serviciu pentru autentificare și gestionarea utilizatorilor
- `waste.service.ts` - Serviciu pentru gestionarea deșeurilor
- `collection.service.ts` - Serviciu pentru gestionarea punctelor de colectare
- `notification.service.ts` - Serviciu pentru gestionarea notificărilor

Fiecare serviciu ar trebui să fie într-un fișier separat și să exporte funcții sau clase care encapsulează logica de comunicare cu API-ul.
