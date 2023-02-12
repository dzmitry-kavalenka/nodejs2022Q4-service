import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Because' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '2981b70c-d670-4f9c-adaa-236dbf0edbe6' })
  artistId: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '2981b70c-d670-4f9c-adaa-236dbf0edbe6' })
  albumId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 155 })
  duration: number;
}
