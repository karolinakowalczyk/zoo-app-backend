const config = require("../config/auth.config"); //JWTSecret
const db = require("../models");
const User = db.user;
const Role = db.role;
const Token = db.token;
const AccessHash = db.activationHashes;
const { sendEmail } = require('../middlewares/mailer');
//bcryptsalt = 8
const clienturl = "http://localhost:8081";
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

/*exports.resetPasswordRequestController = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "Account with this email not found" });
  } 

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  //let resetToken = crypto.randomBytes(32).toString("hex");
  let resetToken = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // 24 hours
  });
  const hash = await bcrypt.hash(resetToken, Number(8));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  //const link = `${clienturl}/reset-password?token=${resetToken}&id=${user._id}`;
  const link = `${clienturl}/reset-password/${resetToken}`;
  await sendEmail({toUser: user, resetlink: link});
  res.send({ message: "Email was sent!" });
};*/


exports.resetPasswordRequestController = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "Account with this email not found" });
  } 

  const hash = new AccessHash({userId: user._id});
  await hash.save();
  const link = `${clienturl}/reset-password/${hash._id}`;
  await sendEmail({toUser: user, resetlink: link});
  //await sendResetPasswordEmail({toUser: user, hash: hash._id});
  return res.json({message: 'Please check your email to reset the password!'})
};

exports.resetPasswordController = async (req, res ) => {
  //const { password, hash } = req.body;
  const password = req.body.password;
  const hash = req.body.hash;
  console.log(password);
  console.log(hash);
  if (hash.length !== 24) {
    return res.status(404).send({ message: "Cannot reset a password!" });
  }
  const aHash = await AccessHash.findOne({ _id: hash });
  if (!aHash) {
    return res.status(404).send({ message: "Cannot reset a password!" });
  } 

  /*const aHash = await AccessHash.findOne({ _id: hash });
  //console.log(aHash);
  if (!aHash) {
    console.log("bad hash");
    return res.status(422).send({ message: "Cannot reset a password!" });
  }*/

    /*const user = await User.findOne({_id: aHash.userId});
    if (!user) {
      return res.status(422).send('Cannot reset a password 2!');
    }*/
    await User.updateOne(
    { _id: aHash.userId },
    { password: bcrypt.hashSync(password, 8) } 
  );
    //await user.remove();
    await aHash.remove();
    //const newUser = new User({...user, password});
    //await newUser.hashPassword();
    //await newUser.save();
    console.log("hey");
    return res.json({message: 'Password has been reseted!'});

};

const resetPassword = async (token, password) => {
  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  /*const user = await User.findById({ _id: userId });

  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );*/

  await passwordResetToken.deleteOne();

  return true;
};

/*exports.resetPasswordController = async (req, res, next) => {
  const resetPasswordService = await resetPassword(
    req.body.userId,
    req.body.token,
    req.body.password
  );
  return res.json(resetPasswordService);
};*/