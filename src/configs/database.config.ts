import { TypeOrmModuleOptions, TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule } from '@nestjs/common';

import * as migrations from '@migrations';

export async function getTypeOrmConfig(): Promise<TypeOrmModuleOptions> {
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || 'root!',
    database: process.env.POSTGRES_DATABASE || 'galaxy-db',
    migrationsRun: false,
    synchronize: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrationsTableName: 'MIGRATIONS',
    migrations: Object.values(migrations),
    cli: {
      migrationsDir: 'src/migrations',
    },
  };
}

export async function DatabaseModule(): Promise<DynamicModule> {
  return TypeOrmModule.forRoot(await getTypeOrmConfig());
}
