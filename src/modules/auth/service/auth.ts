import { Injectable, Logger } from "@nestjs/common";
import { UserService } from "../../user/service/user.service";
import { UserRegistrationRequest } from "../controller/dto/request.dto";
import * as bcrypt from "bcrypt";
import { User } from "../../user/domain/User.entity";

@Injectable()
export class AuthService {

    private SALT_ROUNDS: number = 10;

    private readonly log = new Logger(AuthService.name);

    public constructor(private readonly userService: UserService) {}

    public async registerUser(request: UserRegistrationRequest) {
        const hashedPassword = await this.hashPassword(request?.password);

        const user = await this.userService.createUser(request.email, request.name, hashedPassword);

        //todo: send email to verify email address
        // redirect to login page with toast the says user registered
    }

    public async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findOne(email);

        if (!user) return null;

        if (await bcrypt.compare(password, user.password)) {
            return user;
        }
    }

    private async hashPassword(password: string) {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }
}
