const config = require("../config/auth.config"); //JWTSecret
const db = require("../models");
const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;
const AccessHash = db.activationHashes;
const { sendEmail } = require('../middlewares/mailer');
const clienturl = config.allowedURLs[0];
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
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(user);

      let authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        surname: user.surname,
        address: user.address,
        postalCode: user.postalCode,
        city: user.city,
        phonenumber: user.phonenumber,
        roles: authorities,
        accessToken: token,
        refreshToken: refreshToken,
      });
    });
};


exports.refreshToken = async (req, res) => {
  
  const requestToken = req.body.refreshToken;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
      
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).send({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token
    });
    
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};


exports.resetPasswordRequestController = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "Account with this email not found" });
  }

  let expiredAt = new Date();

  expiredAt.setSeconds(
    expiredAt.getSeconds() + config.activationHashExpiration
  );
  const hash = new AccessHash({userId: user._id, expiryDate: expiredAt });
  await hash.save();
  const link = `${clienturl}/reset-password/${hash._id}`;
  await sendEmail({toUser: user, resetlink: link});
  return res.status(200).json({message: 'Please check your email to reset the password!'})
};

exports.resetPasswordController = async (req, res ) => {
  const password = req.body.password;
  const hash = req.body.hash;
  if (hash.length !== 24) {
    return res.status(404).send({ message: "Cannot reset a password!" });
  }

  const aHash = await AccessHash.findOne({ _id: hash });
  if (aHash.expiryDate.getTime() < new Date().getTime()) {
    await aHash.remove();
    return res.status(404).send({ message: "Hash is expired!" });
  }
  if (!aHash) {
    return res.status(404).send({ message: "Cannot reset a password!" });
  }

  const user = await User.findOne({ _id: aHash.userId });
  let samePasswords = bcrypt.compareSync(
    password,
    user.password
  );
  if (samePasswords) {
    return res.status(404).send({ message: "New password must be different from the old one!"});
  }
  
  await User.updateOne(
    { _id: aHash.userId },
    { password: bcrypt.hashSync(password, 8) } 
  );
    await aHash.remove();
    return res.json({message: 'Password has been reseted!'});
};

exports.editProfile = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "Account not found" });
  }
  
await User.findOneAndUpdate(
    { email: email },
    {
      $set: {
        name: req.body.name,
        surname: req.body.surname,
        address: req.body.address,
        postalCode: req.body.postalCode,
        city: req.body.city,
        phonenumber: req.body.phonenumber
      }
    },
    {
      upsert: true
    }
  )
  .then(() => { return res.json({ message: 'Your profile has been updated!' }); })
  .catch(error => {return res.status(404).send({ message: error });});
}