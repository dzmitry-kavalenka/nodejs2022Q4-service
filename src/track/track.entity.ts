import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../album/album.entity';

@Entity('tracks')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'SET NULL',
  })
  @Column({ type: 'uuid', nullable: true, default: null })
  artistId: string;

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    onDelete: 'SET NULL',
  })
  @Column({ type: 'uuid', nullable: true, default: null })
  albumId: string;

  @Column()
  duration: number;
}
