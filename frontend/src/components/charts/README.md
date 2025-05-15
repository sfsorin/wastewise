# Componente de Grafice

Acest director conține componente reutilizabile pentru grafice și vizualizări de date în aplicația WasteWise.

## Structură

```
charts/
├── BarChart.tsx        # Grafic cu bare
├── LineChart.tsx       # Grafic cu linii
├── PieChart.tsx        # Grafic tip pie
├── AreaChart.tsx       # Grafic cu arii
├── ScatterChart.tsx    # Grafic scatter
└── ChartContainer.tsx  # Container pentru grafice
```

## Utilizare

Componentele de grafice sunt construite pe baza bibliotecii Recharts și sunt proiectate pentru a fi ușor de utilizat și personalizat.

Exemplu:

```tsx
import { BarChart } from '@/components/charts/BarChart';

const data = [
  { name: 'Ian', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'Mai', value: 500 },
];

const MyChart = () => {
  return (
    <BarChart
      data={data}
      xKey="name"
      yKey="value"
      title="Cantități colectate lunar"
      height={300}
      width={500}
    />
  );
};
```

## Personalizare

Toate componentele de grafice acceptă proprietăți pentru personalizarea aspectului și comportamentului:

- `colors`: Array de culori pentru elementele graficului
- `margin`: Marginile graficului
- `grid`: Afișare grid
- `tooltip`: Personalizare tooltip
- `legend`: Personalizare legendă
