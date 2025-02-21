const { Client, Environment} = require('square');

// Determine the environment based on your NODE_ENV or a custom environment variable
const environment = process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox;

// Configure instance of Square client
const defaultClient = new Client({
    bearerAuthCredentials: {
        accessToken: process.env.SQ_ACCESS_TOKEN
    },
    environment: environment,
    userAgentDetail: "jay limo llc"
})

module.exports = defaultClient