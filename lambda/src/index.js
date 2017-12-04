const uuid = require('uuid');
const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

let tableName = 'smartDevTeam'

exports.handler = (event, context, callback) => {

    switch (event.httpMethod) {
        case 'POST':
            let payload = JSON.parse(event.body)
            let doc = {
                "TableName": tableName,
                "Item" : {
                    "id": uuid.v4(),
                    "name": payload.name,
                    "time": payload.time
                }
            }
            dynamo.putItem(doc, (err, data) => {
                dynamo.scan({ TableName: tableName }, (err, res) => {

                    let leaderBoard = res.Items.sort((a, b) => { return a.time - b.time })
                    
                    callback(null, {
                      statusCode: '200',
                      body: JSON.stringify(leaderBoard),
                      headers: { 'Content-Type': 'application/json' }})
                })
            });
            break;
        default:
            callback(null, { statusCode: '400', body: 'Unsupported method' })
    }

};

