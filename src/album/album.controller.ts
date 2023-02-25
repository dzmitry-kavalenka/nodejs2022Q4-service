import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AlbumResponse } from 'swagger/entities/album';
import * as INFO from '../constants';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Controller('album')
@ApiTags('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [AlbumResponse] })
  async getAllAlbums(): Promise<AlbumEntity[]> {
    return this.albumService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: AlbumResponse })
  @ApiBadRequestResponse({ description: INFO.UUID_ERROR })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  async getAlbumById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<AlbumEntity> {
    return this.albumService.getById(id);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: AlbumResponse })
  @ApiBadRequestResponse({ description: INFO.REQUIRED_FIELDS_ERROR })
  async createAlbum(
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<AlbumEntity> {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, type: AlbumResponse })
  @ApiBadRequestResponse({
    description: `${INFO.UUID_ERROR} or ${INFO.REQUIRED_FIELDS_ERROR}`,
  })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  async updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'album is found and deleted',
  })
  @ApiBadRequestResponse({ description: INFO.UUID_ERROR })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.delete(id);
  }
}
