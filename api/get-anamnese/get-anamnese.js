/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

const AWS = require("aws-sdk");
const cookie = require("cookie");

const WEB_CLIENT_URL = {
  local: process.env.LOCAL_WEB_CLIENT_URL,
  dev: process.env.DEV_WEB_CLIENT_URL,
}[process.env.ENVIRONMENT];

const DOCUMENTS_TABLE_NAME = process.env.DOCUMENTS_TABLE_NAME;

function withCatchAll(fn) {
  return async function () {
    try {
      return await fn(...arguments);
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: err.message, stack: err.stack }),
      };
    }
  };
}

const corsHeaders = {
  "Access-Control-Allow-Origin": WEB_CLIENT_URL,
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "origin, content-type, accept, cookie",
};

function validateInputs(event) {
  return null;
}

exports.lambdaHandler = withCatchAll(async (event, context) => {
  console.log("mop0");
  if (event.httpMethod === "OPTIONS") {
    return { headers: corsHeaders };
  }
  const cookies = cookie.parse(event.headers.Cookie || "");

  if (cookies["ergo-one-session-id"] !== "123") {
    console.log("mop1");
    return {
      headers: corsHeaders,
      statusCode: 403,
      body: JSON.stringify({ message: "None shall pass" }),
    };
  }

  const validationErrors = validateInputs(event);
  if (validationErrors) {
    console.log("mop2");
    return {
      headers: corsHeaders,
      statusCode: 400,
      body: JSON.stringify({ message: "Bad Request" }),
    };
  }

  // const document = JSON.parse(event.body).document;
  const dbClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-08-10",
  });

  const dbResponse = await dbClient
    .get({
      TableName: DOCUMENTS_TABLE_NAME,
      Key: { id: "1" },
    })
    .promise();

  const document = dbResponse.Item.document;

  console.log("mop3");
  return {
    headers: corsHeaders,
    statusCode: 200,
    body: JSON.stringify({ document }),
  };
});
