import { environment } from './../../environments/environment.prod';
import { Post, FbaseCreateResponse } from './components/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbaseDBUrl}/posts.json`, post)
    .pipe(map((response: FbaseCreateResponse)=>{
      return {
        ...post,
        id: response.name,
        date: new Date(post.date)
      }
    }))
  }
}
