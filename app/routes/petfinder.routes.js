const controller = require("../controllers/petfinder.controller");
const fetch = require('node-fetch')

module.exports = function(app) {
  //app.get("/api/petfinder/getAccessToken", controller.fetchAccessToken);
        app.get('/api/petfinder/getAccessToken', async (req, res) => {
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        params.append("client_id", "HS5962v4NTN1Mo4StTNQ4sxlVPsCXnIZRz0KQLR9Ihi0xJTota");
        params.append("client_secret", "6TwCtSlk1lwO5w4HbFprjxMy6qWpWZeUgf7esv4D");
        try {
            const apiResponse = await fetch(
            'https://api.petfinder.com/v2/oauth2/token',
                {
                method: "POST",
                body: params,
                }
            )
            const apiResponseJson = await apiResponse.json()
           res.json(apiResponseJson.access_token);
        } catch (err) {
            res.status(500).send('Something went wrong')
        }
        })
};