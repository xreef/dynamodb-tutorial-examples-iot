/*
 * DynamoDB Script Examples
 * Create table in
 * DB of selected region in AWS.config.update
 *
 * AUTHOR:  Renzo Mischianti https://www.mischianti.org/
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Renzo Mischianti www.mischianti.org All right reserved.
 *
 * You may copy, alter and reuse this code in any way you like, but please leave
 * reference to www.mischianti.org in your comments if you redistribute this code.
 *
 */

var AWS = require("aws-sdk");

AWS.config.update({
    apiVersion: '2012-08-10',
    region: "eu-west-1",
    // endpoint: "http://localhost:8000",
    // // accessKeyId default can be used while using the downloadable version of DynamoDB.
    // // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    // accessKeyId: "9oiaf7",
    // // secretAccessKey default can be used while using the downloadable version of DynamoDB.
    // // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    // secretAccessKey: "yz5i9"
});

var ddb = new AWS.DynamoDB();

console.log("Start script!");

var params = {
    TableName: 'TestTableMischianti',
    KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
        { // Required HASH type attribute
            AttributeName: 'ItemId',
            KeyType: 'HASH',
        },
        {
            AttributeName: 'ItemName',
            KeyType: 'RANGE'
        }
    ],
    AttributeDefinitions: [ // The names and types of all primary and index key attributes only
        { // Type attribute
            AttributeName: 'ItemId',
            AttributeType: 'S',
        },
        {
            AttributeName: 'ItemName',
            AttributeType: 'S'
        }
        // ... more attributes ...
    ],
    ProvisionedThroughput: { // required provisioned throughput for the table
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
    },
};

ddb.createTable(params, function(err, data) {
    if (err) {
        console.log('Full error response', JSON.stringify(err,null,2)); // an error occurred

        console.log('message --> ', err.message);
    } else {
        console.log('Full success response', JSON.stringify(data,null,2)); // successful response
    }
});
console.log("End script!");

