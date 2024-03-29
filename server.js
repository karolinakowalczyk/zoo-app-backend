const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const auth = require("./app/config/auth.config");
const allowedUrls = auth.allowedURLs;

const corsStaticOptions = {
  credentials: true,
  origin: allowedUrls,
};

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

//connect with db
db.mongoose
  .connect(dbConfig.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello! It's Zoo App server" });
});

// routes
app.use(cors(corsStaticOptions));

require("./app/routes/auth.routes")(app);
require("./app/routes/attractions.routes")(app);
require("./app/routes/reservations.routes")(app);
require("./app/routes/plans.routes")(app);
require("./app/routes/petfinder.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });
        
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}