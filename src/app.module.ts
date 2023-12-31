import 'dotenv/config';
import * as fs from 'fs';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './features/user/user.module';
import { SeedService } from './seed/seed.service';
import { AuthModule } from './features/auth/auth.module';
import { RecipeModule } from './features/recipe/recipe.module';
import dbConfig from './config/db.config';
import { dirname, join } from 'path';

const appDir = dirname(require.main.filename);
const imagesDir = join(appDir, '..', 'public', 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('dbConfig'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(appDir, '..', 'public'),
    }),
    UsersModule,
    AuthModule,
    RecipeModule,
  ],
  controllers: [AppController],
  providers: [SeedService],
})
export class AppModule {}
