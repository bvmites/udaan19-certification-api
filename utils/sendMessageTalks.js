const httpRequest = require('request-promise-native');
require('request');

let MongoClient =require('mongodb').MongoClient;
let dotenv =require('dotenv');

dotenv.config();

function sendMessage(contacts){
    const sender = process.env.SMS_SENDER;
    const apiKey = process.env.SMS_API_KEY;
    const test = process.env.SMS_TEST === 'true';
    const numbers = contacts.join(",");
    const message = "All the participants who have registered for BVM Talks have to open this link for receiving your certificate. \n" +
        "Link: https://certificates.udaan19.in/";
    const apiRequest = {
        url: 'http://api.textlocal.in/send',
        form: {
            apiKey,
            numbers,
            test,
            sender,
            // custom: eventID,
            message
            // receiptUrl: 'http://udaan18-messenger.herokuapp.com/textlocal'
        }
    };
    httpRequest.post(apiRequest).then((res)=>{
        result=JSON.parse(res);
        var success=[];
        // console.log(result);
        result.messages.forEach((message)=>{
            success.push(message.recipient.toString().substring(2));
            // console.log(success)
        });
        if (result.status==="success") {
            console.log(success);
            console.log("success");
        } else {
            console.log("failure");
        }

    }).catch((err)=>{
        console.log(err)
    })
}

(async ()=>{
    const client = await MongoClient.connect(process.env.DB, { useNewUrlParser: true});
    const db = client.db('Udaan-19');

    let data = await db.collection('Bvm-Talks').find({}).toArray();
    let phones = [];
    // let phones = ["7069307537"];

    data.forEach(obj=>{
        phones.push(obj.phone);
    });
    console.log(phones.length);
    sendMessage(phones);

})();
