const config = require("../config/auth.config"); //JWTSecret
//const clienturl = require("../config/clienturl.config"); //clientURL
const db = require("../models");
const User = db.user;
const Role = db.role;
const AccessHash = db.activationHashes;
//const { sendResetPasswordEmail } = require('../middlewares/mailer');
const sendEmail = require("../middlewares/sendEmail");
//bcryptsalt = 8
const clienturl = "localhost://8081";
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};


exports.resertPasswordRequest = async (req, res) => {
  const user = await User.findOne({email: req.body.email})
  if (!user) {
      return res.status(404).send({ message: "User Not found." });
  }
  //return res.status(200).send({ message: "OK" });
  let resetToken = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // 24 hours
  });
  const hash = await bcrypt.hash(resetToken, Number(8));
  const link = `${clienturl}/passwordReset?token=${resetToken}&id=${user._id}`;
  sendEmail(
    user.email,
    "Password Reset Request",
    {
      name: user.name,
      link: link,
    },
    "./template/requestResetPassword.handlebars"
  );
  return res.json({ message: user.email + link + 'Please check your email to reset the password!' });
    
  //return link;

  /*try {
  const user = User.findOne({
    email: req.body.email
  })
  .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    //return res.json({ message: user.email + 'Please check your email to reset the password!' });
    
    const link = `http://localhost:8081/api/auth/passwordReset?token=${resetToken}&id=${user._id}`;
    sendEmail(user.email,"Password Reset Request",{name: user.name,link: link,},"./template/requestResetPassword.handlebars");
    return link;
    });
    //return res.json({ message: user + 'Please check your email to reset the password!' });
  } catch {
      return res.status(422).send("An error occured trying to reset password!")
  }*/
};

exports.resertPassword = (req, res) => {
  try {
   
  } catch {

  }
};