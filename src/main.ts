import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from "cookie-parser"

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.SERVER_PORT || 7000;
    app.use(cookieParser())
    app.enableCors({origin: process.env.CLIENT_URL, credentials: true});
    await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

bootstrap();
