import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@configs';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as services from '@services';
import * as controllers from '@controllers';
import * as entities from '@entities';

@Module({
  imports: [
    DatabaseModule(),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature(Object.values(entities)),
  ],
  controllers: [...Object.values(controllers)],
  providers: [...Object.values(services)],
})
export class AppModule {}
