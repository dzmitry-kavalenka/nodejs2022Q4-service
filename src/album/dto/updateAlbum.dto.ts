import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateAlbumDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Abbey Road' })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1969 })
  readonly year: number;

  @IsNotEmpty()
  @ApiProperty({ example: '2981b70c-d670-4f9c-adaa-236dbf0edbe6' })
  artistId: string | null;
}
