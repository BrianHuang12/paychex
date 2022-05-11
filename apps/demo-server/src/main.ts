/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { connectToDb } from './app/db/database';
import { authenticate } from './app/controller/user-controller';
import { Break, TimeCharge, User } from '@paychex/data';
import * as cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to demo-server!' });
});

app.post('/api/users/login', authenticate);

app.get('/api/users', (req, res, next) => {
  User.find({}, { password: 0, timeCharge: 0 })
    .limit(50)
    .exec()
    .catch((err) => {
      console.log(err);
    })
    .then((users) => {
      if (users) {
        users.map((user) => console.log(user));
      }
    });
});

app.get('/api/users/:id', (req, res, next) => {
  const params = req.params.id;
  User.findById(params, {password: 0}).exec().catch(err => {
    res.status(500).json({
      err: err
    })
  }).then(user => {
    if (user) {
      res.status(200).json(user)
    } else {
      res.sendStatus(404);
    }
  })
});

app.post('/api/users/:id/break', (req, res, next) => {
  User.findById(req.params.id)
    .exec()
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
    .then((user) => {
      if (user) {
        console.log(user.timeCharge[0].breaks)
        // find the open timecharging session
        const openTimecharging = user.timeCharge.filter((time) => {
          if (!time.closedDate) {
            return true;
          }
          return false;
        });
        if (openTimecharging.length === 0) {
          res.status(403).json({
            err: 'You cannot start a break if you do not have an active shift.'
          })
        } else {
          if (openTimecharging[0].breaks && openTimecharging[0].breaks.length > 0) {
            const hasNoOpenBreaks = openTimecharging[0].breaks.every(b => {
              if (!b.endDate) {
                res.status(403).json({
                  err: 'You already have a break open.'
                });
                return false;
              }

              return true;
            });

            if (hasNoOpenBreaks) {
              const test = openTimecharging[0] as any;
              const idx = user.timeCharge.findIndex((time: any) => time._id === test._id)
              if (idx > -1) {
                user.timeCharge[idx].breaks.push(new Break());
                user.save().catch(err => console.log(err)).then(user => {
                  res.sendStatus(200);

                })
              }
            }
          } else {
              const test = openTimecharging[0] as any;
              const idx = user.timeCharge.findIndex((time: any) => time._id === test._id)
              if (idx > -1) {
                user.timeCharge[idx].breaks.push(new Break());
                user.save().catch(err => console.log(err)).then(user => {
                  res.sendStatus(200);
                })
              }

          }
        }
      }
    });
});

app.patch('/api/users/:id/break', (req, res, next) => {
  User.findById(req.params.id)
    .exec()
    .catch((err) => {
      res.sendStatus(500);
    })
    .then((user) => {
      if (user) {
        // find the open timecharging session
        const openTimecharging = user.timeCharge.filter((time) => {
          if (!time.closedDate) {
            return true;
          }
          return false;
        });
        if (openTimecharging.length === 0) {
          res.status(403).json({
            err: 'You cannot end a break if you do not have an active shift.'
          })
        } else {
          if (openTimecharging[0].breaks && openTimecharging[0].breaks.length > 0) {
            const hasOpenBreak = openTimecharging[0].breaks.findIndex(b => !b.endDate);

            if (hasOpenBreak > -1) {
              const test = openTimecharging[0] as any;
              const idx = user.timeCharge.findIndex((time: any) => time._id === test._id)

              if (idx > -1 && hasOpenBreak > -1) {
                user.timeCharge[idx].breaks[hasOpenBreak].endDate = new Date(Date.now());
                user.save().catch(err => console.log(err)).then(user => {
                  res.sendStatus(200);
                  return;
                })
              } else {
                res.status(500).json({err: 'Something went wrong trying to close your break.'});

              }
            }
          } else {
            res.sendStatus(404);
          }
        }
      }
    });
});

app.patch('/api/users/:id/timecharge', (req, res, next) => {
  User.findById(req.params.id)
    .exec()
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
    .then((user) => {
      if (user) {
        // find the open timecharging session
        const openTimecharging = user.timeCharge.findIndex(time => !time.closedDate);
        if (openTimecharging > -1) {
          user.timeCharge[openTimecharging].closedDate = new Date(Date.now());
          user
            .save()
            .catch((err) => console.log(err))
            .then(() => {
              res.status(200).json({
                message: 'Successfuly closed your timecharging session',
              });
            });
        } else {
          res.status(404).json({
            err: 'You do not have a timecharging session open',
          });
        }
      }
    });
});

// used for creating a new timecharging
app.post('/api/users/:id/timecharge', (req, res, next) => {
  User.findById(req.params.id)
    .exec()
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
    .then((user) => {
      if (user) {
        // find the open timecharging session
        const openTimecharging = user.timeCharge.filter((time) => {
          if (!time.closedDate) {
            return true;
          }
          return false;
        });
        if (openTimecharging.length === 0) {
          user.timeCharge.push(new TimeCharge());
          user
            .save()
            .catch((err) => console.log(err))
            .then(() => {
              res.status(200).json({
                message: 'Timecharging session createdj',
              });
            });
        } else {
          res.status(403).json({
            err: 'You cannot open more than one timecharging session at a time.',
          });
        }
      }
    });
});

const port = process.env.port || 3334;
const server = app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}/api`);
  await connectToDb();
});
server.on('error', console.error);
process.on('SIGTERM', () => {
  server.close();
});
