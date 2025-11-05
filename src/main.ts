import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from "cookie-parser"
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.SERVER_PORT || 7000;
    const config = new DocumentBuilder()
        .setTitle('Questionnaire')
        .setDescription('The questionnaire API description')
        .setVersion('1.0')
        .addTag('questionnaire')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.use(cookieParser())
    app.enableCors({
        origin: '*', // Allows requests from any origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
        credentials: true, // Allows sending cookies or authentication tokens
        allowedHeaders: 'Content-Type, Accept', // Allowed request headers
      });
    await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

bootstrap();
