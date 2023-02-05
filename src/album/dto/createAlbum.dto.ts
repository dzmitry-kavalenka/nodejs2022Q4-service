import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Abbey Road' })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1969 })
  readonly year: number;

  @IsNotEmpty()
  @ApiProperty({ example: null })
  artistId: string | null;
}
