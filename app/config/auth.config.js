module.exports = {
  secret: "zoo-app-key",
  jwtExpiration: 3600,           // 1 hour
  jwtRefreshExpiration: 86400,   // 24 hours
  allowedURLs: [
    "http://localhost:8081",
    "https://api.petfinder.com"
  ],
};