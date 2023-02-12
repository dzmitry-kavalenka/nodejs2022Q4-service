import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Abbey Road' })
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1969 })
  readonly year: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: null })
  readonly artistId: string | null;
}
