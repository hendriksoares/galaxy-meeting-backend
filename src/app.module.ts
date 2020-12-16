import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from '@strategies';

import * as services from '@services';
import * as controllers from '@controllers';
import * as entities from '@entities';

@Module({
  imports: [
    DatabaseModule(),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature(Object.values(entities)),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_DEFAULT },
    }),
    PassportModule,
  ],
  controllers: [...Object.values(controllers)],
  providers: [...Object.values(services), JwtStrategy],
})
export class AppModule {}
