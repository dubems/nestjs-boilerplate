import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../service/auth";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    private readonly log = new Logger(LocalStrategy.name);

    constructor(private authService: AuthService) {
        super();
    }

    public async validate(username: string, password: string): Promise<any> {
        const userNameLowerCase = username.toLowerCase()
        const user = await this.authService.validateUser(userNameLowerCase, password);
        if (!user) {
            this.log.error(`User with email ${username} is unauthorised`);
            throw new UnauthorizedException();
        }
        return user;
    }
}