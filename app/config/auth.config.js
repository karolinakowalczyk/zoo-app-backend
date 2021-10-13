module.exports = {
  secret: "zoo-app-key",
  jwtExpiration: 3600,           // 1 hour
  jwtRefreshExpiration: 86400,   // 24 hours
  allowedURLs: [
    "http://localhost:8081",
    "https://api.petfinder.com"
  ],
  petfinderkey: "HS5962v4NTN1Mo4StTNQ4sxlVPsCXnIZRz0KQLR9Ihi0xJTota",
  petfindersecret: "6TwCtSlk1lwO5w4HbFprjxMy6qWpWZeUgf7esv4D"
};