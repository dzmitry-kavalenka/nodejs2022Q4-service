import { ApiProperty } from '@nestjs/swagger';

export class TokensResponse {
  @ApiProperty({ example: 'string' })
  access_token: string;
}
