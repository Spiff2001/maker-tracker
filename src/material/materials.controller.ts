import {Controller, Post, Body, Get, Param, Patch, Delete} from '@nestjs/common';
import { type } from 'os';
import { StringArraySupportOption } from 'prettier';
import { filter } from 'rxjs';
import { MaterialsService } from './materials.service';

@Controller('materials')
export class materialsController { 
    constructor(private readonly materialsService : MaterialsService){}
   
    @Post()
    async creatematerial(
    @Body('materials') projMaterials : [String],
    @Body('price_estimation') projPrice : String,
    @Body('vendors') projVendors : String,

    // @Body('materials') projMaterials : [String],
    // @Body('price_estimation') projPrice : String,
    // @Body('vendors') projVendors : String,
    ){
        const generatedID= await this.materialsService.createMaterial(
        projMaterials,
        projPrice,
        projVendors
        );
        console.log(projMaterials);
    return{id : generatedID}
    }


    @Get()
    async getAllmaterials(){
        const allmaterials = await this.materialsService.fetchAllmaterials();
        console.log(allmaterials)
        console.log("command run")
        return{allmaterials}
    }
    @Get('vendor/:vendors')
    async getmaterialsbyVendor(@Param('vendors') vendor : string){
    const filtered_materials = await this.materialsService.fetchmaterialsByVendor(vendor);
    console.log(filtered_materials);
    return{filtered_materials};
    }  
    
    @Get(':id')
    async getmaterialbyID(@Param('id') id : string){
    const particularmaterial = await this.materialsService.fetchSinglematerial(id);
    console.log(particularmaterial);
    return{particularmaterial};
    }

    

    // see note in material service file about asking bradford how to run concurrent get methods using params
    
    @Patch(':id')
    async updatematerial(
        @Param('id') projID: string,
        @Body('materials') projMaterials : [string],
        @Body('price_estimation') proj_price_estimation : String,
        @Body('vendors') projVendors : string,
        ){
        await this.materialsService.updatematerial(projID, projMaterials,proj_price_estimation,projVendors);
        return null;
        }

    @Delete(':id')
    async removematerial(
        @Param('id') projID: string){
        await this.materialsService.deletematerial(projID);
        return null;
    }


}
  