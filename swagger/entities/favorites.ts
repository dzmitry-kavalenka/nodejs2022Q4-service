import { ApiProperty } from '@nestjs/swagger';
import { AlbumResponse } from './album';
import { ArtistResponse } from './artist';
import { TrackResponse } from './track';

export class FavoritesResponse {
  @ApiProperty({ type: [ArtistResponse] })
  artists: ArtistResponse[];

  @ApiProperty({ type: [AlbumResponse] })
  albums: AlbumResponse[];

  @ApiProperty({ type: [TrackResponse] })
  tracks: TrackResponse[];
}
