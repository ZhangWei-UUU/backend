const MongoClient = require("mongodb").MongoClient;
const DB_CONFIG = require("../db");

module.exports = {
    queryData: async (query={},collectionName) => {
      let db, client;
      try {
        client = await MongoClient.connect(DB_CONFIG.url, { useNewUrlParser: true });
        db = client.db(DB_CONFIG.dbname);
        return await db.collection(collectionName).find(query).toArray();
      } catch(err){
        throw new Error(err)
      }finally {
        client.close();
      }
    },

    insertSingle: async (object,collectionName) => {
        let db, client;
        try {
          client = await MongoClient.connect(DB_CONFIG.url, { useNewUrlParser: true });
          db = client.db(DB_CONFIG.dbname);
          return await db.collection(collectionName).insertOne(object);
        } catch(err){
          throw new Error(err)
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

    deleteSingle: async (id,userId,collectionName) => {
        let db, client;
        try {
          client = await MongoClient.connect(DB_CONFIG.url, { useNewUrlParser: true });
          db = client.db(DB_CONFIG.dbname);
          return await db.collection(collectionName).remove({id:id})
        } catch(err){
          throw new Error(err)
        }finally {
          client.close();
        }
    }
  }
  