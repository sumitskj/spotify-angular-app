import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { Artist } from '../artist';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SpotifyService]
})
export class SearchComponent implements OnInit {
  searchStr: string;
  searchRes: Artist[];
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  searchMusic() {
    this.spotifyService.getToken()
      .subscribe(res => {
          this.spotifyService.searchMusic(this.searchStr , 'artist' , res.access_token)
            .subscribe(res => {
              this.searchRes = res.artists.items;
         });
      });
 }
}
