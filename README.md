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

Lets try it out
---------------

Lets build a serverless application using a simple stack:

Client source hosted on S3
 - simple JS client demo application (reaction timer)

   cd client
   yarn
   yarn build
   aws copy to s3
   xo open browser pointing at s3 bucket

- DynamoDB

  Very simple setup, give a table a name and a primary key, done

  Test its working with

    aws dynamodb scan --table-name smartDevTeam
    aws dynamodb put-item --table-name smartDevTeam  --item '{"id": {"S": "DDDAAA" }, "leaders": {"L": [ {"M": { "name": {"S": "peter"}, "time": {"N": "12.3"}}}]} }' --return-consumed-capacity TOTAL
    aws dynamodb scan --table-name smartDevTeam
    aws dynamodb delete-item --table-name smartDevTeam  --key '{"id": {"S": "DDDAAA" }}' --return-consumed-capacity TOTAL
    aws dynamodb scan --table-name smartDevTeam

Lambda hosted JS code to register reaction times and serve leader board

  - in AWS console create function

    aws lambda get-function --function-name smartReactionTimer

  - in AWS console edit function add API Gateway

    https://r41jxlsgq7.execute-api.eu-west-1.amazonaws.com/prod/smartReactionTimer

 - simple JS code process requests and write to db (websockets)

   cd server
   yarn
   yarn start

