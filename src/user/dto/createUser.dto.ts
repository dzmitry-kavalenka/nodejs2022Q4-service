import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'John' })
  readonly login: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'password123' })
  readonly password: string;
}
