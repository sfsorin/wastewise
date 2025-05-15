#!/bin/bash

# Script pentru rezolvarea importurilor duplicate în fișierele React și actualizarea căilor conform noii structuri

# Funcție pentru a înlocui importurile duplicate
fix_imports() {
  local file=$1
  echo "Fixing imports in $file"

  # Verifică dacă există importuri duplicate de 'react'
  if grep -q "import.*from 'react';" "$file" && grep -q "import type.*from 'react';" "$file"; then
    # Extrage importurile normale
    normal_imports=$(grep "import \{.*\} from 'react';" "$file" | sed -E 's/import \{(.*)\} from .*/\1/')

    # Extrage importurile de tip
    type_imports=$(grep "import type \{.*\} from 'react';" "$file" | sed -E 's/import type \{(.*)\} from .*/\1/')

    # Combină importurile
    combined_imports="import { $normal_imports, type $type_imports } from 'react';"

    # Înlocuiește importurile
    sed -i "s/import \{.*\} from 'react';//" "$file"
    sed -i "s/import type \{.*\} from 'react';/$combined_imports/" "$file"

    # Curăță liniile goale
    sed -i '/^$/d' "$file"
  fi

  # Actualizează importurile pentru noua structură
  # Înlocuiește importurile din 'store' cu 'stores'
  if grep -q "from '.*store" "$file"; then
    sed -i "s/from '\.\.\/store/from '\.\.\/stores/g" "$file"
    sed -i "s/from '@\/store/from '@\/stores/g" "$file"
    sed -i "s/from '\.\/store/from '\.\/stores/g" "$file"
  fi

  # Înlocuiește importurile din 'layouts' cu 'components/layout'
  if grep -q "from '.*layouts" "$file"; then
    sed -i "s/from '\.\.\/layouts/from '\.\.\/components\/layout/g" "$file"
    sed -i "s/from '@\/layouts/from '@\/components\/layout/g" "$file"
    sed -i "s/from '\.\/layouts/from '\.\/components\/layout/g" "$file"
  fi

  # Înlocuiește importurile din backend pentru 'clients' cu 'entities'
  if [[ "$file" == *"backend/src"* ]] && grep -q "from '.*clients" "$file"; then
    sed -i "s/from '\.\.\/clients/from '\.\.\/entities/g" "$file"
    sed -i "s/from '@modules\/clients/from '@modules\/entities/g" "$file"
    sed -i "s/from '\.\/clients/from '\.\/entities/g" "$file"
    sed -i "s/ClientsModule/EntitiesModule/g" "$file"
  fi

  # Înlocuiește importurile din backend pentru 'migrations' cu 'migration'
  if [[ "$file" == *"backend/src"* ]] && grep -q "from '.*migrations" "$file"; then
    sed -i "s/from '\.\.\/migrations/from '\.\.\/migration/g" "$file"
    sed -i "s/from '@\/migrations/from '@\/migration/g" "$file"
    sed -i "s/from '\.\/migrations/from '\.\/migration/g" "$file"
  fi
}

# Găsește toate fișierele .tsx și .ts în frontend
echo "Fixing imports in frontend..."
find frontend/src -name "*.tsx" -o -name "*.ts" | while read file; do
  fix_imports "$file"
done

# Găsește toate fișierele .ts în backend
echo "Fixing imports in backend..."
find backend/src -name "*.ts" | while read file; do
  fix_imports "$file"
done

echo "Done fixing imports"
