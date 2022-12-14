require('dotenv').config();
const dynamodb = require('../db-client');

const responseOptions = {
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
  },
  body: JSON.stringify({}),
};

module.exports = async () => {
  try {
    const { Items: data } = await dynamodb.scan({ TableName: process.env.TABLE_NAME }).promise();

    return {
      ...responseOptions,
      body: JSON.stringify({
        data,
      }),
    };
  } catch (error) {
    return {
      ...responseOptions,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
