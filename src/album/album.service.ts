import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { AlbumEntity } from './album.entity';
import * as INFO from '../constants';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: InMemoryDBService<AlbumEntity>,
  ) {}

  async getAll(): Promise<AlbumEntity[]> {
    return this.albumRepository.getAll();
  }

  async getById(id: string): Promise<AlbumEntity> {
    const album = this.albumRepository.get(id);

    if (!album) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    return album;
  }

  async create(body: CreateAlbumDto): Promise<AlbumEntity> {
    const newAlbum = new AlbumEntity({
      id: uuidV4(),
      artistId: body.artistId || null,
      ...body,
    });

    return this.albumRepository.create(newAlbum);
  }

  async update(id: string, body: UpdateAlbumDto): Promise<AlbumEntity> {
    const album = this.albumRepository.get(id);

    if (!album) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    const updatedAlbum = new AlbumEntity({
      id: album.id,
      artistId: body.artistId || album.artistId,
      ...body,
    });

    this.albumRepository.update(updatedAlbum);
    return updatedAlbum;
  }

  async delete(id: string) {
    const album = this.albumRepository.get(id);

    if (!album) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    return this.albumRepository.delete(id);
  }
}
