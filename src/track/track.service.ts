import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import * as INFO from '../constants';
import { FavoritesRepository } from '../favorites/favorites.repository';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { TrackEntity } from './track.entity';
import { TrackRepository } from './track.repository';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  async getAll(): Promise<TrackEntity[]> {
    return this.trackRepository.getAll();
  }

  async getById(id: string): Promise<TrackEntity> {
    const track = this.trackRepository.get(id);

    if (!track) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    return track;
  }

  async create(body: CreateTrackDto): Promise<TrackEntity> {
    const newTrack = new TrackEntity({
      id: uuidV4(),
      artistId: body.artistId || null,
      albumId: body.albumId || null,
      ...body,
    });

    return this.trackRepository.create(newTrack);
  }

  async update(id: string, body: UpdateTrackDto): Promise<TrackEntity> {
    const track = this.trackRepository.get(id);

    if (!track) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    const updatedTrack = new TrackEntity({
      id: track.id,
      artistId: body.artistId || track.artistId,
      albumId: body.albumId || track.albumId,
      ...body,
    });

    this.trackRepository.update(updatedTrack);
    return updatedTrack;
  }

  async delete(id: string) {
    const track = this.trackRepository.get(id);

    if (!track) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    this.trackRepository.delete(id);

    const [favorites] = this.favoritesRepository.getAll();

    if (favorites.tracks.includes(id)) {
      this.favoritesRepository.update({
        ...favorites,
        tracks: favorites.tracks.filter((trackId) => trackId !== id),
      });
    }
  }
}
