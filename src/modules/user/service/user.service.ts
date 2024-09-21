import { Injectable, Logger } from "@nestjs/common";
import { User } from "../domain/User.entity";
import { UserRepository } from "../repository/user.repository";
import { Builder } from "builder-pattern";
import { UserExistsException } from "../exception/user.exists.exception";
import { Transactional } from "typeorm-transactional";
import { UUID } from "../../../domain/utils/uuid";

@Injectable()
export class UserService {

    private readonly log = new Logger(UserService.name);

    public constructor(private readonly userRepository: UserRepository) {}

    @Transactional()
    public async createUser(email: string, name: string, password: string): Promise<User> {
        if (await this.userRepository.existsBy({ email: email })) {
            this.log.warn(`process=createUser, message=user with email=${email} already exist`);
            //todo: throw exception that user already exist
            throw new UserExistsException(`user with email=${email} already exist`);
        }

        const user = Builder<User>()
            .id(UUID.randomUUID() as unknown as number)
            .email(email)
            .name(name)
            .password(password)
            .build();

        return this.userRepository.save(user);
    }

    public async findOne(email: string) {
        return this.userRepository.findOne({ where: { email: email } });
    }
}
