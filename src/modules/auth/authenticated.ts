import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class Authenticated implements CanActivate {

    public constructor(private reflector: Reflector) {
    }

    public async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (isPublic) {
            return true; // disable auth on endpoints with @Public decorator
        }

        const request = context.switchToHttp().getRequest();

        return request.isAuthenticated();
    }
}


export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);