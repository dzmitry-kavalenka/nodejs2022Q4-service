import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Lennon' })
  readonly name: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true })
  readonly grammy: boolean;
}
