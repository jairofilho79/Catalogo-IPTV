import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { NotFoundComponent } from './errors/not-found/not-found.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MovieDetailResolver } from './movies/movie-detail/movie-detail.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: MoviesListComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent,
    resolve: {
      movie: MovieDetailResolver
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
