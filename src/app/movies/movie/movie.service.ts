import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MovieDetail } from '../movie-detail/movie-detail';

const API = "http://www.omdbapi.com/"
// const API = "http://localhost:3000/movies"

@Injectable({ providedIn:'root' })

export class MovieService {

  constructor(private http: HttpClient) {}

  getMoviesFromAPI(querySearch: string) {
    const params = new HttpParams()
    .append('apikey', 'ee7969ed')
    .append('s', querySearch)

    return this.http
      .get<any>(API, { params })
  }

  getMovieFromAPI(id: string) {
    const params = new HttpParams()
    .append('apikey', 'ee7969ed')
    .append('i', id)

    return this.http
      .get<MovieDetail>(API, { params })
  }

  // getMoviesFromAPIMock(querySearch: string) {
  //   console.log(querySearch)

  //   return this.http
  //     .get<Movie[]>(API)
  // }
}
