import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';

import { Movie } from '../movies-list/movie';
import { MoviesListService } from '../movies-list/movies-list.service';
import { ActivatedRoute } from '@angular/router';

export enum KEY_CODE {
  ENTER = 13,
  LEFT_ARROW = 37,
  RIGHT_ARROW = 39
}

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  currentButton:string = "back";
  movie:Movie

  constructor(
    private location: Location,
    private activatedRoute:ActivatedRoute,
    private moviesListService:MoviesListService
  ) { }

  ngOnInit() {
      this.movie = this.activatedRoute.snapshot.data.movie;
  }

  @HostListener('window:keydown', ['$event'])

  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.currentButton = 'back'
    } else
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.currentButton = 'newSearch'
    }
    if (event.keyCode === KEY_CODE.ENTER) {
      if(this.currentButton === 'back') {
        this.goBack()
      } else
      if(this.currentButton === 'newSearch') {
        this.goNewSearch()
      }
    }
  }

    goBack():void {
        this.currentButton = 'back'
        this.location.back();
    }

    goNewSearch():void {
      this.currentButton = 'newSearch'
      this.moviesListService.changeMovie(0);
      this.moviesListService.changeMovies([]);
      this.moviesListService.changeQuerySearch("");
      this.moviesListService.changeHasMovie(undefined);
      this.location.back();
    }
}
