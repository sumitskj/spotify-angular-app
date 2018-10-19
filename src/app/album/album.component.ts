import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist';
import { Album } from '../album';
import { SpotifyService } from '../spotify.service';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  id: string;
  album: Album[];
  constructor(private spotifyService: SpotifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.spotifyService.getToken()
          .subscribe((data) => {
            this.spotifyService.getAlbum(id, data.access_token)
              .subscribe((album) => {
                this.album = album;
              });
          });
      });
  }

}
