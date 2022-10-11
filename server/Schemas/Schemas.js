const Joi = require('joi');
const {ObjectId} = require('mongodb');

const method = (value,helpers) => {
        if(!ObjectId.isValid(value)){
            throw new Error('Invalid id');
        }
        
        return value;
    }

const taskSchema = Joi.object({
    title: Joi.string().max(25).required(),
    description: Joi.string().max(300).required(),
    complete:Joi.boolean(),
    date:Joi.string().max(24),
    start:Joi.string().max(24),
    end:Joi.string().max(24),
    group:Joi.string().max(24),
})

const IdSchema = Joi.object({
    _id: Joi.string().custom(method)
})
const taskTitleSchema = Joi.object({
    title: Joi.string().max(25).required() 
})

const toggleCompleteSchema = Joi.object({
    complete: Joi.boolean(),
})
const dateSchema = Joi.object({
    start:Joi.string().max(24),
    end:Joi.string().max(24),
    group:Joi.string().max(2),
})

module.exports = {
    taskSchema, 
    IdSchema,
    toggleCompleteSchema,
    taskTitleSchema,
    dateSchema, 
};