import { normalize, schema, arrayOf } from 'normalizr'

export const projectSchema = new schema.Entity('projects');
export const projectsSchema = [projectSchema]


export const todoSchema = new schema.Entity('todos');
export const todosSchema = [projectSchema]
