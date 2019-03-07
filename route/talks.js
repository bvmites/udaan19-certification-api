const router = require('express').Router();

module.exports = (db) => {
    const database = require('./../db/db.js')(db);

    router.post('/getCertificate',async (req,res)=>{
        try {
            const phone = req.body.phone;
            let result = await database.getParticipantTalks(phone);
            // console.log(result);
            res.status(200).json(result);

        } catch (e) {
            res.status(400).send({
                error: e.message
            })
        }

    });

    router.post('/verify',async (req,res)=>{
        try{
            const name = req.body.name;
            const code = req.body.code;

            let result = await database.checkParticipantTalks(name, code);
            if(result){
                res.status(200).json({message:"True"});
            }else{
                res.status(200).json({message:"False"});
            }
        }catch (e) {
            console.log(e.message);
        }

    });

    return router;
};