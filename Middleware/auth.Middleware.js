const jwt = require("jsonwebtoken");
const User = require("../Models/user.Model");

const authorize = (requiredRolesOrPermissions=[]) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.header("Authorization");
      if (!authHeader) {
        console.log("Authorization header is missing");
        return res.status(401).json({ error: "Authorization header missing" });
      }
      const token = authHeader.replace('Bearer', '').trim();
      console.log("Token from header:", token);
      if (!token) {
        console.log("Token missing in Authorization header");
        return res
          .status(401)
          .json({ error: "Token missing in Authorization header" });
      }
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        console.log("Invalid token:", err.message);
        return res.status(401).json({ error: "Invalid token" });
      }
      console.log(`Decoded token ID: ${decoded.id}`);
      const user = await User.findOne({
        _id: decoded.id,
        sessionTokens:{ $elemMatch: {token} },
      });
      console.log("user is:", user);

      if (!user) {
        console.log("Token not found in sessionTokens or user does not exist.");
        return res.status(401).json({ error: "User not authorized" });
      }
    //   if (requiredPermission.length > 0){
    //   const hashedPermissions = requiredPermission.every((permission) =>
    //     user.permissions.includes(permission)
    //   );
    //   if (!hashedPermissions) {
    //     console.log("Insufficient permission:", requiredPermission, "User permissions:", user.permissions);
    //    return res.status(403).json("Insufficient permission");
    //   }
    // }
    // Role Check
    if (requiredRolesOrPermissions.length > 0){
    if (requiredRolesOrPermissions.includes(user.role)) {
      console.log(`User has the required role: ${user.role}`);
    } else if (
      // Permissions check if specific permissions are required
      requiredRolesOrPermissions.length > 0 &&
      !requiredRolesOrPermissions.every((perm) => user.permissions.includes(perm))
    ) {
      console.log("Insufficient permission:", requiredRolesOrPermissions, "User permissions:", user.permissions);
      return res.status(403).json({ error: "Insufficient permission" });
    }
  }
      req.user = user;
      req.token = token;
      console.log("User is authorized with token:", token);
      next();
    } catch (error) {
      console.log("please authenticate", error);
    }
  };
};

module.exports = authorize;
