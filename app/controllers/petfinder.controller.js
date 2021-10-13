
let request = require('request');
exports.fetchAccessToken = async (req, res) => {
    //const request = require('request-promise');
    console.log("hey");
    
const params = new URLSearchParams();
params.append("grant_type", "client_credentials");
params.append("client_id", "HS5962v4NTN1Mo4StTNQ4sxlVPsCXnIZRz0KQLR9Ihi0xJTota");
params.append("client_secret", "6TwCtSlk1lwO5w4HbFprjxMy6qWpWZeUgf7esv4D");
const options = {
    method: 'POST',
    uri: 'https://api.petfinder.com/v2/oauth2/token',
    body: params,
    json: true,

}
    request(options, function (response) {
        console.log(response);
    res.status(200).json(response);
})
      /*const params = new URLSearchParams();
      console.log(process.env.REACT_APP_PET_FINDER_API_SECRET);
      params.append("grant_type", "client_credentials");
      params.append("client_id", "HS5962v4NTN1Mo4StTNQ4sxlVPsCXnIZRz0KQLR9Ihi0xJTota");
      //params.append("client_id", petfinderkeys.PET_FINDER_API_KEY);
      
      params.append("client_secret", "6TwCtSlk1lwO5w4HbFprjxMy6qWpWZeUgf7esv4D");
      const petfinderRes = await fetch(
        "https://api.petfinder.com/v2/oauth2/token",
        {
          method: "POST",
          body: params,
        }
      );
      const data = await petfinderRes.json();
      setAccessToken(data.access_token);*/
    };