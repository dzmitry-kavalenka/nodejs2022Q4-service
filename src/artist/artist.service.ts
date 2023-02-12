import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as INFO from '../constants';
// import { TrackEntity } from '../track/track.entity';
// import { AlbumEntity } from '../album/album.entity';
import { ArtistEntity } from './artist.entity';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
// import { FavoritesEntity } from '../favorites/favorites.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>, // @InjectRepository(AlbumEntity) // private readonly albumRepository: Repository<AlbumEntity>, // @InjectRepository(TrackEntity) // private readonly trackRepository: Repository<TrackEntity>, // @InjectRepository(FavoritesEntity) // private readonly favoritesRepository: Repository<FavoritesEntity>,
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

    // const artistAlbums = await this.albumRepository.findBy({
    //   artistId: artist.id,
    // });

    // const artistTracks = await this.trackRepository.findBy({
    //   artistId: artist.id,
    // });

    // await Promise.all([
    //   ...artistAlbums.map((album) =>
    //     this.albumRepository.save({ ...album, artistId: null }),
    //   ),
    //   ...artistTracks.map((track) =>
    //     this.trackRepository.save({ ...track, artistId: null }),
    //   ),
    // ]);

    // const [favorites] = await this.favoritesRepository.find();

    // if (favorites?.artists.includes(id)) {
    //   this.favoritesRepository.save({
    //     ...favorites,
    //     artists: favorites.artists.filter((artistId) => artistId !== id),
    //   });
    // }
  }
}
