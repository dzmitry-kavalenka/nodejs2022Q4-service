import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as INFO from '../constants';
import { AlbumEntity } from './album.entity';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAll(): Promise<AlbumEntity[]> {
    return this.albumRepository.find();
  }

  async getById(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const newAlbum = new AlbumEntity();
    Object.assign(newAlbum, createAlbumDto);
    return this.albumRepository.save(newAlbum);
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album = await this.getById(id);

    Object.assign(album, updateAlbumDto);
    return this.albumRepository.save(album);
  }

  async delete(id: string) {
    const album = await this.getById(id);

    await this.albumRepository.delete(album.id);
  }
}
