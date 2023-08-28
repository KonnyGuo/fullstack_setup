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


MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log("database connected")
        db = client.db(dbName)
        collection = db.collection('movies')
    })

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
