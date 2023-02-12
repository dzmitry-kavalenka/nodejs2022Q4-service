import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesResponse } from '../../swagger/entities/favorites';
import * as INFO from '../constants';
import { TrackEntity } from '../track/track.entity';
import { AlbumEntity } from '../album/album.entity';
import { ArtistEntity } from '../artist/artist.entity';
import { FavoritesEntity } from './favorites.entity';
import { initialFavorites, UNPROCESSABLE_ERROR } from './constants';

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
    const [favorites] = await this.favoritesRepository.find();

    const [artists] = await Promise.all(
      favorites.artists.map((artistId) =>
        this.artistRepository.findBy({ id: artistId }),
      ),
    );
    const [albums] = await Promise.all(
      favorites.albums.map((albumId) =>
        this.albumRepository.findBy({ id: albumId }),
      ),
    );
    const [tracks] = await Promise.all(
      favorites.tracks.map((trackId) =>
        this.trackRepository.findBy({ id: trackId }),
      ),
    );

    return { artists, albums, tracks };
  }

  async addToFavorites(id: string, type: 'track' | 'album' | 'artist') {
    const record = this[`${type}Repository`].findOneBy({ id });

    if (!record) {
      throw new UnprocessableEntityException(UNPROCESSABLE_ERROR);
    }

    const [favorites] = await this.favoritesRepository.find();
    const favsToUpdate = (favorites || initialFavorites) as FavoritesEntity;

    this.favoritesRepository.save({
      ...favsToUpdate,
      [`${type}s`]: [...new Set([...favsToUpdate[`${type}s`], id])],
    });
  }

  async deleteFromFavorites(id: string, type: 'track' | 'album' | 'artist') {
    const [favorites] = await this.favoritesRepository.find();
    const favsToUpdate = (favorites || initialFavorites) as FavoritesEntity;

    if (!favsToUpdate[`${type}s`].includes(id)) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    this.favoritesRepository.save({
      ...favsToUpdate,
      [`${type}s`]: favsToUpdate[`${type}s`].filter((favId) => favId !== id),
    });
  }
}
