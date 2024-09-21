import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DataSource } from 'typeorm';
import typeorm from './config/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
    imports: [UserModule,
        AuthModule,
        DashboardModule,
        ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm],
            },
        ),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => (configService.get('typeorm')),

            async dataSourceFactory(options) {
                if (!options) {
                    throw new Error('Invalid options passed');
                }

                return addTransactionalDataSource(new DataSource(options));
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
