let fs = require('fs');
let parse = require('csv-parse/lib/sync');
let MongoClient = require('mongodb').MongoClient;
let dotenv = require('dotenv');
let crypto = require('crypto');
dotenv.config();


const inputFile = 'Data/ALL CSV/w3.csv';   //me5 done

// let event = {};

function readEventDataNew(fileName) {
    const data = fs.readFileSync(fileName);
    return parse(data).map(column => {

        const thestr = column[6]+column[5];
        let code = crypto.createHmac('sha512','theKey').update(thestr).digest('hex').toString().slice(0,8);


        // let event = {
        //     rec_no: column[1],
        //     eventName: column[6],
        //     code: code,
        //     round: 0
        // };
        // console.log(event);
        return{
            name: column[2].toLowerCase(),
            branch: column[3].toLowerCase(),
            year: column[4],
            phone: column[5],
            eventName: column[6],
            code: code,
            rank: 0
            // code: code
        };
    }).slice(1); //remove header
}

let newData = readEventDataNew(inputFile);
console.log(newData);


async function getData(db){
    try{
        const storedData = await db.collection("newAttendance").insertMany(newData);
    }catch (e) {
        console.log(e.message);
    }
}

(async ()=>{
    const client = await MongoClient.connect(process.env.DB, { useNewUrlParser: true});
    const db = client.db('Udaan-19');

    let res = await getData(db);
    console.log(inputFile);
    console.log("Done!");
})();

