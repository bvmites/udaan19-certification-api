const router = require('express').Router();

module.exports = (db) => {
	const database = require('./../db/db.js')(db);

	router.post('/getCertificate',async (req,res)=>{
		try {
			let phone = req.body.phone;
			let event = req.body.eventName;

			let participant = await database.getParticipant(phone, event);
			console.log(participant);
			res.status(200).json(participant);

		} catch (e) {
			res.status(400).send({
				error: e.message
			})
		}
	});

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
	});

	return router;
};