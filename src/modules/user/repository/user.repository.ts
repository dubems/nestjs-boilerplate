import { User } from '../domain/User.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {

    public constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
}