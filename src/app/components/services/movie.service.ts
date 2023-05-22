import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../interfaces/apiResponse';
import { Movie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  //key b0d2fc5
  private API_URL: string='https://www.omdbapi.com/?i=tt3896198&apikey=b0d2fc5';

  constructor(private http: HttpClient) {}

  getMovies(searchTerm: string): Observable<Movie[]>{
    return this.http.get<ApiResponse>(this.API_URL + '&s=' + searchTerm).pipe(
      map(Response => {
        return Response.Search;
      })
    )
  }
}
