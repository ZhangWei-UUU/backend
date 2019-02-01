const MongoClient = require("mongodb").MongoClient;
var ObjectId = require('mongodb').ObjectID;
const DB_CONFIG = require("../db");

module.exports = {
    queryUser: async (user,collectionName) => {
        let db, client,queryObject;
        client = await MongoClient.connect(DB_CONFIG.url, { useNewUrlParser: true });
        db = client.db(DB_CONFIG.dbname);
        
        try {
            if(user){
                queryObject = { userName : user.userName,password:user.password };
                return await db.collection(collectionName).findOne(queryObject);
              }else{
                return await db.collection(collectionName).find({}).toArray();
              }   
        } catch(err){
          return {success:false,message:err}
        }finally {
          client.close();
        }
    },

    queryData: async (id,collectionName) => {
      let db, client,queryObject;
      client = await MongoClient.connect(DB_CONFIG.url, { useNewUrlParser: true });
      db = client.db(DB_CONFIG.dbname);
      
      try {
          if(id){
            queryObject = { "_id" : ObjectId(`${id}`) }
            const res = await db.collection(collectionName).findOne(queryObject);
            return {success:true,result:res}
          }else{
            
            const res = await db.collection(collectionName).find({}).toArray();
            return {success:true,result:res}
          }   
      } catch(err){
        return {success:false,message:err}
      }finally {
        client.close();
      }
    },

    insertSingle: async (object,collectionName) => {
        let db, client;
        try {
          client = await MongoClient.connect(DB_CONFIG.url, { useNewUrlParser: true });
          db = client.db(DB_CONFIG.dbname);
          let res = await db.collection(collectionName).insertOne(object);
          return res.result;
        } catch(err){
          return {success:false,message:err}
        }finally {
          client.close();
        }
    },

    updateSingle: async (updateObj,userId,collectionName) => {
        let db, client;
        try {
          client = await MongoClient.connect(DB_CONFIG.url, { useNewUrlParser: true });
          db = client.db(DB_CONFIG.dbname);
          return await db.collection(collectionName).updateOne({object})
        } catch(err){
          throw new Error(err)
        }finally {
          client.close();
        }
    },

    deleteSingle: async (id,collectionName) => {
        let db, client;
        client = await MongoClient.connect(DB_CONFIG.url, { useNewUrlParser: true });
        db = client.db(DB_CONFIG.dbname);
        var deletedObject = { "_id" : ObjectId(`${id}`) }
        try {
          return await db.collection(collectionName).findOneAndDelete(deletedObject)
        } catch(err){
          return {success:false,message:err}
        }finally {
          client.close();
        }
    }
  }
  