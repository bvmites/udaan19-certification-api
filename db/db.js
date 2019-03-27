const {MongoClient,ObjectID} = require('mongodb');

module.exports = (db) => ({
	getParticipant: (phone, eventName)=>{
		return db.collection('newAttendance').findOne({phone:phone, eventName:eventName});
	},
	getVerified : (name,eventName,code)=>{
		return db.collection('participants').findOne({
			name,
			"events.eventName":eventName,
			"events.code":code
		})
	},
	getParticipantTalks: (phone)=>{
		return db.collection('Bvm-Talks').findOne({phone:phone});
	},
	checkParticipantTalks: (name, code)=>{
		return db.collection('Bvm-Talks').findOne({name:name,code:code});
	}
});