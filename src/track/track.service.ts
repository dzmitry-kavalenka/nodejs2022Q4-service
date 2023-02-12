import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as INFO from '../constants';
// import { FavoritesEntity } from '../favorites/favorites.entity';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { TrackEntity } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>, // private readonly favoritesRepository: FavoritesRepository,
  ) {}

  async getAll(): Promise<TrackEntity[]> {
    return this.trackRepository.find();
  }

  async getById(id: string): Promise<TrackEntity> {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    return track;
  }

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const newTrack = new TrackEntity();
    Object.assign(newTrack, createTrackDto);

    return this.trackRepository.save(newTrack);
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track = await this.getById(id);

    Object.assign(track, updateTrackDto);
    return this.trackRepository.save(track);
  }

  async delete(id: string) {
    const track = await this.getById(id);

    this.trackRepository.delete(track.id);

    // const [favorites] = await this.favoritesRepository.find();

    // if (favorites.tracks.includes(id)) {
    //   this.favoritesRepository.save({
    //     ...favorites,
    //     tracks: favorites.tracks.filter((trackId) => trackId !== id),
    //   });
    // }
  }
}
