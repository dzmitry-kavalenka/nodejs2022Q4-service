import { ApiProperty } from '@nestjs/swagger';

export class ArtistResponse {
  @ApiProperty({
    example: '2981b70c-d670-4f9c-adaa-236dbf0edbe6',
    type: 'uuid',
    description: 'uuid v4',
  })
  id: string;

  @ApiProperty({ example: 'John Lennon' })
  name: string;

  @ApiProperty({ example: true })
  grammy: boolean;
}
