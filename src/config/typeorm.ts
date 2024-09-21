import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

dotenvConfig({ path: '.env' });

const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: `${process.env.RDS_HOST}`,
    port: Number(process.env.RDS_PORT),
    username: `${process.env.RDS_USERNAME}`,
    password: `${process.env.RDS_PASSWORD}`,
    database: `${process.env.RDS_DB_NAME}`,
    entities: [`dist/modules/**/*.entity{ .ts,.js}`],
    migrationsRun: true,
    migrations: ['dist/domain/migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
    logger: 'advanced-console',
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);