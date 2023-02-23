import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule  } from './project/projects.module';

@Module({

  imports: [ProjectModule, MongooseModule.forRoot('mongodb+srv://will:will@cluster0.eo5xpwp.mongodb.net/maker-tracker')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
