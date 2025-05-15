# Componente de Hărți

Acest director conține componente reutilizabile pentru hărți și vizualizări geografice în aplicația WasteWise.

## Structură

```
maps/
├── Map.tsx             # Componentă de bază pentru hărți
├── MapMarker.tsx       # Componentă pentru markeri pe hartă
├── MapPolygon.tsx      # Componentă pentru poligoane pe hartă
├── MapRoute.tsx        # Componentă pentru rute pe hartă
├── MapCluster.tsx      # Componentă pentru clustere de markeri
└── MapControls.tsx     # Componente pentru controale hartă
```

## Utilizare

Componentele de hărți sunt construite pe baza bibliotecii Leaflet și sunt proiectate pentru a fi ușor de utilizat și personalizat.

Exemplu:

```tsx
import { Map, MapMarker } from '@/components/maps';

const locations = [
  { id: 1, name: 'Punct Colectare 1', lat: 44.439663, lng: 26.096306 },
  { id: 2, name: 'Punct Colectare 2', lat: 44.447924, lng: 26.097896 },
  { id: 3, name: 'Punct Colectare 3', lat: 44.435839, lng: 26.102617 },
];

const MyMap = () => {
  return (
    <Map center={[44.439663, 26.096306]} zoom={13}>
      {locations.map((location) => (
        <MapMarker
          key={location.id}
          position={[location.lat, location.lng]}
          tooltip={location.name}
          onClick={() => console.log(`Clicked on ${location.name}`)}
        />
      ))}
    </Map>
  );
};
```

## Personalizare

Toate componentele de hărți acceptă proprietăți pentru personalizarea aspectului și comportamentului:

- `style`: Stilul hărții (standard, satelit, hibrid)
- `controls`: Controale vizibile (zoom, fullscreen, layers)
- `markers`: Personalizare markeri
- `polygons`: Personalizare poligoane
- `routes`: Personalizare rute
