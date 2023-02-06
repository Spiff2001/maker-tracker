import * as mongoose from 'mongoose'

export const ProjectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    description: String,
    materials: Array,
    price_estimation: Number
});

export interface Project extends mongoose.Document{
    title: String,
    type: String,
    description: String,
    materials: [String],
    price_estimation: Number
}

