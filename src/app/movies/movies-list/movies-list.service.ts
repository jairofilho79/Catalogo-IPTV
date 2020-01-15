import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from './movie';

@Injectable({providedIn: 'root'})
export class MoviesListService {
  private activeIndexSource = new BehaviorSubject<number>(0)
  private moviesSource = new BehaviorSubject<Movie[]>([])
  private hasMovieSource = new BehaviorSubject<boolean>(undefined)
  private querySearchSource = new BehaviorSubject<string>("")
  private queryTitleSource = new BehaviorSubject<string>("")
  currentMovieIndex = this.activeIndexSource.asObservable();
  currentMovies = this.moviesSource.asObservable();
  currentHasMovie = this.hasMovieSource.asObservable();
  currentQuerySearch = this.querySearchSource.asObservable();
  currentQueryTitle = this.queryTitleSource.asObservable();

  changeMovie(activeIndex: number) {
    this.activeIndexSource.next(activeIndex)
  }

  changeMovies(movies: Movie[]) {
    this.moviesSource.next(movies)
  }

  changeQuerySearch(querySearch: string) {
    this.querySearchSource.next(querySearch)
  }

  changeQueryTitle(queryTitle: string) {
    this.queryTitleSource.next(queryTitle)
  }

  changeHasMovie(hasMovie: boolean) {
    this.hasMovieSource.next(hasMovie);
  }
}
