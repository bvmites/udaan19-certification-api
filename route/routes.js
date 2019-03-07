const router = require('express').Router();

module.exports = (db) => {
	const database = require('./../db/db.js')(db);

	router.post('/getCertificate',async (req,res)=>{
		try {
			var result = await database.checkAttendance(req.body.phone,req.body.eventName);
			var success = await database.getParticipant(req.body.phone,req.body.eventName);
			success.events.forEach((event)=>{
				if(event.eventName === req.body.eventName) {
					res.status(200).send({
						name : success.name,
						eventName:event.eventName,
						code: event.code
					})
				}
			})
			var status = await database.checkParticipantInCertificateCollection(req.body.phone,req.body.eventName);
			if( status === -1 ) {
				var final = await database.addParticipant(req.body.phone,req.body.eventName);
			}
		} catch (e) {
			res.status(400).send({
				error: e.message
			})
		}

	})

	router.post('/verify',async (req,res)=>{
		var result = await database.getVerified(req.body.name,req.body.eventName,req.body.code);
		if (result) {
			res.status(200).send({
				success:"User is present"
			})
		} else {
			res.status(400).send({
				error: "Invalid code or name"
			})
		}
	})

	return router;
}