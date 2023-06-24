
// const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')

const ConnectDatabase = async (uri) => {
    // const client = new MongoClient(uri, {
    //     serverApi: {
    //       version: ServerApiVersion.v1,
    //       strict: false,
    //       deprecationErrors: true,
    //     }
    //   });
      
    //   async function run() {
    //     try {
    //       await client.connect();
    //       await client.db("ecommerce").command({ ping: 1 });
    //       console.log("DB Connected");
    //     }
    //     catch(error) {
    //       console.log(error);
    //       process.exit(1);
    //     }
    //   }
    //   run().catch(console.dir);
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        console.log('DB Connected');
      })
      .catch((error) => {
        console.error('Error connecting to the database:', error);
      });
  
      mongoose.connection.on('error', (error) => {
        console.error('Database connection error:', error);
      });
  
      mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from the database');
      });
      
}

module.exports = ConnectDatabase;
