const { sign } = require('jsonwebtoken');

const createAccessToken = (user) => {
  const { _id, role } = user;

  const payload = {
    user: {
      id: _id,
      role,
    },
  };

  return sign(payload, process.env.JWT_KEY_ACCESS, { expiresIn: process.env.JWT_KEY_ACCESS_TIME });
};

exports.sendTokenResponse = (user, res) => {
  const accessToken = createAccessToken(user);

  return res.json({ accessToken });
};
