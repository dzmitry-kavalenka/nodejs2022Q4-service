import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateArtistDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'John Lennon' })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ example: false })
  readonly grammy: boolean;
}
