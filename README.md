Serverless Tech Talk
====================

This repo holds the notes and assocaited files for a tech talk about "serverless"

Serverless
==========

What is “serverless”?

Serverless is the term used to described the architecture where you upload your code to services that take care of all server concerns so you just need worry about your code.
The code you upload is referred to as as function, so the serverless services provide FaaS or Functions as a Service

Which FaaS providers are there?

* AWS Lambda - Popular
* IBM Cloud Functions - Opensource (openwhisk)
* Google Cloud Functions
* Microsoft Azure Functions - php

For this run through we're going to use AWS.

AWS Lambda
----------

* How does it work?

  * AWS provision containers to execute the functions you have uploaded to Lambda
  * If a function is not already available on a running container one will be provisione.
  * Provisioning a container is not instant, this called “cold starting” your function.
  * After a certain amount of idl time the container will be de-commissioned>

* How does it scale?

  * its already at aws scale
  * when function is triggered aws cold start or reuse a lambd a container

* How much does it cost?

  * not alot! 1M requests per month is free!
  * you can tweak the container that executes your function, more memory = more money!

Lets try it out
---------------

Lets build a serverless application using a simple stack:

    +-----------------+          +--------------------+        +---------------+
    |                 |          |                    |        |               |
    |  JS Client (s3) + <------> + JS Server (Lambda) + <----> | DB (dynamodb) |
    |                 |          |                    |        |               |
    +-----------------+          +--------------------+        +---------------+

### Client

The client is a static site, hosted on S3.

Simple JS demo project using yarn and webpack to easily build the client then use `aws` cli tool to publish site to a bucket

    cd client
    yarn
    yarn build
    aws s3 mb s3://smartdev-reaction
    aws s3 sync ./dist/ s3://smartdev-reaction/ --acl public-read-write
    aws s3 presign s3://smartdev-reaction/index.html

### Database

Lets use AWS's document store service, DynamoDB (simlar to mongodb)

    aws dynamodb create-table --table-name smartDevTeam

You can test out writing documents to DynamoDB, like so:

    aws dynamodb scan --table-name smartDevTeam
    aws dynamodb put-item --table-name smartDevTeam  --item '{"id": {"S": "DDDAAA" }, "leaders": {"L": [ {"M": { "name": {"S": "peter"}, "time": {"N": "12.3"}}}]} }' --return-consumed-capacity TOTAL
    aws dynamodb scan --table-name smartDevTeam
    aws dynamodb delete-item --table-name smartDevTeam  --key '{"id": {"S": "DDDAAA" }}' --return-consumed-capacity TOTAL
    aws dynamodb scan --table-name smartDevTeam

### Server

JS code running in AWS's Lambda service.

The sample code here is a handler that expects to be triggers via an Http API gateway

Creating a function within Lambda is fairly streight forward. I found it abit tricky around permissions so going with the templates is a good idea.

Once configured you can edit the function, view the logs and configure triggers all within the AWS console.

Our function needs to have access to logs and api gateway

CORS tripped me up abit, but this was easily fixed.

    cd lambda
    yarn
    yarn run publish
    curl -vvv -H "Content-Type: application/json" -X POST -d  '{"name": "peter","time":"10.99"}' https://r41jxlsgq7.execute-api.eu-west-1.amazonaws.com/prod/smartReactionTimer

Summary
-------

Its pretty simple to get going and I could imagine running certain applications in this style.

Testing could get tricky but features like deploy environments could help out.

Its all based on AWS services, migrating to another provider migth be costly

Feels like early days for "serverless" and some frameworks are starting to appear.
