let fs = require('fs');
let parse = require('csv-parse/lib/sync');
let MongoClient =require('mongodb').MongoClient;
let dotenv =require('dotenv');
let crypto = require('crypto');

dotenv.config();

const inputFile = './Data/BVM-Talks/data.csv';

function readData(fileName) {
    const data = fs.readFileSync(fileName);
    return parse(data).map(column=>{
        const thestr = column[2]+column[3];
        let code = crypto.createHmac('sha512',process.env.CODE_KEY).update(thestr).digest('hex').toString().slice(0,8);

        return{
            name: column[2],
            phone: column[3],
            code: code
        }
    }).slice(1);
}

(async ()=>{
    const client = await MongoClient.connect(process.env.DB, { useNewUrlParser: true});
    const db = client.db('Udaan-19');

    let theData = readData(inputFile);
    // console.log(theData);
    let result = await db.collection('Bvm-Talks').insertMany(theData);
    console.log('Done!')
})();