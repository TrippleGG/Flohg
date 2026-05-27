import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as ConfigModuleNest } from '@nestjs/config';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { OffersModule } from './modules/offers/offers.module';
import { AgreementsModule } from './modules/agreements/agreements.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { VerificationsModule } from './modules/verifications/verifications.module';
import { PricingModule } from './modules/pricing/pricing.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModuleNest.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '5432', 10),
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE_NAME || 'flohg',
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/database/migrations/*.js'],
        migrationsRun: true,
        synchronize: false,
        logging: configService.isDevelopment,
      }),
    }),
    ConfigModule,
    AuthModule,
    UsersModule,
    TasksModule,
    OffersModule,
    AgreementsModule,
    PaymentsModule,
    VerificationsModule,
    PricingModule,
    AdminModule,
  ],
})
export class AppModule {}
