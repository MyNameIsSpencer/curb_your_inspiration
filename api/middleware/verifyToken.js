const { verifyToken } = require('../tokens/tokenService');

exports.verifyToken = async (req, res, next) => {

  console.warn('VERIFY TOKEN')
  console.log(req);

  try {
    if (
      !req.get('authorization') ||
      !req.get('Authorization')
    ) {
      return res.status(403).json({ message: 'authorization is requiredddd' });
    }

    const authorization = req.get('authorization') || req.get('Authorization');

    const tokenSplit = authorization.split(' ');
    const token = tokenSplit[tokenSplit.length - 1];

    if (tokenSplit.length !== 2 || !token) {
      return res.status(403).json({ message: 'authorization is requiredffff' });
    }

    // NOTE: technically, this is the "payload" of the token, not the user.
    const user = await verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'invalid or expired token' });
  }
};
