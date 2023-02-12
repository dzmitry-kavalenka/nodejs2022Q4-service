import { ApiProperty } from '@nestjs/swagger';

export class TrackResponse {
  @ApiProperty({
    example: '2981b70c-d670-4f9c-adaa-236dbf0edbe6',
    type: 'uuid',
    description: 'uuid v4',
  })
  id: string;

  @ApiProperty({ example: 'Because' })
  name: string;

  @ApiProperty({ example: '2981b70c-d670-4f9c-adaa-236dbf0edbe6' })
  artistId: string;

  @ApiProperty({ example: '2981b70c-d670-4f9c-adaa-236dbf0edbe6' })
  albumId: string;

  @ApiProperty({ example: 165 })
  duration: number;
}
