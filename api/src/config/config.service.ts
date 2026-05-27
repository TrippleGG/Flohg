import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);

  constructor() {
    this.validateEnvironment();
  }

  private validateEnvironment(): void {
    const requiredEnvVars = [
      'NODE_ENV',
      'PORT',
      'DATABASE_URL',
      'JWT_SECRET',
      'PAYSTACK_SECRET',
    ];

    const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

    if (missingEnvVars.length > 0) {
      this.logger.error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
      throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
    }
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }

  get port(): number {
    return parseInt(process.env.PORT || '8080', 10);
  }

  get databaseUrl(): string {
    return process.env.DATABASE_URL;
  }

  get jwtSecret(): string {
    return process.env.JWT_SECRET;
  }

  get paystackSecret(): string {
    return process.env.PAYSTACK_SECRET;
  }

  get paystackPublic(): string {
    return process.env.PAYSTACK_PUBLIC;
  }

  get redisUrl(): string {
    return process.env.REDIS_URL || 'redis://localhost:6379';
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }
}
