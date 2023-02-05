import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  HttpStatus,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ArtistResponse } from 'swagger/entities/artist';
import { UUID_ERROR, REQUIRED_FIELDS_ERROR } from '../constants';
import { ArtistEntity } from './artist.entity';
import { ArtistService } from './artist.service';
import * as INFO from './constants';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [ArtistResponse] })
  async getAllArtists(): Promise<ArtistEntity[]> {
    return this.artistService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: ArtistResponse })
  @ApiBadRequestResponse({ description: UUID_ERROR })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  async getArtistById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ArtistEntity> {
    return this.artistService.getById(id);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: ArtistResponse })
  @ApiBadRequestResponse({ description: REQUIRED_FIELDS_ERROR })
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, type: ArtistResponse })
  @ApiBadRequestResponse({
    description: `${UUID_ERROR} or ${REQUIRED_FIELDS_ERROR}`,
  })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  async updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'artist is found and deleted',
  })
  @ApiBadRequestResponse({ description: UUID_ERROR })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.delete(id);
  }
}
