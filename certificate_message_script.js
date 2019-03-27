const MongoClient = require("mongodb");
const httpRequest = require('request-promise-native');
require("request");

const SMS_SENDER ='BVMSMS';
const SMS_API_KEY = 'nQUvI2XjO3M-W9uZ3C5SJtuSb7J0oszstuigTazIfT';
var SMS_TEST;

const sender = SMS_SENDER;
const apiKey = SMS_API_KEY;
const test = 'true';

MongoClient.connect("mongodb+srv://udaan18:udaan18@udaan18-dj1tc.mongodb.net/",(err,client)=>{
	if (err) {
		return console.log('Unable to connect to the MongoDB Server')
	}
	var db = client.db("Udaan-19");
	console.log('Database Connected');
	db.collection('Event-Attendance').find({}).toArray().then((events)=>{
		events.forEach((event)=>{
			var numbers=event.round1.join(",");
			const message = "Get your certificate from the given link below...";
			const apiRequest = {
				url : 'http://api.textlocal.in/send',
				form : {
					apiKey,
					numbers,
					test,
					sender,
					custom : event.eventName,
					message
				}
			};
			httpRequest.post(apiRequest).then((res)=>{
				var result = JSON.parse(res)
				if (result.status === 'success') {
					console.log('Success : ',event.eventName);
				} else {
					console.log('Error : ',result.errors[0].message,'for',event.eventName)
				}
			})
		})
	})
})