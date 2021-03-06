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
    return this.http.post(`${environment.fbaseDBUrl}/posts.json`, post).pipe(
      map((response: FbaseCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date),
        };
      })
    );
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbaseDBUrl}/posts.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date),
        }));
      })
    );
  }

  getById(id: string): Observable<Post> {
    return this.http
      .get<Post>(`${environment.fbaseDBUrl}/posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          return {
            ...post,
            id,
            date: new Date(post.date),
          };
        })
      );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbaseDBUrl}/posts/${id}.json`);
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(
      `${environment.fbaseDBUrl}/posts/${post.id}.json`,
      post
    );
  }
}
