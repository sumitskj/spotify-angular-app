import { Injectable } from '@angular/core';
import { Http , Headers , Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private searchUrl: string;
  private redirect_uri: string;
  private client_id = '996080937ebb4594a0979146c9c0c121';
  private client_secret = '0bda3cfd213c4622bc6c562586568ec8';
  private access_token: string;
  private artistUrl: string;
  private albumsUrl: string;
  private albumUrl: string;
  private encoded = btoa(this.client_id + ':' + this.client_secret);
  private base64 = 'OTk2MDgwOTM3ZWJiNDU5NGEwOTc5MTQ2YzljMGMxMjE6MGJkYTNjZmQyMTNjNDYyMmJjNmM1NjI1ODY1NjhlYzg=';


  constructor(private http: Http) { }

  getToken() {
    // let params : URLSearchParams = new URLSearchParams();
    // params.set('grant_type' , 'client_credentials');
    // let body = params.toString();
     const params = ('grant_type=client_credentials');

     const headers = new Headers();
     headers.append( 'Authorization', 'Basic ' + this.encoded);
     
     headers.append('Content-Type' , 'application/x-www-form-urlencoded');

     return this.http.post('/token', params , {headers : headers} )
     .map(res => res.json());
  }



  searchMusic(str: string, type= 'artist' , token: string) {
    console.log(this.encoded);
    this.searchUrl = '/v1/search?query='+str+'&offset=0&limit=20&type='+type;
    const headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);

    return this.http.get(this.searchUrl , {headers : headers})
    .map((res: Response) => res.json());
}

getArtist(id: string, token: string) {
  console.log(this.encoded);
  this.artistUrl = '/v1/artists/'+id;
  const headers = new Headers();
  headers.append('Authorization' , 'Bearer ' + token);

  return this.http.get(this.artistUrl , {headers : headers})
  .map((res: Response) => res.json());
}

getAlbums(artistid: string, token: string) {
  console.log(this.encoded);
  this.albumsUrl = '/v1/artists/'+artistid+'/albums';
  const headers = new Headers();
  headers.append('Authorization' , 'Bearer ' + token);

  return this.http.get(this.albumsUrl , {headers : headers})
  .map((res: Response) => res.json());
}

getAlbum(id: string, token: string) {
  console.log(this.encoded);
  this.albumUrl = '/v1/albums/'+id;
  const headers = new Headers();
  headers.append('Authorization' , 'Bearer ' + token);

  return this.http.get(this.albumUrl , {headers : headers})
  .map((res: Response) => res.json());
}

}
