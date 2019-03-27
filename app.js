const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
const logger = require('morgan');
app.use(logger('dev'));
const router = require('./route/routes');
const talks = require('./route/talks');
app.use(cors());


MongoClient.connect(process.env.DB,{ useNewUrlParser: true },(err,client)=>{
	if (err) {
    	return console.log('Unable to connect to MongoDB server');
  	}
  	console.log('Connected to MongoDB server');
  	var db=client.db('Udaan-19');
  	app.use('/',router(db));
  	app.use('/talks',talks(db));
});
var port = parseInt(process.env.PORT) || 3000;
app.listen(port,()=>console.log(`Connected to port ${port}`));