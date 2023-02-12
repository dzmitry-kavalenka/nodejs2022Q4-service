import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John' })
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password123' })
  readonly password: string;
}
