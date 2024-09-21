import { Module } from "@nestjs/common";

import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/auth";
import { UserModule } from "../user/user.module";
import { APP_GUARD } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategy/local.strategy";
import { SessionSerializer } from "./session-serializer";
import { Authenticated } from "./authenticated";

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, SessionSerializer,
        {
            provide: APP_GUARD,
            useClass: Authenticated
        }
        ],
    imports: [UserModule, PassportModule.register({ session: true })]
})
export class AuthModule {
}
