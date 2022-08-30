require('dotenv').config();

const {MongoClient} = require('mongodb');

const internals = {}

const MONGO_URI = () => {
    return `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_USER_PWD}@localHost:${process.env.DB_PORT}/${process.env.MONGO_DB_NAME}`
}

const connectToDB = async () => {
    try{
        const client = await new MongoClient(MONGO_URI()).connect();
        internals.client = client;
        internals.db = client.db();

        console.log('Conected successfully to database server');
    }catch(err){
        console.log(err);
    }
}

const getCollectionOperations = (collectionName) => {
    const findAll = async () => {
        const result = await internals.db.collection(collectionName).find();
        return result
    }

    const findOne = async (query) => {
        const result = await internals.db.collection(collectionName).find(query);
        return result
    }
    const insertOne = async (obj) => {
        const result = await internals.db.collection(collectionName).insertOne(obj);
        return result
    }
    const deleteOne = async(query) => {
        const result = await internals.db.collection(collectionName).deleteOne(query);
        return result;
    }
    return {
        findOne,
        findAll,
        insertOne,
        deleteOne,
    }

} 

module.exports = {connectToDB,getCollectionOperations};

