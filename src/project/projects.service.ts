

import {Injectable,NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.model';

 
@Injectable()
export class ProjectsService{
   // private projects: Project[] = [];
    constructor(@InjectModel('Project') private readonly projectModel: Model<Project>){}
    
    async createProject(title, type, description, materials, price_estimation, to_do_next){
        const newProject = new this.projectModel({
        title: title,
        type: type,
        description: description,
        materials: materials,
        price_estimation: price_estimation,
        to_do_next: to_do_next
        });
        const result = await newProject.save();
        return result.id as string; 
 }
    async fetchAllProjects(){
        const projects = await this.projectModel.find().exec();
        return projects.map((proj)=>({id: proj.id, title: proj.title, type: proj.type ,description: proj.description, materials: proj.materials, price_estimation: proj.price_estimation, to_do_next: proj.to_do_next}));

    }
     async fetchSingleProject(projectID: string){
        const project = await this.findProject(projectID);
        console.log(project)
       return {id: project.id,title: project.title, type: project.type, description: project.description, price_estimation: project.price_estimation, to_do_next: project.to_do_next};
     }
   
    
     async fetchProjectsByType(project_type: string){
        const projects = await this.projectModel.find().exec();
        let filtered_projects = projects.filter(element => element.type.includes(project_type));
        console.log(filtered_projects)
        return {filtered_projects};
    }

    async updateProject(projectID : string,title : string,type :string ,desc : string, materials : [string], price_estimation : any, to_do_next :string){
        const updatedProject = await this.findProject(projectID);
        if(title){
            updatedProject.title=title;
        }
        if(type){
            updatedProject.type=type;
        }
        if(desc){
            updatedProject.description=desc;
        }
        if(materials){
            updatedProject.materials=materials
        }
        if(price_estimation){
            updatedProject.price_estimation=price_estimation;
        }
        if(to_do_next){
            updatedProject.to_do_next=to_do_next;
        }
        updatedProject.save();
    }
    async deleteProject(projectID){
       const result = await this.projectModel.deleteOne({_id: projectID}).exec();
    }
    private async findProject(projectID) : Promise<Project>{
        let project;
        try{
            project = await this.projectModel.findById(projectID);

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