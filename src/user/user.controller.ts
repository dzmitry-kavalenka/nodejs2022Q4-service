import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UserResponse } from '../../swagger/entities/user';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, type: [UserResponse] })
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: UserResponse })
  @ApiBadRequestResponse({ description: 'id must be valid uuid' })
  @ApiNotFoundResponse({ description: 'user not found' })
  @UseInterceptors(ClassSerializerInterceptor)
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
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: UserResponse })
  @ApiBadRequestResponse({
    description:
      'id must be valid uuid or body does not contain required fields',
  })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiForbiddenResponse({ status: 403, description: 'oldPassword is wrong' })
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordrDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return this.userService.updatePassword(id, updatePasswordrDto);
  }
}
