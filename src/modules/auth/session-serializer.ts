import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SessionSerializer extends PassportSerializer {

    public serializeUser(user: any, done: Function) {
        done(null, user);
    }

    public deserializeUser(payload: any, done: Function) {
        done(null, payload);
    }
}