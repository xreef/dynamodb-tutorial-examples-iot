/*
 * DynamoDB Script Examples
 * Update item with DynamoDB
 * DB of selected region in AWS.config.update
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
    TableName: "TestTableMischianti",
    Key: { "ItemId": {"S": 'mischianti'}, "ItemName": {"S": 'www.mischianti.org'}},
    AttributeUpdates: {
        ValueStr: {"Action": "PUT", "Value": {"S": "I'm sure It's the main url of my site"}}
    },
    ReturnValues: "UPDATED_NEW"
};

ddb.updateItem(params, function(err, data) {
    if (err) {
        console.error("Unable add item", JSON.stringify(params, null, 2), ". Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("PutItem succeeded:", JSON.stringify(params, null, 2), data);
    }
});

console.log("End script!");
