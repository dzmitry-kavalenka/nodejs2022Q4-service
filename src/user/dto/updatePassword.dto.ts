import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password123' })
  readonly oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password1234' })
  readonly newPassword: string;
}
