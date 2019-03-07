const {MongoClient} = require('mongodb');

MongoClient.connect(process.env.DB,(err,client)=>{
	if (err) {
    	return console.log('Unable to connect to MongoDB server');
  	}
  	// console.log('Connected to MongoDB server');
  	var db=client.db('Udaan-19');
  	db.collection('events').find({}).toArray().then((docs)=>{
  		docs.forEach((event)=>{
  			db.collection('Event-Certificates').insertOne({
  				eventName:event.eventName,
  				certificates:new Array()
  			})
  		})
  	})
})