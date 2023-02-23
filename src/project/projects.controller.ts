import {Controller, Post, Body, Get, Param, Patch, Delete} from '@nestjs/common';
import { type } from 'os';
import { filter } from 'rxjs';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController { 
    constructor(private readonly projectsService : ProjectsService){}
   
    @Post()
    async createProject(
    @Body('title') projTitle : String,
    @Body('type') projType : String,
    @Body('description') projDesc : String,
    @Body('materials') projMaterials : [String],
    @Body('price_estimation') projPrice : any,
    @Body('to_do_next') projTo_do_next : String,
    // title: String,
    // type: String,
    // description: String,
    // materials: [String],
    // price_estimation: Number,
    // to_do_next: String
    ){
        const generatedID= await this.projectsService.createProject(
        projTitle,
        projType,
        projDesc,
        projMaterials,
        projPrice,
        projTo_do_next
        );
        console.log(projTitle);
    return{id : generatedID}
    }


    @Get()
    async getAllProjects(){
        const allProjects = await this.projectsService.fetchAllProjects();
        console.log(allProjects)
        return{allProjects}
    }
    @Get('type/:type')
    async getProjectsbyType(@Param('type') id : string){
    const filtered_projects = await this.projectsService.fetchProjectsByType(id);
    console.log(filtered_projects);
    return{filtered_projects};
    }  
    
    @Get(':id')
    async getProjectbyID(@Param('id') id : string){
    const particularProject = await this.projectsService.fetchSingleProject(id);
    console.log(particularProject);
    return{particularProject};
    }

    

    // see note in project service file about asking bradford how to run concurrent get methods using params
    
    @Patch(':id')
    async updateProject(
        @Param('id') projID: string,
        @Body('title') projTitle: string,
        @Param('type') projType: string,
        @Body('description') projDesc : string,
        @Body('materials') projMaterials : [string],
        @Body('price_estimation') proj_price_estimation : Number,
        @Body('to_do_next') projTo_do_next : string 
        ){
        await this.projectsService.updateProject(projID,projTitle,projType,projDesc,projMaterials,proj_price_estimation,projTo_do_next);
        return null;
        }

    @Delete(':id')
    async removeProject(
        @Param('id') projID: string){
        await this.projectsService.deleteProject(projID);
        return null;
    }


}
  