import { ApiProperty } from '@nestjs/swagger';

export class TokensResponse {
  @ApiProperty({ example: 'string' })
  accessToken: string;
  @ApiProperty({ example: 'string' })
  refreshToken: string;
}
