import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'John Lennon' })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ example: true })
  readonly grammy: boolean;
}
