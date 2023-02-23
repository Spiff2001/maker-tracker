import * as mongoose from 'mongoose'

export const ProjectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    type: {type: String, required: false},
    description: {type: String, required: false},
    materials: {type: Array, required: false},
    price_estimation: {required: false},
    to_do_next: {type : String, required : false}
    
});

export interface Project extends mongoose.Document{
    title: String,
    type: String,
    description: String,
    materials: [String],
    price_estimation: any,
    to_do_next: String
}

