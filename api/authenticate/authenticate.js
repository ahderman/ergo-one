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

const cookie = require("cookie");

const WEB_CLIENT_URL = {
  local: process.env.LOCAL_WEB_CLIENT_URL,
  dev: process.env.DEV_WEB_CLIENT_URL,
}[process.env.ENVIRONMENT];

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

exports.lambdaHandler = withCatchAll(async (event, context) => {
  console.log(event);
  const cookies = cookie.parse(event.headers.Cookie || "");
  console.log(JSON.stringify(cookies));

  if (cookies["ergo-one-session-id"] !== "123") {
    return {
      headers: corsHeaders,
      statusCode: 403,
      body: JSON.stringify({ message: "None shall pass" }),
    };
  }

  return {
    headers: corsHeaders,
    statusCode: 200,
    body: JSON.stringify({ user: { username: "magali" } }),
  };
});
