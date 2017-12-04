#!/usr/bin/env bash

echo "Publish code from directory ./src to AWS ($MYFUNCTION) function.."
[ -f lambda.zip ] && rm lambda.zip
zip -X -j -r ./lambda.zip ./src/*
aws lambda update-function-code --function-name $MYFUNCTION --zip-file fileb://`pwd`/lambda.zip
