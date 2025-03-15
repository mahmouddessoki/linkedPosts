import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../../env/env.dev';
import { AuthService } from '../../Authentication/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAllPosts(): Observable<any> {
    return this.http.get(`${env.BASE_URL}posts?limit=20`)
  }
  getUserPosts(userId: string): Observable<any> {
    return this.http.get(`${env.BASE_URL}users/${userId}/posts?limit=2`)
  }
  getPost(postId: string): Observable<any> {
    return this.http.get(`${env.BASE_URL}posts/${postId}`)
  }


}
