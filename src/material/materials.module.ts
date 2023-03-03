import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { materialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { materialSchema } from './material.model';
import { Project, ProjectSchema } from 'src/project/project.model';

@Module({

    imports: [MongooseModule.forFeature([{name: "material", schema: materialSchema}]),
    MongooseModule.forFeature([{name: "project", schema: ProjectSchema}])],
    controllers : [materialsController],
    providers : [MaterialsService],
})
export class materialModule{}

