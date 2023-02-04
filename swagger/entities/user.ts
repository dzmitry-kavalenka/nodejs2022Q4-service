import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  login: string;
  @ApiProperty()
  version: number;
  @ApiProperty()
  createdAt: number;
  @ApiProperty()
  updatedAt: number;
}
