import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserResponse } from 'swagger/entities/user';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import * as INFO from '../constants';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { INCORRECT_PASSWORD_ERROR } from './constants';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('user')
@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [UserResponse] })
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  @ApiBadRequestResponse({ description: INFO.UUID_ERROR })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  async getUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserEntity> {
    return this.userService.getById(id);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponse })
  @ApiBadRequestResponse({ description: INFO.REQUIRED_FIELDS_ERROR })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  @ApiBadRequestResponse({
    description: `${INFO.UUID_ERROR} or ${INFO.REQUIRED_FIELDS_ERROR}`,
  })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  @ApiForbiddenResponse({
    status: HttpStatus.FORBIDDEN,
    description: INCORRECT_PASSWORD_ERROR,
  })
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordrDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return this.userService.updatePassword(id, updatePasswordrDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'user is found and deleted',
  })
  @ApiBadRequestResponse({ description: INFO.UUID_ERROR })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.delete(id);
  }
}
