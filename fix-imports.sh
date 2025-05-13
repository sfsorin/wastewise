#!/bin/bash

# Script pentru rezolvarea importurilor duplicate în fișierele React

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
}

# Găsește toate fișierele .tsx și .ts
find src -name "*.tsx" -o -name "*.ts" | while read file; do
  fix_imports "$file"
done

echo "Done fixing imports"
