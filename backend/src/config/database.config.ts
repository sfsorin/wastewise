import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST || '10.10.10.116',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'wastewise',
  autoLoadEntities: true,
  migrations: ['dist/migration/*{.ts,.js}'],
  migrationsRun: true,
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
  ssl: process.env.DB_SSL === 'true',
}));
