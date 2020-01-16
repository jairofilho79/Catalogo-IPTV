import { Component, HostListener, OnInit, Renderer2  } from '@angular/core';
import { Router } from '@angular/router';


import { Movie } from './movie';
import { MovieService } from '../movie/movie.service';
import { MoviesListService } from './movies-list.service';

export enum KEY_CODE {
  ENTER = 13,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  RIGHT_ARROW = 39,
  DOWN_ARROW = 40
}

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  ngOnInit(): void {
    this.moviesListService.currentMovieIndex.subscribe(movie => this.activeIndex = movie)
    this.moviesListService.currentMovies.subscribe(movies => this.movies = movies)
    this.moviesListService.currentQuerySearch.subscribe(query => this.querySearch = query)
    this.moviesListService.currentQueryTitle.subscribe(title => this.queryTitle = title)
    this.moviesListService.currentHasMovie.subscribe(hasMovie => this.hasMovies = hasMovie)
  }

  querySearch:string = "";
  queryTitle:string = "";
  movies: Movie[] = [];
  hasMovies: boolean = undefined
  activeIndex: number = 0;
  isInputFocus:boolean = false

  constructor(
    private movieService: MovieService,
    private router:Router,
    private moviesListService:MoviesListService,
    private renderer:Renderer2
    ) {}


  @HostListener('window:keydown', ['$event'])

  keyEvent(event: KeyboardEvent) {


    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      if(this.isInputFocus) return;
      this.goLeft();
    } else

    if (event.keyCode === KEY_CODE.UP_ARROW) {
      if(this.goUp()) return
      if(!this.isInputFocus) this.setInputFocus();

    } else

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      if(this.isInputFocus) return;
      this.goRight();
    } else

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      if(this.isInputFocus) {
        this.setInputBlur();
        return;
      }
      this.goDown()
    } else

    if (event.keyCode === KEY_CODE.ENTER) {
      if(this.isInputFocus) return;
      this.goToMovie();
    }
  }

  goLeft():Boolean    {
    const isPossible = this.activeIndex - 1 < 0
    this.activeIndex =  isPossible ? 0 : this.activeIndex - 1
    return !isPossible;
  }
  goUp():Boolean      {
    const isPossible = this.activeIndex - 3 < 0
    this.activeIndex =  isPossible ? this.activeIndex : this.activeIndex - 3
    return !isPossible;
  }
  goRight():Boolean   {
    const isPossible = this.activeIndex + 1 >= this.movies.length
    this.activeIndex =  isPossible ? this.activeIndex : this.activeIndex + 1
    return !isPossible;
  }
  goDown():Boolean    {
    const isPossible = this.activeIndex + 3 >= this.movies.length
    this.activeIndex =  isPossible ? this.activeIndex : this.activeIndex + 3
    return !isPossible;
  }
  goToMovie(i:number=this.activeIndex):void {
    this.activeIndex = i
    this.setHasMovie();
    this.setNewQuerySearch();
    this.setNewMovie();
    this.router.navigate( ['movie/'+this.movies[i].imdbID], )
  }

  inputFocus() {this.isInputFocus = true}
  inputBlur() {this.isInputFocus = false}

  setInputFocus() {
    this.renderer.selectRootElement('#searchInput').focus();
    this.inputFocus()
  }

  setInputBlur() {
    this.renderer.selectRootElement('#searchInput').blur();
    this.inputBlur()
  }

  setNewMovie() {
    this.moviesListService.changeMovie(this.activeIndex)
  }

  setNewMovies() {
    this.moviesListService.changeMovies(this.movies)
  }

  setNewQuerySearch() {
    this.moviesListService.changeQuerySearch(this.querySearch)
  }

  setNewQueryTitle() {
    this.moviesListService.changeQueryTitle(this.queryTitle)
  }

  setHasMovie() {
    this.moviesListService.changeHasMovie(this.hasMovies)
  }

  async getMovies(event) {
    event.preventDefault()
    this.queryTitle = this.querySearch;
    this.setNewQueryTitle()

    this.movieService
      .getMoviesFromAPI(this.queryTitle)
      .subscribe(movies => {
        this.movies = movies.Search;
        this.hasMovies = movies.Response === 'True' ? true : false
        this.setNewMovies()
      })


  }

}
