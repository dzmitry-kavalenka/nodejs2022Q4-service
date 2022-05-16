import express, { Request, Response } from 'express';
import { UserDB } from './user.interface';
import User from './user.model';
import * as usersService from './user.service';

const userRouter = express.Router();

userRouter.get('/users', async (_req: Request, res: Response) => {
  const users: Array<UserDB> = usersService.getAll();
  // map user fields to exclude secret fields like "password"
  return res.json(users.map(User.toResponse));
});

export default userRouter;
