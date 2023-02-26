import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TokensResponse } from '../../swagger/entities/auth';
import { UserResponse } from '../../swagger/entities/user';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import * as INFO from '../constants';
import { AuthService } from './auth.service';
import { WROND_CREDENTIALS, WRONG_TOKEN } from './constants';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { AuthGuard } from './guards/auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponse })
  @ApiBadRequestResponse({ description: INFO.REQUIRED_FIELDS_ERROR })
  async signup(@Body() signupDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(signupDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: TokensResponse })
  @ApiBadRequestResponse({ description: INFO.REQUIRED_FIELDS_ERROR })
  @ApiForbiddenResponse({ description: WROND_CREDENTIALS })
  async login(@Body() loginUserDto: CreateUserDto): Promise<TokensResponse> {
    const { userId, ...tokens } = await this.authService.login(loginUserDto);

    await this.userService.setCurrentRefreshToken(tokens.refreshToken, userId);

    return tokens;
  }

  @Post('/refresh')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: INFO.REQUIRED_FIELDS_ERROR })
  @ApiForbiddenResponse({ description: WRONG_TOKEN })
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<TokensResponse> {
    return this.authService.refresh(refreshTokenDto);
  }
}
