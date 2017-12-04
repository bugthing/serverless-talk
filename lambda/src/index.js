console.log('Loading function');

const uuid = require('uuid');
const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

let tableName = 'smartDevTeam'

exports.handler = (event, context, callback) => {

    console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    switch (event.httpMethod) {
        case 'GET':
            dynamo.scan({ TableName: tableName }, done)
            break;
        case 'POST':
            console.log(event.body)
            let reactionEntry = Object.assign({}, event.body, { id: uuid.v4() })
            console.log("bum")
            dynamo.putItem(reactionEntry, function() {
                dynamo.scan({ TableName: tableName }, done);
            });
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }

};

