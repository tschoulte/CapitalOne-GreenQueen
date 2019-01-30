var AWS = require('aws-sdk');

AWS.config.update({
  region: "us-east-1",
  endpoint: 'dynamodb.us-east-1.amazonaws.com',
  // accessKeyId default can be used while using the downloadable version of DynamoDB. 
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  accessKeyId: "xxx",
  // secretAccessKey default can be used while using the downloadable version of DynamoDB. 
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  secretAccessKey: "xxx"
});

var dynamodb = new AWS.DynamoDB();

const table = "cap1_users"
var docClient = new AWS.DynamoDB.DocumentClient();

exports.getItem = function getItem(key) {

   var params = {
        TableName: table,
        Key:{
            "username": key
        }
    };
    return new Promise((resolve, reject) => {
      docClient.get(params, function(err, data) {
      if(err)
        reject(err)
      resolve(data)
      });
    })

}

exports.insertItem = function insertItem(key,info,progress,streaks,goal,forest) {

    var params = {
        TableName :table,
        Item:{
         "username": key,
         "info": info,
         "progress": progress,
         "streaks": streaks,
         "goal": goal,
         "forest": forest
        }
    };

    return new Promise((resolve, reject) => {
      docClient.put(params, function(err, data) {
      if(err)
        reject(err)
      resolve(data)
      });
    })
}

const keys = {
  streaks: ":s",
  progress: ":p",
  goal: ":g",
  forest: ":f"
}

exports.updateItem = function updateItem(key, value) {

    const expAttrValue = {}

    const expArray = Object.keys(value).map(key => {
      expAttrValue[`${keys[key]}`] = value[key]
      return `${key} = ${keys[key]}`
    })

    console.log(expArray.join(', '), expAttrValue)
    var params = {
        TableName:table,
        Key:{
            "username": key
        },
        UpdateExpression: `set ${expArray.join(', ')}`,
        ExpressionAttributeValues: expAttrValue,
        ReturnValues:"UPDATED_NEW"
    };

    return new Promise((resolve, reject) => {
      docClient.update(params, function(err, data) {
      if(err)
        reject(err)
      resolve(data)
      });
    })
}

//export default dynamodb





