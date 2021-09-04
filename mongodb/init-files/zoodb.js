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

/*db.createCollection("users");

db.users.insertMany(
    [
        {
            _id: new ObjectId("61001441bd7856fd1bcda534"),
            createdAt: new Date(),
            updatedAt: new Date(),
            login: "ania123@wp.pl",
            password: "qwerty",
            name: "Anna",
            surname: "Nowak",
         },
        {
            _id: new ObjectId("61001507bd7856fd1bcda537"),
            createdAt: new Date(),
            updatedAt: new Date(),
            login: "jan123@gmail.com",
            password: "jan123",
            name: "Jan",
            surname: "Kowalski",
        }
    ]
);*/
