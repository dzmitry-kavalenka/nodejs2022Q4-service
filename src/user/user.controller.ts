import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UserResponse } from '../../swagger/entities/user';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, type: [UserResponse] })
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: UserResponse })
  @ApiBadRequestResponse({ description: 'id must be valid uuid' })
  @ApiNotFoundResponse({ description: 'user not found' })
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserEntity> {
    return this.userService.getById(id);
  }

  @Post()
  @ApiResponse({ status: 201, type: UserResponse })
  @ApiBadRequestResponse({
    description: 'body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }
}
