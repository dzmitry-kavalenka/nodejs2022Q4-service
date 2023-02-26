import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as INFO from '../constants';
import { ArtistEntity } from './artist.entity';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAll(): Promise<ArtistEntity[]> {
    return this.artistRepository.find();
  }

  async getById(id: string): Promise<ArtistEntity> {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    return artist;
  }

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist = new ArtistEntity();

    Object.assign(newArtist, createArtistDto);
    return this.artistRepository.save(newArtist);
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await this.getById(id);

    Object.assign(artist, updateArtistDto);
    return this.artistRepository.save(artist);
  }

  async delete(id: string) {
    const artist = await this.getById(id);

    await this.artistRepository.delete(artist.id);
  }
}
