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
import { TrackResponse } from 'swagger/entities/track';
import * as INFO from '../constants';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';

@Controller('track')
@ApiTags('Track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [TrackResponse] })
  async getAllTracks(): Promise<TrackEntity[]> {
    return this.trackService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: TrackResponse })
  @ApiBadRequestResponse({ description: INFO.UUID_ERROR })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  async getTrackById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<TrackEntity> {
    return this.trackService.getById(id);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: TrackResponse })
  @ApiBadRequestResponse({ description: INFO.REQUIRED_FIELDS_ERROR })
  async createTrack(
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<TrackEntity> {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, type: TrackResponse })
  @ApiBadRequestResponse({
    description: `${INFO.UUID_ERROR} or ${INFO.REQUIRED_FIELDS_ERROR}`,
  })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'track is found and deleted',
  })
  @ApiBadRequestResponse({ description: INFO.UUID_ERROR })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.delete(id);
  }
}
