import winston from "winston";
import passport from "passport";

export default (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      winston.info("Passport authentication result:", { error, user, info });
      
      if (error) {
        return next(error);
      }

      if (!user) {
        return res.status(info.statusCode || 401).json({
          message: info.message || info.toString()
        });
      }

      req.user = user;
      return next();
    })(req, res, next);
  };
};
