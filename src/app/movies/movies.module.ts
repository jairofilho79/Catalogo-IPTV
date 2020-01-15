import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { MovieComponent } from './movie/movie.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule],
  declarations: [MovieComponent, MoviesListComponent, MovieDetailComponent],
  exports: [MovieComponent, MoviesListComponent]
})
export class MoviesModule { }
