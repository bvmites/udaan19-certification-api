const {MongoClient,ObjectID} = require('mongodb');

module.exports = (db) => ({
	checkAttendance : (phone,eventName) => {
		return db.collection('Event-Attendance').findOne({
			eventName,
			round1:phone
		})
	},
	getParticipant : (phone,eventName) => {
		return db.collection('participants').findOne({
			phone,
			"events.eventName":eventName
		})
	},
	checkParticipantInCertificateCollection : (phone,eventName) => {
		return db.collection('Event-Certificates').findOne({
			eventName
		}).then((event)=>{
			return event.certificates.indexOf(phone);
		})
	},
	addParticipant: (phone,eventName) => {
		return db.collection('Event-Certificates').updateOne({
			eventName
		},{
			$push:{
				certificates:phone
			}
		},{
			returnOriginal : false
		})
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