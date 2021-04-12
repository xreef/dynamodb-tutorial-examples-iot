/*
 * DynamoDB Script Examples v3
 * Create table with DynamoDB async await
 * DB of selected region in configDynamoDB
 *
 * AUTHOR:  Renzo Mischianti
 *
 * https://www.mischianti.org/
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Renzo Mischianti www.mischianti.org All right reserved.
 *
 * You may copy, alter and reuse this code in any way you like, but please leave
 * reference to www.mischianti.org in your comments if you redistribute this code.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const { DynamoDBClient, CreateTableCommand  } = require("@aws-sdk/client-dynamodb");
const configDynamoDB = {
    version: 'latest',
    region: "eu-west-1",
    // endpoint: "http://localhost:8000",
    // credentials: {
    //     // accessKeyId default can be used while using the downloadable version of DynamoDB.
    //     // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    //     accessKeyId: "9oiaf7",
    //     // secretAccessKey default can be used while using the downloadable version of DynamoDB.
    //     // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    //     secretAccessKey: "yz5i9"
    //
    // }
};

const dbClient = new DynamoDBClient(configDynamoDB);

(async function () {
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

    try {
        const command = new CreateTableCommand(params);
        const data = await dbClient.send(command);
        console.log('Full success response', JSON.stringify(data,null,2)); // successful response
    }catch (err) {
        console.log('Full error response', JSON.stringify(err,null,2)); // an error occurred
    }

    console.log("End script!");
})();
