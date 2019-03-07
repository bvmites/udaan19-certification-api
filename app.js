const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv')
dotenv.config()
var app = express();
app.use(bodyParser.json())
// console.log(parseInt(process.env.PORT))
const router = require('./route/routes.js')
// require('./db/initialize.js')
MongoClient.connect(process.env.DB,(err,client)=>{
	if (err) {
    	return console.log('Unable to connect to MongoDB server');
  	}

  	console.log('Connected to MongoDB server');
  	var db=client.db('Udaan-19')
  	app.use('/',router(db))
})
var port = parseInt(process.env.PORT) || 3000
app.listen(port,()=>console.log(`Connected to port ${port}`));