import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule  } from './project/projects.module';
import { materialModule } from './material/materials.module';


@Module({

  imports: [ProjectModule, materialModule, MongooseModule.forRoot('mongodb+srv://will:will@cluster0.eo5xpwp.mongodb.net/maker-tracker')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
