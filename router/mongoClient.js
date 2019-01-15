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
    }
  }
  