import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavoritesResponse } from 'swagger/entities/favorites';
import { AuthGuard } from '@app/auth/guards/auth.guard';
import * as INFO from '../constants';
import { UNPROCESSABLE_ERROR } from './constants';
import { FavoritesService } from './favorites.service';

@ApiBearerAuth()
@Controller('favs')
@ApiTags('Favorites')
@UseGuards(AuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: FavoritesResponse })
  async getAllFavorites(): Promise<FavoritesResponse> {
    return this.favoritesService.getAll();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiBadRequestResponse({ description: INFO.UUID_ERROR })
  @ApiUnprocessableEntityResponse({ description: UNPROCESSABLE_ERROR })
  async addFavoriteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addToFavorites(id, 'track');
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBadRequestResponse({ description: INFO.UUID_ERROR })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  async deleteFavoriteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteFromFavorites(id, 'track');
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiBadRequestResponse({ description: INFO.UUID_ERROR })
  @ApiUnprocessableEntityResponse({ description: UNPROCESSABLE_ERROR })
  async addFavoriteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addToFavorites(id, 'album');
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBadRequestResponse({ description: INFO.UUID_ERROR })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  async deleteFavoriteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteFromFavorites(id, 'album');
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiBadRequestResponse({ description: INFO.UUID_ERROR })
  @ApiUnprocessableEntityResponse({ description: UNPROCESSABLE_ERROR })
  async addFavoriteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addToFavorites(id, 'artist');
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBadRequestResponse({ description: INFO.UUID_ERROR })
  @ApiNotFoundResponse({ description: INFO.NOT_FOUND_ERROR })
  async deleteFavoriteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteFromFavorites(id, 'artist');
  }
}
