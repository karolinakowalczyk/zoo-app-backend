db = db.getSiblingDB("zoo");
db.createUser({
    user: "zoodb",
    pwd: "zoodb",
    roles: [
        {
            role: "readWrite",
            db: "zoo",
        },
    ],
});

db.createCollection("activationhashes");
db.createCollection("attractions");
db.createCollection("freeplaces");
db.createCollection("plans");
db.createCollection("refreshtokens");
db.createCollection("reservations");
db.createCollection("roles");
db.createCollection("users");