const {MongoClient} = require('mongodb');

const internals = {}


const connectToDB = async (uri) => {
    try{
        const client = await new MongoClient(uri).connect();
        internals.client = client;
        internals.db = client.db();

        console.log('Conected successfully to database server');
    }catch(err){
        console.log(err);
    }
}

const getCollectionOperations = (collectionName) => {
    const find = async (query) => {
        const result = await internals.db.collection(collectionName).find(query);
        return result
    }
    const findAll = async (limit = '0') => {
        const result = await internals.db.collection(collectionName).find().limit(limit);
        return result
    }
    const aggregate = async (...pipeline) => {
        const result = await internals.db.collection(collectionName).aggregate(...pipeline);
        return result
    }
    const findOne = async (query) => {
        const result = await internals.db.collection(collectionName).findOne(query);
        return result
    }
    const insertOne = async (obj) => {
        const result = await internals.db.collection(collectionName).insertOne(obj);
        return result
    }
    const insertMany = async (arr, options) => {
        const result = await internals.db.collection(collectionName).insertMany(arr, options);
        return result;
    }
    const updateOne = async (query, updateDoc, options) => {
        const result = await internals.db.collection(collectionName).findOneAndUpdate(query, updateDoc, options);
        return result;
    }
    const deleteOne = async(query) => {
        const result = await internals.db.collection(collectionName).deleteOne(query);
        return result;
    }
    const deleteMany = async(query) => {
        const result = await internals.db.collection(collectionName).deleteMany(query);
        return result;
    }
    return {
        findOne,
        find,
        aggregate,
        findAll,
        insertOne,
        deleteOne,
        deleteMany,
        updateOne,
        insertMany,
    }

} 

module.exports = {connectToDB, getCollectionOperations, internals};

