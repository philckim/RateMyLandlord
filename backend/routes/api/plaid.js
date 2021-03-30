const express = require('express');
const keys = require('../../config/default.json');
const plaid = require('plaid');
const cors = require('cors');
const config = require('config');
const router = express.Router();

const client = new plaid.Client({
    clientID: keys.PLAID_CLIENT_ID,
    secret: keys.PLAID_SECRET,
    env: plaid.environments.sandbox
});

router.post('/create_link_token', async (req, res) => {
    try {
        const response = await client.createLinkToken({
            user: {
              client_user_id: '123-test-user-id',
            },
            client_name: 'Plaid Test App',
            products: ['auth', 'transactions'],
            country_codes: ['US'],
            language: 'en',
            webhook: 'https://sample-web-hook.com',
            account_filters: {
              depository: {
                account_subtypes: ['checking', 'savings'],
              },
            },
          })
          return res.send({link_token: response.link_token}) 
    } catch (err) {
        return res.send({ err: err.message })
    }
});

router.post('/get_link_token', async (req, res) => {
    const response = await client.getLinkToken(link_token).catch((err) => {
        if(!linkToken) {
            return 'no link token'
        }
        return response
    })
});

router.post('/get_access_token', async(req, res) => {
    // console.log("req.body first", req.body)
    const {publicToken} = req.body
    // console.log("server req", req.body)
    // console.log("public token server side", publicToken)
    const response = await client
      .exchangePublicToken(publicToken)
      .catch((err) => {
        if(!publicToken){
          return "no public token"
        }
      });
    console.log("response server", response)
    const itemId = response.item_id;
    return res.send({access_token: response.access_token}) 
});

router.post('/transactions', async(req, res) =>{
    const {accessToken} = req.body
    const response = await client
    .getTransactions(accessToken, '2020-01-01', '2021-03-31', {
      count: 250,
      offset: 0,
    })
    .catch((err) => {
      if(!accessToken){
        return "no access token"
      }
    });
    console.log(response.transactions)
    return res.send({transactions: response.transactions}) 
 })
  
  router.get('/transactions', (req, res) =>{
    res.send('hello world')
})

module.exports = router;