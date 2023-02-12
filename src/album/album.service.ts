import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as INFO from '../constants';
// import { FavoritesEntity } from '../favorites/favorites.entity';
// import { TrackEntity } from '../track/track.entity';
import { AlbumEntity } from './album.entity';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>, // @InjectRepository(TrackEntity) // private readonly trackRepository: Repository<TrackEntity>, // @InjectRepository(FavoritesEntity) // private readonly favoritesRepository: Repository<FavoritesEntity>,
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

    // const albumTracks = await this.trackRepository.findBy({
    //   albumId: album.id,
    // });

    // await Promise.all(
    //   albumTracks.map((track) =>
    //     this.trackRepository.save({ ...track, albumId: null }),
    //   ),
    // );

    // const [favorites] = await this.favoritesRepository.find();

    // if (favorites?.albums.includes(id)) {
    //   this.favoritesRepository.save({
    //     ...favorites,
    //     albums: favorites.albums.filter((albumId) => albumId !== id),
    //   });
    // }
  }
}
