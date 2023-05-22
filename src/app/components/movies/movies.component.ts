import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import { Observable } from 'rxjs';
import { MovieService } from 'src/app/components/services/movie.service';
import { Movie } from '../interfaces/movies';
import { debounceTime, distinct, filter, fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MovieComponent implements OnInit {
  movies:Movie[]=[];
  @ViewChild('movieSearchInput', {static: true}) movieSearchinput!: ElementRef

  constructor(private movieService: MovieService){}
  ngOnInit(): void {
    fromEvent<Event>(this.movieSearchinput.nativeElement, 'keyup').pipe(
      map((event:Event)=> {
        const searchTerm = (event.target as HTMLInputElement).value;
        return searchTerm
      }),
      filter((searchterm: string)=> searchterm.length > 3),
      debounceTime(500),
      distinct(),
      tap((searchTerm: string)=> console.log(searchTerm))
    ).subscribe((searchTerm: string)=> {
      this.getMovies(searchTerm)
    })
  }
  
  getMovies(searchTerm:string) {
    this.movieService.getMovies(searchTerm).subscribe (movies=>{
      console.log(movies);
      this.movies= movies !== undefined? movies:[];
    })
  
  }
}
