import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';

@Entity('favorites')
export class FavoritesEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, { onDelete: 'CASCADE' })
  @Column('char', { array: true, default: [] })
  artists: string[];

  @ManyToOne(() => AlbumEntity, (album) => album.id, { onDelete: 'CASCADE' })
  @Column('char', { array: true, default: [] })
  albums: string[];

  @ManyToOne(() => TrackEntity, (track) => track.id, { onDelete: 'CASCADE' })
  @Column('char', { array: true, default: [] })
  tracks: string[];
}
