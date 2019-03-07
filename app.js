const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');

var app = express();
app.use(bodyParser.json())

const router = require('./route/routes.js')
// require('./db/initialize.js')
MongoClient.connect("mongodb+srv://udaan18:udaan18@udaan18-dj1tc.mongodb.net/",(err,client)=>{
	if (err) {
    	return console.log('Unable to connect to MongoDB server');
  	}

  	console.log('Connected to MongoDB server');
  	var db=client.db('Udaan-19')
  	app.use('/',router(db))
})

app.listen(3000,()=>console.log('Connected to port 3000'));