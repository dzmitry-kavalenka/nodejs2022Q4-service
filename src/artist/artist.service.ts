import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumEntity } from 'src/album/album.entity';
import { TrackEntity } from 'src/track/track.entity';
import { v4 as uuidV4 } from 'uuid';
import * as INFO from '../constants';
import { ArtistEntity } from './artist.entity';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: InMemoryDBService<ArtistEntity>,
    private readonly albumRepository: InMemoryDBService<AlbumEntity>,
    private readonly trackRepository: InMemoryDBService<TrackEntity>,
  ) {}

  async getAll(): Promise<ArtistEntity[]> {
    return this.artistRepository.getAll();
  }

  async getById(id: string): Promise<ArtistEntity> {
    const artist = this.artistRepository.get(id);

    if (!artist) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    return artist;
  }

  async create(body: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist = new ArtistEntity({
      id: uuidV4(),
      ...body,
    });

    return this.artistRepository.create(newArtist);
  }

  async update(id: string, body: UpdateArtistDto): Promise<ArtistEntity> {
    const artist = this.artistRepository.get(id);

    if (!artist) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    const updatedArtist = new ArtistEntity({ id: artist.id, ...body });

    this.artistRepository.update(updatedArtist);
    return updatedArtist;
  }

  async delete(id: string) {
    const artist = this.artistRepository.get(id);

    if (!artist) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    this.artistRepository.delete(id);

    this.albumRepository
      .query(({ artistId }) => artistId === id)
      .forEach((album) =>
        this.albumRepository.update({ ...album, artistId: null }),
      );

    this.trackRepository
      .query(({ artistId }) => artistId === id)
      .forEach((track) =>
        this.trackRepository.update({ ...track, artistId: null }),
      );
  }
}
