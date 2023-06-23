
const { MongoClient, ServerApiVersion } = require('mongodb');

const ConnectDatabase = async (uri) => {
    const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      
      async function run() {
        try {
          await client.connect();
          await client.db("admin").command({ ping: 1 });
          console.log("DB Connected");
        }
        catch(error) { 
            console.log(error);
        } finally {
          await client.close();
        }
      }
      run().catch(console.dir);
}

module.exports = ConnectDatabase;
