import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1718523863363 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const query: string = `create table if not exists public."user"
                               (
                                   id          uuid                                   not null primary key,
                                   name        varchar                                not null,
                                   email       varchar                                not null unique,
                                   password    varchar                                not null,
                                   is_verified boolean                  default false not null,
                                   created_at  timestamp with time zone default now() not null,
                                   updated_at  timestamp with time zone default now() not null
                               );`;

        await queryRunner.query(query);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
