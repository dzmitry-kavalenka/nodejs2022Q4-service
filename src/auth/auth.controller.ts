import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokensResponse } from 'swagger/entities/auth';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserService } from '@app/user/user.service';
import * as INFO from '../constants';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiBadRequestResponse({ description: INFO.REQUIRED_FIELDS_ERROR })
  async signup(@Body() signupDto: CreateUserDto) {
    const user = this.userService.create(signupDto);

    if (user) return 'Created';
  }

  @Post('/login')
  @ApiResponse({ status: HttpStatus.OK, type: TokensResponse })
  @ApiBadRequestResponse({ description: INFO.REQUIRED_FIELDS_ERROR })
  async login(@Body() loginUserDto: CreateUserDto): Promise<TokensResponse> {
    return this.authService.login(loginUserDto);
  }
}
