const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionString = process.env.connectStr,
    dbName = "sample_mflix",
    collection 

//middleware (tool to help when data that moves back and forth gets easier to understand)
//need to be before any crud (get,post,update,deletes)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


// MongoClient.connect(dbConnectionString)
//     .then(client => {
//         console.log("database connected")
//         db = client.db(dbName)
//         collection = db.collection('movies')
//     })

//using async await syntax
// useNewUrlParser: This option is used to ensure that the MongoDB driver uses the new URL parser. The URL parser is used to parse the connection string in a more modern and standardized way. It's recommended to set this to true.

// useUnifiedTopology: This option is used to enable the new unified topology engine. The unified topology engine is designed to provide better support for new MongoDB driver features and to handle failover and replica sets more effectively. It's recommended to set this to true.

// useFindAndModify: This option controls the usage of the findOneAndUpdate and findOneAndDelete methods. If set to false, these methods will use the native findOneAndUpdate instead of the deprecated findAndModify method. It's recommended to set this to true to use the new method.
const connectDb = async () => {
  try {
    const client = await MongoClient.connect(dbConnectionString, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:true
    });
    console.log("database connected");
    db = client.db(dbName);
    collection = db.collection('movies');
  } catch (error) {
    console.error(error);
  }
};

connectDb();

app.get("/", async(req, res)=> {
     try {
        res.render('index.ejs')
     } catch (error) {
        response.status(500).send({message: error.message})
     }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`server is running ${PORT}`)
})
