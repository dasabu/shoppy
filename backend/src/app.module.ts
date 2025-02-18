import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';
        const pinoConfig = isProduction
          ? {
              transport: undefined,
              level: 'info',
            }
          : {
              transport: {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                },
              },
              level: 'debug',
            };

        return {
          pinoHttp: pinoConfig,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
