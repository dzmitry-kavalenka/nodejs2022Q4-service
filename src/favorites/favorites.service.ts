import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesResponse } from 'swagger/entities/favorites';
import { TrackEntity } from '../track/track.entity';
import { AlbumEntity } from '../album/album.entity';
import { ArtistEntity } from '../artist/artist.entity';
import * as INFO from '../constants';
import { FavoritesEntity } from './favorites.entity';
import { UNPROCESSABLE_ERROR } from './constants';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private readonly favoritesRepository: Repository<FavoritesEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async getAll(): Promise<FavoritesResponse> {
    const favorites = await this.favoritesRepository.find({
      relations: {
        artist: true,
        album: true,
        track: true,
      },
    });

    return favorites.reduce(
      (acc, { artist, album, track }) => {
        if (artist) {
          acc.artists.push(artist);
        }
        if (album) {
          acc.albums.push(album);
        }
        if (track) {
          acc.tracks.push(track);
        }

        return acc;
      },
      {
        artists: [],
        albums: [],
        tracks: [],
      },
    );
  }

  async addToFavorites(id: string, type: 'track' | 'album' | 'artist') {
    const record = await this[`${type}Repository`].findOneBy({ id });

    if (!record) {
      throw new UnprocessableEntityException(UNPROCESSABLE_ERROR);
    }

    this.favoritesRepository.save({
      [`${type}Id`]: id,
    });
  }

  async deleteFromFavorites(id: string, type: 'track' | 'album' | 'artist') {
    const record = await this[`${type}Repository`].findOneBy({ id });

    if (!record) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    this.favoritesRepository.delete({ [`${type}Id`]: id });
  }
}
