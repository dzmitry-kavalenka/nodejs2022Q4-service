import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Controller } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: InMemoryDBService<UserEntity>) {}
}
