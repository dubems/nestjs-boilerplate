import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

@Controller("dashboard")
export class DashboardController {


    @Get(``)
    public async getDashboard(@Res() res: Response) {
        return res.render(`pages/dashboard`, { layout: "app-layout.hbs" });
    }
}
