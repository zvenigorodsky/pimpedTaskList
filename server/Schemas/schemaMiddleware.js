const _get = require('lodash/get');

const schemaMiddleware = (schema, fieldToCheck) => 
    async (req, res, next) => {
        try{
            const field = _get(req, fieldToCheck);
            await schema.validateAsync(field);
            next();
        }catch(err){
            res.status(500).json({error_msg: (err.details[0].message || err)})
        }
    }


module.exports = {schemaMiddleware};