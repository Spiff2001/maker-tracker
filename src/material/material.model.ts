import * as mongoose from 'mongoose'

export const materialSchema = new mongoose.Schema({

    materials: {type: Array, required: false},
    price_estimation: {type: String, required: false},
    vendors: {type: String, required : false}
    
});

export interface Material extends mongoose.Document{
   
    materials: [String],
    price_estimation: String,
    vendors: String
}

