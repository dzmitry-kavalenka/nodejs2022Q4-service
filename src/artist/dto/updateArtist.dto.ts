import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Lennon' })
  readonly name: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: false })
  readonly grammy: boolean;
}
