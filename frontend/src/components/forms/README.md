# Componente de Formulare

Acest director conține componente reutilizabile pentru formulare în aplicația WasteWise.

## Structură

```
forms/
├── FormField.tsx       # Componentă pentru câmpuri de formular
├── FormGroup.tsx       # Componentă pentru grupare câmpuri
├── FormSection.tsx     # Componentă pentru secțiuni de formular
├── FormActions.tsx     # Componentă pentru butoane de acțiune
└── validators/         # Funcții de validare pentru formulare
```

## Utilizare

Componentele de formulare sunt proiectate pentru a fi utilizate împreună cu React Hook Form și Zod pentru validare.

Exemplu:

```tsx
import { FormField } from '@/components/forms/FormField';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(3, 'Numele trebuie să aibă minim 3 caractere'),
  email: z.string().email('Adresa de email nu este validă'),
});

const MyForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        name="name"
        label="Nume"
        control={form.control}
        placeholder="Introduceți numele"
      />
      <FormField
        name="email"
        label="Email"
        control={form.control}
        placeholder="Introduceți adresa de email"
      />
      <button type="submit">Trimite</button>
    </form>
  );
};
```
