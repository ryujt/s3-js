const AWS = require("aws-sdk");
const multipart = require("multipart");

const s3 = new AWS.S3();

let result = {};

exports.handler = async (event) => {
    try {
        var contentType = event.params.header["Content-Type"];
        if (!contentType) contentType = event.params.header["content-type"];

        const bodyBuffer = Buffer.from(event["body-json"], "base64");
        const boundary = multipart.getBoundary(contentType);
        const parts = multipart.Parse(bodyBuffer, boundary);
        const file = parts[0];
        const bucketName = 'static-web-20230219';

        result.source = file.filename;
        result.filename = "files/" + dateStr() + '/' + randomStr(32);

        const keyName = result.filename;
        const params = { 'Bucket': bucketName, 'Key': keyName, 'Body': file.data };

        await s3.putObject(params).promise();
    } catch(e) {
        const response = {
            statusCode: 400,
            body: e,
        };
        return response;
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    return response;
};

function dateStr() {
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    return year + '.' + month  + '.' + day;
}

function randomStr(count) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < count; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}