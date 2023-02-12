import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateAlbumDto {
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
  @ApiProperty({ example: '2981b70c-d670-4f9c-adaa-236dbf0edbe6' })
  readonly artistId: string | null;
}
