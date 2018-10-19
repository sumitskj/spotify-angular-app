import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist';
import { Album } from '../album';
import { SpotifyService } from '../spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  id: string;
  artist: Artist[];
  albums: Album[];

  constructor(private spotifyService: SpotifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.spotifyService.getToken()
          .subscribe(data => {
            this.spotifyService.getArtist(id, data.access_token)
              .subscribe(artist => {
                this.artist = artist;
              });

            this.spotifyService.getAlbums(id, data.access_token)
              .subscribe(albums => {
                this.albums = albums.items;
              });
          });
      });
  }
}
