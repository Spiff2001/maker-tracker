

import {Injectable,NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Material } from './material.model';
import { Project, ProjectSchema } from 'src/project/project.model';
 
@Injectable()
export class MaterialsService{
   // private materials: material[] = [];
    constructor(@InjectModel('material') private readonly materialModel: Model<Material>, @InjectModel('project') private readonly ProjectModel: Model<Project>){}
    
    async createMaterial(materials, price_estimation,vendors){
        const newMaterial = new this.materialModel({
       
        materials: materials,
        price_estimation: price_estimation,
        vendor: vendors
        });
        const result = await newMaterial.save();
        return result.id as string; 
 }
    async fetchAllmaterials(){
        const materials = await this.materialModel.find().exec();
        const projects = await this.ProjectModel.find().exec()
        let project_materials_array = []
        projects.forEach(project => project_materials_array.push(project.id, project.materials))
        return materials.map((mat)=>({id: mat.id, materials: mat.materials, price_estimation: mat.price_estimation, vendors: mat.vendors})), project_materials_array;
        
    }
     async fetchSinglematerial(materialID: string){
        const material = await this.findmaterial(materialID);
        console.log(material)
       return {id: material.id,materials: material.materials,price_estimation: material.price_estimation, vendors: material.vendors};
     }
   
     async fetchmaterialsByVendor(material_vendor: string){
        const materials = await this.materialModel.find().exec();
        let filtered_materials = materials.filter(element => element.vendors.includes(material_vendor));
        console.log(filtered_materials)
        return {filtered_materials};
    }

    async updatematerial(materialID : string,materials : [string], price_estimation : String, vendors:string){
        const updatedmaterial = await this.findmaterial(materialID);
        
        if(materials){
            updatedmaterial.materials=materials
        }
        if(price_estimation){
            updatedmaterial.price_estimation=price_estimation;
        }
        if(vendors){
            updatedmaterial.vendors=vendors;
        }
        updatedmaterial.save();
    }
    async deletematerial(materialID){
       const result = await this.materialModel.deleteOne({_id: materialID}).exec();
    }
    private async findmaterial(materialID) : Promise<Material>{
        let material;
        try{
            material = await this.materialModel.findById(materialID);

        }
        catch(error){
            throw new NotFoundException("the material you are attempting to find does not exist");
 
        }
        
         if(!material){
            throw new NotFoundException("the material you are attempting to find does not exist");
            
         }
         return material;
    }
}