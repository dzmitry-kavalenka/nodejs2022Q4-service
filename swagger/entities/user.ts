import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    example: 'f010ddf0-1ada-4283-aa15-3baf461e2045',
    type: 'uuid',
    description: 'uuid v4',
  })
  id: string;
  @ApiProperty({ example: 'John' })
  login: string;
  @ApiProperty({
    example: 1,
    description: 'integer number, increments on update',
  })
  version: number;
  @ApiProperty({ example: 1675515543, description: 'timestamp of creation' })
  createdAt: number;
  @ApiProperty({ example: 1675519143, description: 'timestamp of last update' })
  updatedAt: number;
}
