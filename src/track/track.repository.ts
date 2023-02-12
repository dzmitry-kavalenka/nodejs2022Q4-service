import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { TrackEntity } from './track.entity';

@Injectable()
export class TrackRepository extends InMemoryDBService<TrackEntity> {}
