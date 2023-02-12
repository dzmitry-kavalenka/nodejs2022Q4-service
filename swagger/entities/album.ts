import { ApiProperty } from '@nestjs/swagger';

export class AlbumResponse {
  @ApiProperty({
    example: '2981b70c-d670-4f9c-adaa-236dbf0edbe6',
    type: 'uuid',
    description: 'uuid v4',
  })
  id: string;

  @ApiProperty({ example: 'Abbey Road' })
  name: string;

  @ApiProperty({ example: 1969 })
  year: number;

  @ApiProperty({ example: '2981b70c-d670-4f9c-adaa-236dbf0edbe6' })
  artistId: string | null;
}
