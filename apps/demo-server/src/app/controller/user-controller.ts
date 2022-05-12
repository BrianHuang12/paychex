import { NextFunction, Request, Response } from 'express';
import * as md5 from 'md5';
import { User } from '@paychex/data';


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({ email: req.body.email}).exec().catch(err => console.log(err)).then(user => {
    if (user && user.password === req.body.password) {
      res.status(200).json({
        userId: user._id
      })
    } else {
      res.status(401).json({
        err: 'Your username or password was incorrect please try again.'
      })
    }
    next();
  })
}
