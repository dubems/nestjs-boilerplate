import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post, Request, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/auth";
import { UserRegistrationRequest } from "./dto/request.dto";
import { Response } from "express";
import { UserExistsException } from "../../user/exception/user.exists.exception";
import { LocalAuthGuard } from "../local-auth.guard";
import { Public } from "../authenticated";

@Public()
@Controller("auth")
export class AuthController {

    private readonly log = new Logger(AuthController.name);

    public constructor(private readonly authService: AuthService) {}

    // @Public()
    @Get(`login`)
    public async getLoginPage(@Res() res: Response) {
        res.render(`login`, { layout: "guest-layout.hbs" });
    }

    @Get(`logout`)
    public async logout(@Request() req, @Res() res: Response) {
        req.session.destroy();

        return res.redirect(`/auth/login`);
    }

    @UseGuards(LocalAuthGuard)
    @Post(`login`)
    @HttpCode(HttpStatus.OK)
    public async login(@Request() req, @Res() res: Response) {
        // console.log(`user ${req.user}`)
        return res.redirect("/dashboard");
    }

    @Get(`register`)
    public async getRegistrationPage(@Res() res: Response) {
        res.render(`register`, { layout: "guest-layout.hbs" });
    }

    @Post(`register`)
    public async register(@Body() request: UserRegistrationRequest, @Res() res: Response) {

        try {
            await this.authService.registerUser(request);
        } catch (ex) {
            this.log.error(`${ex.message}`);
            if (ex instanceof UserExistsException) {
                res.render(`register`);
            }
        }

        return res.redirect("/auth/login");
    }
}
