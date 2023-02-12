import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tracks')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true, default: null })
  artistId: string;

  @Column({ type: 'uuid', nullable: true, default: null })
  albumId: string;

  @Column()
  duration: number;
}
