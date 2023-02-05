import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'password123' })
  readonly oldPassword: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'password1234' })
  readonly newPassword: string;
}
