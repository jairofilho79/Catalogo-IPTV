import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { MovieDetail } from './movie-detail';
import { Injectable } from '@angular/core';
import { MovieService } from '../movie/movie.service';

@Injectable({providedIn:'root'})
export class MovieDetailResolver implements Resolve<Observable<MovieDetail>> {

  constructor(private movieService:MovieService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieDetail> | Observable<Observable<MovieDetail>> | Promise<Observable<MovieDetail>> {
    return this.movieService.getMovieFromAPI(route.params.id)
  }

}
