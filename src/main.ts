import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ValidationPipe } from "@nestjs/common"

async function start() {
    const Port = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule, {cors: true})

    const config = new DocumentBuilder()
        .setTitle('anime backend')
        .setDescription('anime')
        .setVersion('1.0.0')
        .addTag('animeshka')
        .build()


    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    app.useGlobalPipes(new ValidationPipe())

    await app.listen(Port, () => {
        console.log(`http://localhost:${Port}/`)
    })
}

start()