import {Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectSchema } from './project.model';

@Module({
    imports: [MongooseModule.forFeature([{name: "Product", schema: ProjectSchema}])],
    controllers : [ProjectController],
    providers : [ProjectsService],
})
export class ProductsModule{}