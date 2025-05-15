# Componente de Tabele

Acest director conține componente reutilizabile pentru tabele și afișarea datelor în format tabelar în aplicația WasteWise.

## Structură

```
tables/
├── Table.tsx           # Componentă de bază pentru tabele
├── TableHeader.tsx     # Componentă pentru header tabel
├── TableBody.tsx       # Componentă pentru body tabel
├── TableRow.tsx        # Componentă pentru rânduri
├── TableCell.tsx       # Componentă pentru celule
├── TablePagination.tsx # Componentă pentru paginare
└── TableFilter.tsx     # Componentă pentru filtrare
```

## Utilizare

Componentele de tabele sunt proiectate pentru a fi flexibile și a suporta sortare, filtrare și paginare.

Exemplu:

```tsx
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/tables';

const MyTable = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell header>ID</TableCell>
          <TableCell header>Nume</TableCell>
          <TableCell header>Email</TableCell>
          <TableCell header>Acțiuni</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              <button>Editare</button>
              <button>Ștergere</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```
