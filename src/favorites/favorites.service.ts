import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesResponse } from '../../swagger/entities/favorites';
import { AlbumRepository } from '../album/album.repository';
import { TrackRepository } from '../track/track.repository';
import { ArtistRepository } from '../artist/artist.repository';
import * as INFO from '../constants';
import { initialFavorites, UNPROCESSABLE_ERROR } from './constants';
import { FavoritesEntity } from './favorites.entity';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly trackRepository: TrackRepository,
  ) {}

  async getAll(): Promise<FavoritesResponse> {
    const [favorites] = this.favoritesRepository.getAll();

    if (!favorites) {
      return initialFavorites;
    }

    const artists = favorites.artists.map((artistId) =>
      this.artistRepository.get(artistId),
    );
    const albums = favorites.albums.map((albumId) =>
      this.albumRepository.get(albumId),
    );
    const tracks = favorites.tracks.map((trackId) =>
      this.trackRepository.get(trackId),
    );

    return { artists, albums, tracks };
  }

  async addToFavorites(id: string, type: 'track' | 'album' | 'artist') {
    const record = this[`${type}Repository`].get(id);

    if (!record) {
      throw new UnprocessableEntityException(UNPROCESSABLE_ERROR);
    }

    const [favorites] = this.favoritesRepository.getAll();
    const favsToUpdate = (favorites || initialFavorites) as FavoritesEntity;

    this.favoritesRepository.update({
      ...favsToUpdate,
      [`${type}s`]: [...new Set([...favsToUpdate[`${type}s`], id])],
    });
  }

  async deleteFromFavorites(id: string, type: 'track' | 'album' | 'artist') {
    const [favorites] = this.favoritesRepository.getAll();
    const favsToUpdate = (favorites || initialFavorites) as FavoritesEntity;

    if (!favsToUpdate[`${type}s`].includes(id)) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    this.favoritesRepository.update({
      ...favsToUpdate,
      [`${type}s`]: favsToUpdate[`${type}s`].filter((favId) => favId !== id),
    });
  }
}
