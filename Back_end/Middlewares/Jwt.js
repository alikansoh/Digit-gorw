import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const secretKey = process.env.JWT_SECRET;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.send('not authorized');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      console.error(err.message);
      return res.send('not authorized');
    }

    console.log(decodedToken);
    next();
  });
};
