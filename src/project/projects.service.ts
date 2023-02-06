

import {Injectable,NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.model';
 
@Injectable()
export class ProjectsService{
    private projects: Project[] = [];
    constructor(@InjectModel('Project') private readonly projectModel: Model<Project>){}

    async createProject(){
        const newProject = new this.projectModel({
      
        });
        const result = await newProject.save();
        return result.id as string; 
 }
    async fetchAllProjects(){
        const projects = await this.projectModel.find().exec();
        return projects.map(()=>({}));
    }
    async fetchSingleProject(projectID: string){
       const project = await this.findProject(projectID);
       (projectID);
       return {};
    }
    async fetchProjectsByType(type:string){
        
    }

    async updateProject(){
        const updatedproject = await this.findProject(projectID);
        updatedproject.save();
    }
    async deleteProject(prodID: string){
       const result = await this.projectModel.deleteOne({_id: prodID}).exec();
    //    if((result.n)=== 0){
    //     throw new NotFoundException("the project you are attempting to find does not exist");
    //    }
    }
    private async findProject(id : string) : Promise<Project>{
        let project;
        try{
            project = await this.projectModel.findById(id);

        }
        catch(error){
            throw new NotFoundException("the project you are attempting to find does not exist");
 
        }
        
         if(!project){
            throw new NotFoundException("the project you are attempting to find does not exist");
            
         }
         return project;
    }
}