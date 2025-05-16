module.exports = {
  // Backend
  'backend/**/*.{js,ts}': [
    'cd backend && npm run lint:fix',
    'cd backend && npm run format',
    'cd backend && npm run test:affected',
  ],
  
  // Frontend
  'frontend/**/*.{js,ts,vue}': [
    'cd frontend && npm run lint:fix',
    'cd frontend && npm run format',
    'cd frontend && npm run test:affected',
  ],
  
  // Documentație și alte fișiere
  '**/*.{md,json,yml,yaml}': [
    'prettier --write',
  ],
};
