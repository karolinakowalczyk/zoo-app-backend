const fetch = require('node-fetch');
const config = require('../config/auth.config');
exports.getAccessToken = async (req, res) => {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", config.petfinderkey);
    params.append("client_secret", config.petfindersecret);
    try {
        const apiResponse = await fetch(
        'https://api.petfinder.com/v2/oauth2/token',
            {
            method: "POST",
            body: params,
            }
        )
        const apiResponseJson = await apiResponse.json()
        res.json(apiResponseJson.access_token).status(200);
    } catch (err) {
        res.status(500).send('Error occured when get access token to petfinder api');
    }
}