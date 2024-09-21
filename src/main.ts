import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as hbs from "express-handlebars";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { initializeTransactionalContext } from "typeorm-transactional";
import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import * as session from "express-session";
import * as  passport from "passport";


const helpers = require("handlebars-helpers")();

async function bootstrap() {
    initializeTransactionalContext();
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(session({
        secret: `thesecret`,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 3600000 }
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.useGlobalPipes(new ValidationPipe());

    app.useStaticAssets(join(__dirname, "..", "public"));
    app.setBaseViewsDir(join(__dirname, "..", "views"));
    app.engine("hbs", hbs.engine({
        extname: "hbs",
        helpers: helpers,
        partialsDir: join(__dirname, "..", "views/partials"),
        defaultLayout: "app-layout.hbs",
        layoutsDir: join(__dirname, "..", "views/layouts")
    }));
    app.setViewEngine("hbs");
    await app.listen(3000);
}

bootstrap();
