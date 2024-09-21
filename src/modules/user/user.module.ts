import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository],
})
export class UserModule {
}
